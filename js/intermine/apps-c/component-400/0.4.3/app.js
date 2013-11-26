(function() {
  /**
   * Require the given path.
   *
   * @param {String} path
   * @return {Object} exports
   * @api public
   */
  function require(path, parent, orig) {
    var resolved = require.resolve(path);

    // lookup failed
    if (null == resolved) {
      orig = orig || path;
      parent = parent || 'root';
      var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
      err.path = orig;
      err.parent = parent;
      err.require = true;
      throw err;
    }

    var module = require.modules[resolved];

    // perform real require()
    // by invoking the module's
    // registered function
    if (!module._resolving && !module.exports) {
      var mod = {};
      mod.exports = {};
      mod.client = mod.component = true;
      module._resolving = true;
      module.call(this, mod.exports, require.relative(resolved), mod);
      delete module._resolving;
      module.exports = mod.exports;
    }

    return module.exports;
  }

  /**
   * Registered modules.
   */

  require.modules = {};

  /**
   * Registered aliases.
   */

  require.aliases = {};

  /**
   * Resolve `path`.
   *
   * Lookup:
   *
   *   - PATH/index.js
   *   - PATH.js
   *   - PATH
   *
   * @param {String} path
   * @return {String} path or null
   * @api private
   */

  require.resolve = function(path) {
    if (path.charAt(0) === '/') path = path.slice(1);

    var paths = [
      path,
      path + '.js',
      path + '.json',
      path + '/index.js',
      path + '/index.json'
    ];

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      if (require.modules.hasOwnProperty(path)) return path;
      if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
    }
  };

  /**
   * Normalize `path` relative to the current path.
   *
   * @param {String} curr
   * @param {String} path
   * @return {String}
   * @api private
   */

  require.normalize = function(curr, path) {
    var segs = [];

    if ('.' != path.charAt(0)) return path;

    curr = curr.split('/');
    path = path.split('/');

    for (var i = 0; i < path.length; ++i) {
      if ('..' == path[i]) {
        curr.pop();
      } else if ('.' != path[i] && '' != path[i]) {
        segs.push(path[i]);
      }
    }

    return curr.concat(segs).join('/');
  };

  /**
   * Register module at `path` with callback `definition`.
   *
   * @param {String} path
   * @param {Function} definition
   * @api private
   */

  require.register = function(path, definition) {
    require.modules[path] = definition;
  };

  /**
   * Alias a module definition.
   *
   * @param {String} from
   * @param {String} to
   * @api private
   */

  require.alias = function(from, to) {
    if (!require.modules.hasOwnProperty(from)) {
      throw new Error('Failed to alias "' + from + '", it does not exist');
    }
    require.aliases[to] = from;
  };

  /**
   * Return a require function relative to the `parent` path.
   *
   * @param {String} parent
   * @return {Function}
   * @api private
   */

  require.relative = function(parent) {
    var p = require.normalize(parent, '..');

    /**
     * lastIndexOf helper.
     */

    function lastIndexOf(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) return i;
      }
      return -1;
    }

    /**
     * The relative require() itself.
     */

    function localRequire(path) {
      var resolved = localRequire.resolve(path);
      return require(resolved, parent, path);
    }

    /**
     * Resolve relative to the parent.
     */

    localRequire.resolve = function(path) {
      var c = path.charAt(0);
      if ('/' == c) return path.slice(1);
      if ('.' == c) return require.normalize(p, path);

      // resolve deps by returning
      // the dep in the nearest "deps"
      // directory
      var segs = parent.split('/');
      var i = lastIndexOf(segs, 'deps') + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
      return path;
    };

    /**
     * Check if module is defined at `path`.
     */
    localRequire.exists = function(path) {
      return require.modules.hasOwnProperty(localRequire.resolve(path));
    };

    return localRequire;
  };

  // Global on server, window in browser.
  var root = this;

  // Do we already have require loader?
  root.require = require = (typeof root.require !== 'undefined') ? root.require : require;

  // All our modules will see our own require.
  (function() {
    
    
    // app.coffee
    require.register('component-400/src/app.js', function(exports, require, module) {
    
      var AppView, Collection, mediator, mori;
      
      mori = require('./modules/deps').mori;
      
      mediator = require('./modules/mediator');
      
      AppView = require('./views/app');
      
      Collection = require('./models/collection');
      
      module.exports = function(opts) {
        var collection;
        if (!opts.cb) {
          throw 'Provide your own callback function';
        }
        if (opts.formatter) {
          require('./modules/formatter').primary = opts.formatter;
        }
        collection = new Collection(opts.data || []);
        mediator.on('object:click', opts.portal || (function() {}), this);
        mediator.on('app:save', function() {
          return opts.cb(null, mori.into_array(collection.selected));
        }, this);
        return new AppView({
          'el': opts.target || 'body',
          collection: collection
        });
      };
      
    });

    
    // collection.coffee
    require.register('component-400/src/models/collection.js', function(exports, require, module) {
    
      var Collection, mediator, mori, _, _ref,
        __hasProp = {}.hasOwnProperty;
      
      _ref = require('../modules/deps'), _ = _ref._, mori = _ref.mori;
      
      mediator = require('../modules/mediator');
      
      Collection = (function() {
        Collection.prototype.type = 'gene';
      
        function Collection(data) {
          var extract, key, value, _ref1,
            _this = this;
          this.data = data;
          this.selected = mori.set();
          extract = function(obj) {
            var item, key, value, _i, _len, _results, _results1;
            switch (false) {
              case !_.isArray(obj):
                _results = [];
                for (_i = 0, _len = obj.length; _i < _len; _i++) {
                  item = obj[_i];
                  _results.push(extract(item));
                }
                return _results;
              case !_.isObject(obj):
                if (_.has(obj, 'id')) {
                  return _this.selected = mori.conj(_this.selected, obj.id);
                }
                _results1 = [];
                for (key in obj) {
                  if (!__hasProp.call(obj, key)) continue;
                  value = obj[key];
                  _results1.push(extract(value));
                }
                return _results1;
            }
          };
          _ref1 = this.data.matches;
          for (key in _ref1) {
            if (!__hasProp.call(_ref1, key)) continue;
            value = _ref1[key];
            if (key !== 'DUPLICATE') {
              extract(value);
            }
          }
          mediator.on('item:toggle', function(selected, id) {
            if (selected) {
              return this.selected = mori.conj(this.selected, id);
            }
            return this.selected = mori.disj(this.selected, id);
          }, this);
        }
      
        return Collection;
      
      })();
      
      module.exports = Collection;
      
    });

    
    // deps.coffee
    require.register('component-400/src/modules/deps.js', function(exports, require, module) {
    
      module.exports = {
        _: _,
        mori: mori,
        BackboneEvents: BackboneEvents,
        saveAs: saveAs,
        csv: csv,
        $: $
      };
      
    });

    
    // formatter.coffee
    require.register('component-400/src/modules/formatter.js', function(exports, require, module) {
    
      var _;
      
      _ = require('./deps')._;
      
      module.exports = {
        'primary': function(model) {
          var k, key, len, v, val, _i, _len, _ref, _ref1;
          _ref = ['symbol', 'primaryIdentifier', 'secondIdentifier', 'name'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if (val = model.summary[key]) {
              return val;
            }
          }
          val = [0, 'NA'];
          _ref1 = model.summary;
          for (k in _ref1) {
            v = _ref1[k];
            if (v) {
              if ((len = ('' + v).replace(/\W/, '').length) > val[0]) {
                val = [len, v];
              }
            }
          }
          return val[1];
        },
        'csv': function(model, columns) {
          var column, row, value;
          if (!columns) {
            columns = _.keys(model.summary);
          }
          row = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = columns.length; _i < _len; _i++) {
              column = columns[_i];
              _results.push((value = model.summary[column]) ? value : '');
            }
            return _results;
          })();
          return [columns, row];
        },
        'flyout': function(model) {
          var format, k, v, _ref, _results;
          format = function(text) {
            return text.replace(/\./g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase();
          };
          _ref = model.summary;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            if (v) {
              _results.push([format(k), v]);
            }
          }
          return _results;
        }
      };
      
    });

    
    // mediator.coffee
    require.register('component-400/src/modules/mediator.js', function(exports, require, module) {
    
      var BackboneEvents;
      
      BackboneEvents = require('./deps').BackboneEvents;
      
      module.exports = _.extend({}, BackboneEvents);
      
    });

    
    // slicer.coffee
    require.register('component-400/src/modules/slicer.js', function(exports, require, module) {
    
      module.exports = function(collection, aRng, bRng, handler) {
        var aUs, bUs, item, _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = collection.length; _i < _len; _i++) {
          item = collection[_i];
          _ref = item.range, aUs = _ref[0], bUs = _ref[1];
          if (aUs >= aRng) {
            if (aUs === aRng) {
              if (bUs <= bRng) {
                handler.call(this, item, 0, item.matches.length - 1);
                if (bUs === bRng) {
                  break;
                } else {
                  _results.push(void 0);
                }
              } else {
                handler.call(this, item, 0, bRng - aUs);
                break;
              }
            } else {
              if (bUs > bRng) {
                handler.call(this, item, 0, bRng - aUs);
                break;
              } else {
                handler.call(this, item, 0, item.matches.length - 1);
                if (bUs === bRng) {
                  break;
                } else {
                  _results.push(void 0);
                }
              }
            }
          } else {
            if (bUs <= bRng) {
              handler.call(this, item, aRng - aUs, item.matches.length - 1);
              if (bUs === bRng) {
                break;
              } else {
                _results.push(void 0);
              }
            } else {
              handler.call(this, item, aRng - aUs, bRng - aUs);
              break;
            }
          }
        }
        return _results;
      };
      
    });

    
    // view.coffee
    require.register('component-400/src/modules/view.js', function(exports, require, module) {
    
      var $, View, id;
      
      $ = require('./deps').$;
      
      id = 0;
      
      View = (function() {
        View.prototype.autoRender = false;
      
        View.prototype.splitter = /^(\S+)\s*(.*)$/;
      
        View.prototype.tag = 'div';
      
        View.prototype.template = function() {
          return '';
        };
      
        function View(opts) {
          var event, fn, k, v, _fn, _ref,
            _this = this;
          this.cid = 'c' + id++;
          this.options = {};
          for (k in opts) {
            v = opts[k];
            switch (k) {
              case 'model':
              case 'collection':
                this[k] = v;
                break;
              case 'el':
                this[k] = $(v);
                break;
              default:
                this.options[k] = v;
            }
          }
          if (!(this.el instanceof $)) {
            this.el = $("<" + this.tag + "/>");
          }
          _ref = this.events;
          _fn = function(event, fn) {
            var ev, selector, _ref1;
            _ref1 = event.match(_this.splitter).slice(1), ev = _ref1[0], selector = _ref1[1];
            return _this.el.on(ev, selector, function() {
              return _this[fn].apply(_this, arguments);
            });
          };
          for (event in _ref) {
            fn = _ref[event];
            _fn(event, fn);
          }
          this.views = [];
          if (this.autoRender) {
            this.render();
          }
        }
      
        View.prototype.render = function() {
          if (this.model) {
            this.el.html(this.template(JSON.parse(JSON.stringify(this.model))));
          } else {
            this.el.html(this.template());
          }
          return this;
        };
      
        View.prototype.dispose = function() {
          var view, _i, _len, _ref;
          _ref = this.views;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            view.dispose();
          }
          return this.el.remove();
        };
      
        return View;
      
      })();
      
      module.exports = View;
      
    });

    
    // row.eco
    require.register('component-400/src/templates/duplicates/row.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            if (this.input) {
              __out.push('\n    <td rowspan="');
              __out.push(__sanitize(this.rowspan));
              __out.push('" class="');
              __out.push(__sanitize(this["class"]));
              __out.push('">\n        ');
              __out.push(this.input);
              __out.push('\n        ');
              if (this.continuing) {
                __out.push('<em>cont.</em>');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>\n');
          
            if (this.selected) {
              __out.push('\n    <td><span class="tiny secondary button">Remove</span></td>\n');
            } else {
              __out.push('\n    <td><span class="tiny success button">Add</span></td>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    require.register('component-400/src/templates/duplicates/table.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<header>\n    <span class="small secondary remove-all button">Remove all</span>\n    <span class="small success add-all button">Add all</span>\n    <h2>Which one do you want?</h2>\n    <span data-id="1" class="help"></span>\n</header>\n\n<div class="paginator"></div>\n\n<table class="striped">\n    <thead>\n        <tr>\n            <th>Identifier you provided</th>\n            <th>Matches</th>\n            <th>Action</th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // flyout.eco
    require.register('component-400/src/templates/flyout.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var column, row, _i, _j, _len, _len1, _ref;
          
            __out.push('<table>\n    ');
          
            _ref = this.rows;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              row = _ref[_i];
              __out.push('\n        <tr>\n            ');
              for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
                column = row[_j];
                __out.push('\n                <td>');
                __out.push(column);
                __out.push('</td>\n            ');
              }
              __out.push('\n        </tr>\n    ');
            }
          
            __out.push('\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // header.eco
    require.register('component-400/src/templates/header.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<header>\n    ');
          
            if (this.selected === 1) {
              __out.push('\n        <a class="success button save">Save a list of 1 ');
              __out.push(__sanitize(this.data.type));
              __out.push('</a>\n    ');
            } else {
              __out.push('\n        <a class="success button save">Save a list of ');
              __out.push(__sanitize(this.selected));
              __out.push(' ');
              __out.push(__sanitize(this.data.type));
              __out.push('s</a>\n    ');
            }
          
            __out.push('\n\n    <table>\n        <tr>\n            <td>You entered:</td>\n            <td>');
          
            __out.push(__sanitize(this.data.stats.identifiers.all));
          
            __out.push(' identifier');
          
            if (this.data.stats.identifiers.all !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n        <tr>\n            <td>We found:</td>\n            <td>');
          
            __out.push(__sanitize(this.found));
          
            __out.push(' ');
          
            __out.push(__sanitize(this.data.type));
          
            if (this.found !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n    </table>\n\n    <p>Why are the numbers different? See below.</p>\n</header>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // paginator.eco
    require.register('component-400/src/templates/paginator.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var page, _i, _len, _ref;
          
            if (this.pages > 1) {
              __out.push('\n    <ul class="pagination">\n        ');
              if (this.current === 0) {
                __out.push('\n            <li class="unavailable arrow"><a>&laquo;</a></li>\n        ');
              } else {
                __out.push('\n            <li class="arrow" data-action="prev"><a>&laquo;</a></li>\n        ');
              }
              __out.push('\n\n        ');
              _ref = this.range;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                page = _ref[_i];
                __out.push('\n            ');
                if (page === null) {
                  __out.push('\n                <li class="unavailable"><a>&hellip;</a></li>\n            ');
                } else {
                  __out.push('\n                ');
                  if (page === this.current + 1) {
                    __out.push('\n                    <li data-action="switch" data-page="');
                    __out.push(__sanitize(page - 1));
                    __out.push('" class="current"><a>');
                    __out.push(__sanitize(page));
                    __out.push('</a></li>\n                ');
                  } else {
                    __out.push('\n                    <li data-action="switch" data-page="');
                    __out.push(__sanitize(page - 1));
                    __out.push('"><a>');
                    __out.push(__sanitize(page));
                    __out.push('</a></li>\n                ');
                  }
                  __out.push('\n            ');
                }
                __out.push('\n        ');
              }
              __out.push('\n\n        ');
              if (this.current + 1 === this.pages) {
                __out.push('\n            <li class="unavailable arrow"><a>&raquo;</a></li>\n        ');
              } else {
                __out.push('\n            <li class="arrow" data-action="next"><a>&raquo;</a></li>\n        ');
              }
              __out.push('\n    </ul>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tab.eco
    require.register('component-400/src/templates/summary/tab.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<a>');
          
            __out.push(__sanitize(this.name));
          
            __out.push('s <span data-id="3" class="help"></span></a>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tabs.eco
    require.register('component-400/src/templates/summary/tabs.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<header>\n    <span class="small download button">Download summary</span>\n    <h2>Summary</h2>\n    <span data-id="2" class="help"></span>\n</header>\n<dl class="tabs contained"></dl>\n<ul class="tabs-content contained"></ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // many-to-one-row.eco
    require.register('component-400/src/templates/table/many-to-one-row.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var item, _i, _len, _ref;
          
            if (this.input) {
              __out.push('\n    <td rowspan="');
              __out.push(__sanitize(this.rowspan));
              __out.push('" class="');
              __out.push(__sanitize(this["class"]));
              __out.push('">\n        <ul class="inline">\n            ');
              _ref = this.input;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                item = _ref[_i];
                __out.push('\n                <li>');
                __out.push(item);
                __out.push('</li>\n            ');
              }
              __out.push('\n        </ul>\n    </td>\n');
            }
          
            __out.push('\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // one-to-many-row.eco
    require.register('component-400/src/templates/table/one-to-many-row.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            if (this.input) {
              __out.push('\n    <td rowspan="');
              __out.push(__sanitize(this.rowspan));
              __out.push('" class="');
              __out.push(__sanitize(this["class"]));
              __out.push('">\n        ');
              __out.push(this.input);
              __out.push('\n        ');
              if (this.continuing) {
                __out.push('<em>cont.</em>');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    require.register('component-400/src/templates/table/table.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="paginator"></div>\n\n<table class="striped">\n    <thead>\n        <tr>\n            <th>Identifier you provided</th>\n            <th>Match</th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tooltip.eco
    require.register('component-400/src/templates/tooltip.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push(this.text);
          
            __out.push('<span class="nub" style="top: auto; bottom: -10px; left: auto; right: auto;"></span>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // unresolved.eco
    require.register('component-400/src/templates/unresolved.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var item, _i, _len, _ref;
          
            __out.push('<header>\n    <h2>No matches found</h2>\n    <span data-id="4" class="help"></span>\n</header>\n\n<ul class="inline">\n    ');
          
            _ref = this.collection;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              __out.push('\n        <li>');
              __out.push(__sanitize(item));
              __out.push('</li>\n    ');
            }
          
            __out.push('\n</ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // app.coffee
    require.register('component-400/src/views/app.js', function(exports, require, module) {
    
      var $, AppView, DuplicatesTableView, HeaderView, SummaryView, TooltipView, UnresolvedView, View, mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      $ = require('../modules/deps').$;
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      HeaderView = require('./header');
      
      DuplicatesTableView = require('./duplicates');
      
      UnresolvedView = require('./unresolved');
      
      SummaryView = require('./summary');
      
      HeaderView = require('./header');
      
      TooltipView = require('./tooltip');
      
      AppView = (function(_super) {
        __extends(AppView, _super);
      
        function AppView() {
          _ref = AppView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        AppView.prototype.autoRender = true;
      
        AppView.prototype.events = {
          'mouseover .help': 'toggleTooltip',
          'mouseout  .help': 'toggleTooltip'
        };
      
        AppView.prototype.render = function() {
          var collection, data, dict, _ref1;
          this.el.append((new HeaderView({
            'collection': this.collection
          })).render().el);
          _ref1 = this.collection, data = _ref1.data, dict = _ref1.dict;
          if ((collection = data.matches.DUPLICATE || []).length) {
            this.el.append((new DuplicatesTableView({
              collection: collection
            })).render().el);
          }
          this.el.append((new SummaryView({
            'collection': data.matches
          })).render().el);
          if (data.unresolved.length) {
            this.el.append(((new UnresolvedView({
              'collection': data.unresolved
            })).render().el));
          }
          return this;
        };
      
        AppView.prototype.toggleTooltip = function(ev) {
          var id, target, view, _i, _len, _ref1, _results;
          switch (ev.type) {
            case 'mouseover':
              id = (target = $(ev.target)).data('id');
              this.views.push(view = new TooltipView({
                'model': {
                  id: id
                }
              }));
              return target.append(view.render().el);
            case 'mouseout':
              _ref1 = this.views;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                view = _ref1[_i];
                _results.push(view.dispose());
              }
              return _results;
          }
        };
      
        return AppView;
      
      })(View);
      
      module.exports = AppView;
      
    });

    
    // duplicates.coffee
    require.register('component-400/src/views/duplicates.js', function(exports, require, module) {
    
      var DuplicatesTableRowView, DuplicatesTableView, FlyoutView, Table, View, formatter, mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      formatter = require('../modules/formatter');
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      FlyoutView = require('../views/flyout');
      
      Table = require('../views/table');
      
      DuplicatesTableRowView = (function(_super) {
        __extends(DuplicatesTableRowView, _super);
      
        function DuplicatesTableRowView() {
          _ref = DuplicatesTableRowView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        DuplicatesTableRowView.prototype.template = require('../templates/duplicates/row');
      
        DuplicatesTableRowView.prototype.events = {
          'click .button': 'toggle',
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        DuplicatesTableRowView.prototype.toggle = function() {
          var _base;
          if ((_base = this.model).selected == null) {
            _base.selected = false;
          }
          this.model.selected = !this.model.selected;
          mediator.trigger('item:toggle', this.model.selected, this.model.id);
          return this.render();
        };
      
        return DuplicatesTableRowView;
      
      })(Table.TableRowView);
      
      DuplicatesTableView = (function(_super) {
        __extends(DuplicatesTableView, _super);
      
        DuplicatesTableView.prototype.template = require('../templates/duplicates/table');
      
        DuplicatesTableView.prototype.rowClass = DuplicatesTableRowView;
      
        DuplicatesTableView.prototype.events = {
          'click .button.add-all': 'addAll',
          'click .button.remove-all': 'removeAll'
        };
      
        function DuplicatesTableView() {
          DuplicatesTableView.__super__.constructor.apply(this, arguments);
          this.el.addClass('duplicates section');
        }
      
        DuplicatesTableView.prototype.addAll = function() {
          return this.doAll(true);
        };
      
        DuplicatesTableView.prototype.removeAll = function() {
          return this.doAll(false);
        };
      
        DuplicatesTableView.prototype.doAll = function(state) {
          var item, match, _i, _j, _len, _len1, _ref1, _ref2;
          _ref1 = this.collection;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            item = _ref1[_i];
            _ref2 = item.matches;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              match = _ref2[_j];
              mediator.trigger('item:toggle', (match.selected = state), match.id);
            }
          }
          return this.renderPage.apply(this, this.range);
        };
      
        return DuplicatesTableView;
      
      })(Table.OtMTableView);
      
      module.exports = DuplicatesTableView;
      
    });

    
    // flyout.coffee
    require.register('component-400/src/views/flyout.js', function(exports, require, module) {
    
      var FlyoutView, View, formatter,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      FlyoutView = (function(_super) {
        __extends(FlyoutView, _super);
      
        FlyoutView.prototype.template = require('../templates/flyout');
      
        function FlyoutView() {
          FlyoutView.__super__.constructor.apply(this, arguments);
          this.el.addClass('flyout');
        }
      
        FlyoutView.prototype.render = function() {
          this.el.html(this.template({
            'rows': formatter.flyout(this.model)
          }));
          return this;
        };
      
        return FlyoutView;
      
      })(View);
      
      module.exports = FlyoutView;
      
    });

    
    // header.coffee
    require.register('component-400/src/views/header.js', function(exports, require, module) {
    
      var HeaderView, View, mediator,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      HeaderView = (function(_super) {
        __extends(HeaderView, _super);
      
        HeaderView.prototype.template = require('../templates/header');
      
        HeaderView.prototype.events = {
          'click .button.save': 'save'
        };
      
        function HeaderView() {
          HeaderView.__super__.constructor.apply(this, arguments);
          this.el.addClass('header section');
          this.found = mori.count(this.collection.selected);
          mediator.on('item:toggle', this.render, this);
        }
      
        HeaderView.prototype.render = function() {
          var data;
          data = this.collection.data;
          this.el.html(this.template({
            'selected': mori.count(this.collection.selected),
            found: this.found,
            data: data
          }));
          return this;
        };
      
        HeaderView.prototype.save = function() {
          return mediator.trigger('app:save');
        };
      
        return HeaderView;
      
      })(View);
      
      module.exports = HeaderView;
      
    });

    
    // paginator.coffee
    require.register('component-400/src/views/paginator.js', function(exports, require, module) {
    
      var $, Paginator, View, mediator,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      $ = require('../modules/deps').$;
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      Paginator = (function(_super) {
        __extends(Paginator, _super);
      
        Paginator.prototype.template = require('../templates/paginator');
      
        Paginator.prototype.events = {
          'click ul.pagination a': 'onclick'
        };
      
        function Paginator() {
          var _base, _base1, _base2, _base3;
          Paginator.__super__.constructor.apply(this, arguments);
          if ((_base = this.options).total == null) {
            _base.total = 0;
          }
          if ((_base1 = this.options).perPage == null) {
            _base1.perPage = 5;
          }
          if ((_base2 = this.options).current == null) {
            _base2.current = 0;
          }
          if ((_base3 = this.options).truncate == null) {
            _base3.truncate = 10;
          }
          this.options.pages = Math.ceil(this.options.total / this.options.perPage);
        }
      
        Paginator.prototype.prev = function() {
          return this.select(Math.max(0, this.options.current - 1));
        };
      
        Paginator.prototype.next = function() {
          return this.select(Math.min(this.options.pages - 1, this.options.current + 1));
        };
      
        Paginator.prototype.select = function(current) {
          return this.options.current = current;
        };
      
        Paginator.prototype.render = function() {
          var a, b, h, p, _i, _j, _k, _ref, _ref1, _ref2, _ref3, _results, _results1, _results2;
          if (this.options.truncate < (p = this.options.pages)) {
            h = Math.floor(this.options.truncate / 2);
            this.options.range = [].concat((function() {
              _results = [];
              for (var _i = 1, _ref = h + 1; 1 <= _ref ? _i < _ref : _i > _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this), [null], (function() {
              _results1 = [];
              for (var _j = _ref1 = p - h + 1, _ref2 = p + 1; _ref1 <= _ref2 ? _j < _ref2 : _j > _ref2; _ref1 <= _ref2 ? _j++ : _j--){ _results1.push(_j); }
              return _results1;
            }).apply(this));
          } else {
            this.options.range = (function() {
              _results2 = [];
              for (var _k = 1, _ref3 = p + 1; 1 <= _ref3 ? _k < _ref3 : _k > _ref3; 1 <= _ref3 ? _k++ : _k--){ _results2.push(_k); }
              return _results2;
            }).apply(this);
          }
          this.el.html(this.template(this.options));
          b = Math.min((a = this.options.current * this.options.perPage) + this.options.perPage, this.options.total);
          mediator.trigger('page:change', this.cid, a, b);
          return this;
        };
      
        Paginator.prototype.onclick = function(evt) {
          var li;
          switch ((li = $(evt.target).closest('li')).data('action')) {
            case 'prev':
              this.prev();
              break;
            case 'next':
              this.next();
              break;
            case 'switch':
              this.select(parseInt(li.data('page')));
          }
          return this.render();
        };
      
        return Paginator;
      
      })(View);
      
      module.exports = Paginator;
      
    });

    
    // summary.coffee
    require.register('component-400/src/views/summary.js', function(exports, require, module) {
    
      var Collection, SummaryView, TabMatchesTableView, TabSwitcherView, TabTableView, Table, View, csv, dict, formatter, mediator, saveAs, _, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), _ = _ref._, csv = _ref.csv, saveAs = _ref.saveAs;
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      Table = require('./table');
      
      Collection = require('../models/collection');
      
      dict = {
        'MATCH': 'direct hit',
        'TYPE_CONVERTED': 'converted type',
        'OTHER': 'synonym',
        'WILDCARD': 'wildcard'
      };
      
      SummaryView = (function(_super) {
        __extends(SummaryView, _super);
      
        SummaryView.prototype.template = require('../templates/summary/tabs');
      
        SummaryView.prototype.events = {
          'click .button.download': 'download'
        };
      
        function SummaryView() {
          SummaryView.__super__.constructor.apply(this, arguments);
          this.el.addClass('summary section');
        }
      
        SummaryView.prototype.render = function() {
          var Clazz, collection, content, isFirst, reason, tabs, view, _ref1;
          this.el.html(this.template());
          tabs = this.el.find('.tabs');
          content = this.el.find('.tabs-content');
          isFirst = true;
          _ref1 = this.collection;
          for (reason in _ref1) {
            collection = _ref1[reason];
            if (!(reason !== 'DUPLICATE' && collection.length)) {
              continue;
            }
            this.views.push(view = new TabSwitcherView({
              'model': {
                'name': dict[reason]
              },
              reason: reason
            }));
            tabs.append(view.render().el);
            Clazz = reason === 'MATCH' ? TabMatchesTableView : TabTableView;
            this.views.push(view = new Clazz({
              collection: collection,
              reason: reason
            }));
            content.append(view.render().el);
            if (isFirst) {
              mediator.trigger('tab:switch', reason) && (isFirst = false);
            }
          }
          return this;
        };
      
        SummaryView.prototype.download = function() {
          var adder, blob, collection, columns, converted, input, item, match, reason, rows, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3;
          columns = null;
          rows = [];
          adder = function(match, input) {
            var row, _ref1;
            _ref1 = formatter.csv(match, columns), columns = _ref1[0], row = _ref1[1];
            return rows.push([input, reason].concat(row));
          };
          _ref1 = this.collection;
          for (reason in _ref1) {
            collection = _ref1[reason];
            if (reason !== 'DUPLICATE' && collection.length) {
              for (_i = 0, _len = collection.length; _i < _len; _i++) {
                item = collection[_i];
                if (reason === 'MATCH') {
                  _ref2 = item.input;
                  for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                    input = _ref2[_j];
                    adder(item, input);
                  }
                } else {
                  _ref3 = item.matches;
                  for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
                    match = _ref3[_k];
                    adder(match, item.input);
                  }
                }
              }
            }
          }
          columns = ['input', 'reason'].concat(columns);
          converted = csv(_.map(rows, function(row) {
            return _.zipObject(columns, row);
          }));
          blob = new Blob([converted], {
            'type': 'text/csv;charset=utf-8'
          });
          return saveAs(blob, 'summary.csv');
        };
      
        return SummaryView;
      
      })(View);
      
      TabSwitcherView = (function(_super) {
        __extends(TabSwitcherView, _super);
      
        TabSwitcherView.prototype.template = require('../templates/summary/tab');
      
        TabSwitcherView.prototype.tag = 'dd';
      
        TabSwitcherView.prototype.events = {
          'click *': 'onclick'
        };
      
        function TabSwitcherView() {
          TabSwitcherView.__super__.constructor.apply(this, arguments);
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
        }
      
        TabSwitcherView.prototype.onclick = function() {
          return mediator.trigger('tab:switch', this.options.reason);
        };
      
        return TabSwitcherView;
      
      })(View);
      
      TabTableView = (function(_super) {
        __extends(TabTableView, _super);
      
        TabTableView.prototype.tag = 'li';
      
        function TabTableView() {
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
          this;
          TabTableView.__super__.constructor.apply(this, arguments);
        }
      
        return TabTableView;
      
      })(Table.OtMTableView);
      
      TabMatchesTableView = (function(_super) {
        __extends(TabMatchesTableView, _super);
      
        TabMatchesTableView.prototype.tag = 'li';
      
        function TabMatchesTableView() {
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
          this;
          TabMatchesTableView.__super__.constructor.apply(this, arguments);
        }
      
        return TabMatchesTableView;
      
      })(Table.MtOTableView);
      
      module.exports = SummaryView;
      
    });

    
    // table.coffee
    require.register('component-400/src/views/table.js', function(exports, require, module) {
    
      var $, FlyoutView, ManyToOneTableRowView, ManyToOneTableView, OneToManyTableView, Paginator, TableRowView, View, formatter, mediator, slicer, _, _ref, _ref1, _ref2,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), _ = _ref._, $ = _ref.$;
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      Paginator = require('./paginator');
      
      FlyoutView = require('./flyout');
      
      slicer = require('../modules/slicer');
      
      TableRowView = (function(_super) {
        __extends(TableRowView, _super);
      
        function TableRowView() {
          _ref1 = TableRowView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        TableRowView.prototype.template = require('../templates/table/one-to-many-row');
      
        TableRowView.prototype.tag = 'tr';
      
        TableRowView.prototype.events = {
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        TableRowView.prototype.render = function() {
          var matched;
          matched = formatter.primary(this.model);
          this.el.html(this.template(_.extend({}, this.model, this.options, {
            matched: matched
          })));
          return this;
        };
      
        TableRowView.prototype.toggleFlyout = function(ev) {
          var view, _i, _len, _ref2, _results;
          switch (ev.type) {
            case 'mouseover':
              this.views.push(view = new FlyoutView({
                model: this.model
              }));
              return $(ev.target).append(view.render().el);
            case 'mouseout':
              _ref2 = this.views;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                view = _ref2[_i];
                _results.push(view.dispose());
              }
              return _results;
          }
        };
      
        TableRowView.prototype.portal = function(ev) {
          return mediator.trigger('object:click', this.model, ev.target);
        };
      
        return TableRowView;
      
      })(View);
      
      OneToManyTableView = (function(_super) {
        __extends(OneToManyTableView, _super);
      
        OneToManyTableView.prototype.template = require('../templates/table/table');
      
        OneToManyTableView.prototype.rowClass = TableRowView;
      
        function OneToManyTableView() {
          var _this = this;
          OneToManyTableView.__super__.constructor.apply(this, arguments);
          this.pagin = new Paginator({
            'total': (function() {
              var i;
              i = 0;
              return _.reduce(_this.collection, function(sum, item) {
                sum += (item.length = item.matches.length);
                item.range = [i, sum - 1];
                i = sum;
                return sum;
              }, 0);
            })()
          });
          mediator.on('page:change', function(cid, a, b) {
            if (cid !== this.pagin.cid) {
              return;
            }
            return this.renderPage.call(this, a, b - 1);
          }, this);
        }
      
        OneToManyTableView.prototype.render = function() {
          this.el.html(this.template());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        OneToManyTableView.prototype.renderPage = function(aRng, bRng) {
          var i, tbody, view, _i, _len, _ref2;
          tbody = this.el.find('tbody');
          this.range = [aRng, bRng];
          _ref2 = this.views;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            view = _ref2[_i];
            view.dispose();
          }
          i = 0;
          return slicer.apply(this, [this.collection].concat(this.range, function(_arg, begin, end) {
            var input, j, matches, model, _ref3;
            input = _arg.input, matches = _arg.matches;
            _ref3 = matches.slice(begin, +end + 1 || 9e9);
            for (j in _ref3) {
              model = _ref3[j];
              if (j === '0') {
                this.views.push(view = new this.rowClass({
                  'rowspan': end - begin + 1,
                  'class': ['even', 'odd'][i % 2],
                  'continuing': begin !== 0,
                  'input': [input],
                  model: model
                }));
              } else {
                this.views.push(view = new this.rowClass({
                  model: model
                }));
              }
              tbody.append(view.render().el);
            }
            return i++;
          }));
        };
      
        return OneToManyTableView;
      
      })(View);
      
      ManyToOneTableRowView = (function(_super) {
        __extends(ManyToOneTableRowView, _super);
      
        function ManyToOneTableRowView() {
          _ref2 = ManyToOneTableRowView.__super__.constructor.apply(this, arguments);
          return _ref2;
        }
      
        ManyToOneTableRowView.prototype.template = require('../templates/table/many-to-one-row');
      
        return ManyToOneTableRowView;
      
      })(TableRowView);
      
      ManyToOneTableView = (function(_super) {
        __extends(ManyToOneTableView, _super);
      
        ManyToOneTableView.prototype.template = require('../templates/table/table');
      
        ManyToOneTableView.prototype.rowClass = ManyToOneTableRowView;
      
        function ManyToOneTableView() {
          ManyToOneTableView.__super__.constructor.apply(this, arguments);
          this.pagin = new Paginator({
            'total': this.collection.length
          });
          mediator.on('page:change', function(cid, a, b) {
            if (cid !== this.pagin.cid) {
              return;
            }
            return this.renderPage.call(this, a, b - 1);
          }, this);
        }
      
        ManyToOneTableView.prototype.render = function() {
          this.el.html(this.template());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        ManyToOneTableView.prototype.renderPage = function(aRng, bRng) {
          var model, tbody, view, _i, _j, _len, _len1, _ref3, _ref4, _results;
          tbody = this.el.find('tbody');
          this.range = [aRng, bRng];
          _ref3 = this.views;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            view = _ref3[_i];
            view.dispose();
          }
          _ref4 = this.collection.slice(aRng, +bRng + 1 || 9e9);
          _results = [];
          for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
            model = _ref4[_j];
            this.views.push(view = new this.rowClass({
              model: model
            }));
            _results.push(tbody.append(view.render().el));
          }
          return _results;
        };
      
        return ManyToOneTableView;
      
      })(View);
      
      exports.TableRowView = TableRowView;
      
      exports.OtMTableView = OneToManyTableView;
      
      exports.MtOTableView = ManyToOneTableView;
      
    });

    
    // tooltip.coffee
    require.register('component-400/src/views/tooltip.js', function(exports, require, module) {
    
      var TooltipView, View, tooltips,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../modules/view');
      
      TooltipView = (function(_super) {
        __extends(TooltipView, _super);
      
        TooltipView.prototype.tag = 'span';
      
        TooltipView.prototype.template = require('../templates/tooltip');
      
        function TooltipView() {
          TooltipView.__super__.constructor.apply(this, arguments);
          this.model.text = tooltips[this.model.id];
          this.el.addClass('tooltip tip-top noradius');
        }
      
        return TooltipView;
      
      })(View);
      
      tooltips = {
        '1': 'Choose from among duplicate matches below',
        '2': 'These objects have been automatically added to your list',
        '3': 'A class of matches',
        '4': 'Identifiers that could not be resolved'
      };
      
      module.exports = TooltipView;
      
    });

    
    // unresolved.coffee
    require.register('component-400/src/views/unresolved.js', function(exports, require, module) {
    
      var UnresolvedView, View,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../modules/view');
      
      UnresolvedView = (function(_super) {
        __extends(UnresolvedView, _super);
      
        UnresolvedView.prototype.template = require('../templates/unresolved');
      
        function UnresolvedView() {
          UnresolvedView.__super__.constructor.apply(this, arguments);
          this.el.addClass('unresolved section');
        }
      
        UnresolvedView.prototype.render = function() {
          this.el.html(this.template({
            collection: this.collection
          }));
          return this;
        };
      
        return UnresolvedView;
      
      })(View);
      
      module.exports = UnresolvedView;
      
    });
  })();

  // Return the main app.
  var main = require("component-400/src/app.js");

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("component-400", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["component-400"] = main;
  
  }

  // Alias our app.
  
  require.alias("component-400/src/app.js", "component-400/index.js");
  
})();