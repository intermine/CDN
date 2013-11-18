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

  // All our modules will see our own require.
  (function() {
    
    
    // app.coffee
    require.register('component-400/src/app.js', function(exports, require, module) {
    
      var AppView, Collection, mediator;
      
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
    
      var Collection, mediator,
        __hasProp = {}.hasOwnProperty;
      
      mediator = require('../modules/mediator');
      
      Collection = (function() {
        Collection.prototype.dict = {
          'MATCH': 'direct hit',
          'TYPE_CONVERTED': 'converted type',
          'OTHER': 'synonym',
          'WILDCARD': 'wildcard'
        };
      
        Collection.prototype.type = 'gene';
      
        function Collection(data) {
          var extract, key, value, _ref,
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
          _ref = this.data.matches;
          for (key in _ref) {
            if (!__hasProp.call(_ref, key)) continue;
            value = _ref[key];
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

    
    // formatter.coffee
    require.register('component-400/src/modules/formatter.js', function(exports, require, module) {
    
      var escape;
      
      module.exports = {
        'primary': function(model) {
          var k, key, len, v, val, _i, _len, _ref, _ref1;
          _ref = ['symbol', 'primaryIdentifier', 'secondIdentifier', 'name'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if (val = model.summary[key]) {
              return escape(val);
            }
          }
          val = [0, 'NA'];
          _ref1 = model.summary;
          for (k in _ref1) {
            v = _ref1[k];
            if (v) {
              if ((len = ('' + v).replace(/\W/, '').length) > val[0]) {
                val = [len, escape(v)];
              }
            }
          }
          return val[1];
        },
        'csv': function(model, columns) {
          var cols, row;
          if (columns == null) {
            columns = true;
          }
          cols = [].concat(['provided'], _.keys(model.summary));
          row = [].concat([model.input.join(', ')], _.values(model.summary));
          if (columns) {
            return [cols, row];
          } else {
            return row;
          }
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
              _results.push([format(k), escape(v)]);
            }
          }
          return _results;
        }
      };
      
      escape = function(string) {
        return JSON.stringify(string).slice(1, -1);
      };
      
    });

    
    // mediator.coffee
    require.register('component-400/src/modules/mediator.js', function(exports, require, module) {
    
      module.exports = _.extend({}, BackboneEvents);
      
    });

    
    // view.coffee
    require.register('component-400/src/modules/view.js', function(exports, require, module) {
    
      var View, id;
      
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
              __out.push('">');
              __out.push(this.input);
              __out.push('</td>\n');
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
            __out.push('<header>\n    <span class="small secondary remove-all button">Remove all</span>\n    <span class="small success add-all button">Add all</span>\n    <h2>Which one do you want?</h2>\n    <span data-id="1" class="help"></span>\n</header>\n\n<div class="border">\n    <div class="thead">\n        <table>\n            <thead>\n                <tr>\n                    <th>Identifier you provided</th>\n                    <th>Matches</th>\n                    <th>Action</th>\n                </tr>\n            </thead>\n        </table>\n    </div>\n    <div class="wrapper">\n        <table>\n            <thead>\n                <tr>\n                    <th>Identifier you provided</th>\n                    <th>Matches</th>\n                    <th>Action</th>\n                </tr>\n            </thead>\n            <tbody></tbody>\n        </table>\n    </div>\n</div>');
          
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
          
            __out.push(__sanitize(this.data.stats.objects.matches));
          
            __out.push(' ');
          
            __out.push(__sanitize(this.data.type));
          
            if (this.data.stats.objects.matches !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n    </table>\n\n    <p>Why are the numbers different? See below.</p>\n</header>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // nomatches.eco
    require.register('component-400/src/templates/nomatches.js', function(exports, require, module) {
    
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
            __out.push('<header>\n    <h2>No matches found</h2>\n    <span class="help"></span>\n</header>\n\n<ul class="inline">\n    <li>monkey</li>\n    <li>CG11091</li>\n</ul>');
          
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

    
    // list.eco
    require.register('component-400/src/templates/summary/list.js', function(exports, require, module) {
    
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
            __out.push('<ul class="inline">\n    <li>fkh</li>\n    <li>pan</li>\n</ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // row.eco
    require.register('component-400/src/templates/summary/row.js', function(exports, require, module) {
    
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
            __out.push('<td>');
          
            __out.push(this.input.join(', '));
          
            __out.push('</td>\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>');
          
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

    
    // table.eco
    require.register('component-400/src/templates/summary/table.js', function(exports, require, module) {
    
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
            __out.push('<table>\n    <thead>\n        <tr>\n            <th>Identifier you provided</th>\n            <th>Match</th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>\n\n<div class="paginator"></div>');
          
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

    
    // app.coffee
    require.register('component-400/src/views/app.js', function(exports, require, module) {
    
      var AppView, DuplicatesView, HeaderView, NoMatchesView, SummaryView, TooltipView, View, mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      HeaderView = require('./header');
      
      DuplicatesView = require('./duplicates');
      
      NoMatchesView = require('./nomatches');
      
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
          var collection, data, dict, view, _ref1;
          this.el.append((new HeaderView({
            'collection': this.collection
          })).render().el);
          _ref1 = this.collection, data = _ref1.data, dict = _ref1.dict;
          if (collection = data.matches.DUPLICATE) {
            this.el.append((view = new DuplicatesView({
              collection: collection
            })).render().el);
          }
          if (view != null) {
            view.adjust();
          }
          this.el.append((new SummaryView({
            'collection': data.matches,
            dict: dict
          })).render().el);
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
    
      var DuplicatesRowView, DuplicatesView, FlyoutView, View, formatter, mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      formatter = require('../modules/formatter');
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      FlyoutView = require('../views/flyout');
      
      DuplicatesView = (function(_super) {
        __extends(DuplicatesView, _super);
      
        DuplicatesView.prototype.template = require('../templates/duplicates/table');
      
        DuplicatesView.prototype.events = {
          'click .button.add-all': 'addAll',
          'click .button.remove-all': 'removeAll'
        };
      
        function DuplicatesView() {
          DuplicatesView.__super__.constructor.apply(this, arguments);
          this.el.addClass('duplicates section');
        }
      
        DuplicatesView.prototype.render = function() {
          var i, input, j, matches, model, tbody, view, _i, _len, _ref, _ref1;
          this.el.html(this.template());
          tbody = this.el.find('tbody');
          i = 0;
          _ref = this.collection;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _ref1 = _ref[_i], input = _ref1.input, matches = _ref1.matches;
            for (j in matches) {
              model = matches[j];
              if (j === '0') {
                this.views.push(view = new DuplicatesRowView({
                  'rowspan': matches.length,
                  'class': ['even', 'odd'][i % 2],
                  input: input,
                  model: model
                }));
                i++;
              } else {
                this.views.push(view = new DuplicatesRowView({
                  model: model
                }));
              }
              tbody.append(view.render().el);
            }
          }
          return this;
        };
      
        DuplicatesView.prototype.adjust = function() {
          var faux, real;
          faux = this.el.find('.thead thead');
          real = this.el.find('.wrapper thead');
          real.parent().css({
            'margin-top': -real.height() + 'px'
          });
          real.find('th').each(function(i, th) {
            return faux.find("th:eq(" + i + ")").width($(th).width());
          });
          return this;
        };
      
        DuplicatesView.prototype.addAll = function(ev) {
          if (!$(ev.target).hasClass('disabled')) {
            return this.doAll('add');
          }
        };
      
        DuplicatesView.prototype.removeAll = function(ev) {
          if (!$(ev.target).hasClass('disabled')) {
            return this.doAll('remove');
          }
        };
      
        DuplicatesView.prototype.doAll = function(fn) {
          var buttons, i, job, length, q,
            _this = this;
          (buttons = this.el.find('header .button')).addClass('disabled');
          length = i = this.views.length;
          q = queue(50);
          job = function(cb) {
            if (i--) {
              _this.views[length - i - 1][fn]();
              q.defer(job);
            } else {
              buttons.removeClass('disabled');
            }
            return setImmediate(cb);
          };
          return q.defer(job);
        };
      
        return DuplicatesView;
      
      })(View);
      
      DuplicatesRowView = (function(_super) {
        __extends(DuplicatesRowView, _super);
      
        function DuplicatesRowView() {
          _ref = DuplicatesRowView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        DuplicatesRowView.prototype.template = require('../templates/duplicates/row');
      
        DuplicatesRowView.prototype.tag = 'tr';
      
        DuplicatesRowView.prototype.events = {
          'click .button': 'toggle',
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        DuplicatesRowView.prototype.render = function() {
          var matched;
          matched = formatter.primary(this.model);
          this.el.html(this.template(_.extend(this.options, {
            matched: matched
          })));
          return this;
        };
      
        DuplicatesRowView.prototype.toggle = function() {
          var _base;
          if ((_base = this.options).selected == null) {
            _base.selected = false;
          }
          this.options.selected = !this.options.selected;
          mediator.trigger('item:toggle', this.options.selected, this.model.id);
          return this.render();
        };
      
        DuplicatesRowView.prototype.add = function() {
          mediator.trigger('item:toggle', (this.options.selected = true), this.model.id);
          return this.render();
        };
      
        DuplicatesRowView.prototype.remove = function() {
          mediator.trigger('item:toggle', (this.options.selected = false), this.model.id);
          return this.render();
        };
      
        DuplicatesRowView.prototype.toggleFlyout = function(ev) {
          var view, _i, _len, _ref1, _results;
          switch (ev.type) {
            case 'mouseover':
              this.views.push(view = new FlyoutView({
                model: this.model
              }));
              return $(ev.target).append(view.render().el);
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
      
        DuplicatesRowView.prototype.portal = function(ev) {
          return mediator.trigger('object:click', this.model, ev.target);
        };
      
        return DuplicatesRowView;
      
      })(View);
      
      module.exports = DuplicatesView;
      
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
          mediator.on('item:toggle', this.render, this);
        }
      
        HeaderView.prototype.render = function() {
          var data;
          data = this.collection.data;
          this.el.html(this.template({
            'selected': mori.count(this.collection.selected),
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

    
    // nomatches.coffee
    require.register('component-400/src/views/nomatches.js', function(exports, require, module) {
    
      var NoMatchesView, View,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../modules/view');
      
      NoMatchesView = (function(_super) {
        __extends(NoMatchesView, _super);
      
        NoMatchesView.prototype.template = require('../templates/nomatches');
      
        function NoMatchesView() {
          NoMatchesView.__super__.constructor.apply(this, arguments);
          this.el.addClass('nomatches section');
        }
      
        NoMatchesView.prototype.render = function() {
          this.el.html(this.template({
            'items': this.collection
          }));
          return this;
        };
      
        return NoMatchesView;
      
      })(View);
      
      module.exports = NoMatchesView;
      
    });

    
    // paginator.coffee
    require.register('component-400/src/views/paginator.js', function(exports, require, module) {
    
      var Paginator, View, mediator,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
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
    
      var FlyoutView, ListView, Paginator, SummaryView, TabContentView, TabSwitcherView, TableRowView, TableView, View, formatter, mediator, _ref, _ref1,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      Paginator = require('./paginator');
      
      FlyoutView = require('./flyout');
      
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
          var collection, content, isFirst, reason, tabs, view, _ref;
          this.el.html(this.template());
          tabs = this.el.find('.tabs');
          content = this.el.find('.tabs-content');
          isFirst = true;
          _ref = this.collection;
          for (reason in _ref) {
            collection = _ref[reason];
            if (!(reason !== 'DUPLICATE' && collection.length)) {
              continue;
            }
            this.views.push(view = new TabSwitcherView({
              'model': {
                'name': this.options.dict[reason]
              },
              reason: reason
            }));
            tabs.append(view.render().el);
            this.views.push(view = new TableView({
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
          var blob, columns, converted, item, list, reason, row, rows, _i, _len, _ref, _ref1;
          columns = null;
          rows = [];
          _ref = this.collection;
          for (reason in _ref) {
            list = _ref[reason];
            if (reason !== 'DUPLICATE') {
              for (_i = 0, _len = list.length; _i < _len; _i++) {
                item = list[_i];
                if (columns) {
                  rows.push(formatter.csv(item, false));
                } else {
                  _ref1 = formatter.csv(item, true), columns = _ref1[0], row = _ref1[1];
                  rows.push(row);
                }
              }
            }
          }
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
      
      TabContentView = (function(_super) {
        __extends(TabContentView, _super);
      
        TabContentView.prototype.tag = 'li';
      
        function TabContentView() {
          TabContentView.__super__.constructor.apply(this, arguments);
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
        }
      
        return TabContentView;
      
      })(View);
      
      TableView = (function(_super) {
        __extends(TableView, _super);
      
        TableView.prototype.template = require('../templates/summary/table');
      
        function TableView() {
          TableView.__super__.constructor.apply(this, arguments);
          this.pagin = new Paginator({
            'total': this.collection.length
          });
          mediator.on('page:change', function(cid, a, b) {
            if (cid !== this.pagin.cid) {
              return;
            }
            return this.renderPage.call(this, a, b);
          }, this);
        }
      
        TableView.prototype.render = function() {
          this.el.html(this.template());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        TableView.prototype.renderPage = function(a, b) {
          var model, tbody, view, _i, _j, _len, _len1, _ref, _ref1, _results;
          tbody = this.el.find('tbody');
          _ref = this.views;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            view.dispose();
          }
          _ref1 = this.collection.slice(a, b);
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            model = _ref1[_j];
            this.views.push(view = new TableRowView({
              model: model
            }));
            _results.push(tbody.append(view.render().el));
          }
          return _results;
        };
      
        return TableView;
      
      })(TabContentView);
      
      TableRowView = (function(_super) {
        __extends(TableRowView, _super);
      
        function TableRowView() {
          _ref = TableRowView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        TableRowView.prototype.template = require('../templates/summary/row');
      
        TableRowView.prototype.tag = 'tr';
      
        TableRowView.prototype.events = {
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        TableRowView.prototype.render = function() {
          this.el.html(this.template({
            'input': this.model.input,
            'matched': formatter.primary(this.model)
          }));
          return this;
        };
      
        TableRowView.prototype.toggleFlyout = function(ev) {
          var view, _i, _len, _ref1, _results;
          switch (ev.type) {
            case 'mouseover':
              this.views.push(view = new FlyoutView({
                model: this.model
              }));
              return $(ev.target).append(view.render().el);
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
      
        TableRowView.prototype.portal = function(ev) {
          return mediator.trigger('object:click', this.model, ev.target);
        };
      
        return TableRowView;
      
      })(View);
      
      ListView = (function(_super) {
        __extends(ListView, _super);
      
        function ListView() {
          _ref1 = ListView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        ListView.prototype.template = require('../templates/summary/list');
      
        return ListView;
      
      })(TabContentView);
      
      module.exports = SummaryView;
      
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
        '3': 'A class of matches'
      };
      
      module.exports = TooltipView;
      
    });
  })();

  // Return the main app.
  var main = require("component-400/src/app.js");

  // Global on server, window in browser.
  var root = this;

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
  

  // Export internal loader?
  root.require = (typeof root.require !== 'undefined') ? root.require : require;
})();