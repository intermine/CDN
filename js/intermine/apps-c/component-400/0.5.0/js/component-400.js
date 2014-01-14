(function() {
  /**
   * Require the given path.
   *
   * @param {String} path
   * @return {Object} exports
   * @api public
   */
  var require = function(path, parent, orig) {
    var resolved = require.resolve(path);

    // lookup failed
    if (null === resolved) {
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
  };

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
      path = paths[i];
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
      } else if ('.' !== path[i] && '' !== path[i]) {
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

    var localRequire = function(path) {
      var resolved = localRequire.resolve(path);
      return require(resolved, parent, path);
    };

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
  root.require = (typeof root.require !== 'undefined') ? root.require : require;

  // All our modules will use global require.
  (function() {
    
    
    // app.coffee
    root.require.register('component-400/src/app.js', function(exports, require, module) {
    
      var AppView, Database, mediator, mori, options;
      
      mori = require('./modules/deps').mori;
      
      mediator = require('./modules/mediator');
      
      options = require('./modules/options');
      
      AppView = require('./views/app');
      
      Database = require('./models/database');
      
      module.exports = function(opts) {
        var db, el;
        if (!opts.cb) {
          throw 'Provide your own callback function';
        }
        options.set(opts.options);
        if (opts.formatter) {
          require('./modules/formatter').primary = opts.formatter;
        }
        db = new Database(opts.data || []);
        mediator.on('object:click', opts.portal || (function() {}), this);
        mediator.on('app:save', function() {
          return opts.cb(mori.into_array(db.selected));
        }, this);
        el = opts.el || opts.target || 'body';
        new AppView({
          el: el,
          db: db
        });
        return function() {
          return mori.into_array(db.selected);
        };
      };
      
    });

    
    // database.coffee
    root.require.register('component-400/src/models/database.js', function(exports, require, module) {
    
      var Database, dict, mediator, mori, _, _ref,
        __hasProp = {}.hasOwnProperty;
      
      _ref = require('../modules/deps'), _ = _ref._, mori = _ref.mori;
      
      mediator = require('../modules/mediator');
      
      Database = (function() {
        function Database(data) {
          var collection, extract, key, name, reason, value, _ref1,
            _this = this;
          this.data = data;
          this.type = this.data.type;
          this.duplicates = this.data.matches.DUPLICATE || [];
          this.matches = (function() {
            var _i, _len, _ref1, _results;
            _ref1 = ['MATCH', 'TYPE_CONVERTED', 'OTHER'];
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              reason = _ref1[_i];
              if (!(((collection = this.data.matches[reason]) != null) && collection.length)) {
                continue;
              }
              name = dict[reason](this.type);
              _results.push({
                name: name,
                collection: collection,
                reason: reason
              });
            }
            return _results;
          }).call(this);
          if ((collection = this.data.unresolved).length) {
            this.matches.push({
              'reason': 'UNRESOLVED',
              collection: collection
            });
          }
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
            var method;
            method = ['disj', 'conj'][+selected];
            return this.selected = mori[method](this.selected, id);
          }, this);
        }
      
        return Database;
      
      })();
      
      dict = {
        'MATCH': function() {
          return 'direct hit';
        },
        'TYPE_CONVERTED': function(type) {
          return "non-" + type + " identifier";
        },
        'OTHER': function() {
          return 'synonym';
        },
        'WILDCARD': function() {
          return 'wildcard';
        }
      };
      
      module.exports = Database;
      
    });

    
    // tooltips.coffee
    root.require.register('component-400/src/models/tooltips.js', function(exports, require, module) {
    
      module.exports = {
        '1': "These identifiers matched more than\none record in the database. Click on the\nADD button next to the identifier you\nwant to include in your list.",
        'provided': "These are the identifiers you typed\nin the form on the previous page.",
        'add': "Use these buttons to add (or remove)\nthis record to your list.",
        'matches': "These are the records in the database that correspond\nto the identifier you entered on the previous page.",
        '2': 'This is a summary of what is in your list.',
        'match': "An exact match was found between what\nyou entered and what is in our database.",
        'type_converted': "These identifiers matched records in our\ndatabase but were not the type of data you\nspecified on the previous page.",
        'other': 'These identifiers matched old identifiers.',
        '4': 'Identifiers that could not be resolved.',
        '5': "Multiple identifiers matched an object.",
        'noblob': "Please upgrade your browser to be able to\ndownload a summary table."
      };
      
    });

    
    // csv.coffee
    root.require.register('component-400/src/modules/csv.js', function(exports, require, module) {
    
      var escape, _;
      
      _ = require('./deps')._;
      
      escape = function(text) {
        if (!text) {
          return '""';
        }
        return '"' + new String(text).replace(/\"/g, '""') + '"';
      };
      
      exports.save = function(rows, delimiter, newline) {
        if (delimiter == null) {
          delimiter = ' ';
        }
        if (!newline) {
          switch (false) {
            case navigator.appVersion.indexOf('Win') === -1:
              newline = "\r\n";
              break;
            default:
              newline = "\n";
          }
        }
        return _.map(rows, function(row) {
          return _.map(row, escape).join(delimiter);
        }).join(newline);
      };
      
      exports.read = function(data, delimiter) {
        var column, foundDelimiter, matches, objPattern, quoted, row, sheet, value, _ref;
        if (delimiter == null) {
          delimiter = ',';
        }
        if (!data.length) {
          return {};
        }
        objPattern = new RegExp("(\\" + delimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + delimiter + "\\r\\n]*))", "gi");
        sheet = {};
        matches = null;
        row = 0;
        column = 0;
        while (matches = objPattern.exec(data)) {
          _ref = matches.slice(1), foundDelimiter = _ref[0], quoted = _ref[1], value = _ref[2];
          if (foundDelimiter && (foundDelimiter !== delimiter)) {
            row++;
            column = 0;
          }
          if (quoted) {
            value = quoted.replace(new RegExp("\"\"", "g"), "\"");
          }
          if (value && value.length !== 0) {
            sheet[String.fromCharCode(65 + column++) + row] = value;
          } else {
            column++;
          }
        }
        return sheet;
      };
      
    });

    
    // deps.coffee
    root.require.register('component-400/src/modules/deps.js', function(exports, require, module) {
    
      module.exports = {
        _: _,
        mori: mori,
        BackboneEvents: BackboneEvents,
        saveAs: saveAs,
        $: $
      };
      
    });

    
    // formatter.coffee
    root.require.register('component-400/src/modules/formatter.js', function(exports, require, module) {
    
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
          var k, v, _ref, _results;
          _ref = model.summary;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            if (v) {
              _results.push([this.field(k), v]);
            }
          }
          return _results;
        },
        'field': function(text) {
          return text.replace(/\./g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase();
        }
      };
      
    });

    
    // mediator.coffee
    root.require.register('component-400/src/modules/mediator.js', function(exports, require, module) {
    
      var BackboneEvents;
      
      BackboneEvents = require('./deps').BackboneEvents;
      
      module.exports = _.extend({}, BackboneEvents);
      
    });

    
    // options.coffee
    root.require.register('component-400/src/modules/options.js', function(exports, require, module) {
    
      var options;
      
      options = {
        'showDownloadSummary': true,
        'matchViewStrategy': 'full'
      };
      
      module.exports = {
        'set': function(key, value) {
          if (_.isObject(key)) {
            return _.extend(options, key);
          }
          return options[key] = value;
        },
        'get': function(key) {
          if (key) {
            return options[key];
          }
          return options;
        }
      };
      
    });

    
    // slicer.coffee
    root.require.register('component-400/src/modules/slicer.js', function(exports, require, module) {
    
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
    root.require.register('component-400/src/modules/view.js', function(exports, require, module) {
    
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
              case 'collection':
              case 'model':
                this[k] = v;
                break;
              case 'el':
                this.el = $(v);
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
          switch (false) {
            case !this.collection:
              this.el.html(this.template({
                'collection': JSON.parse(JSON.stringify(this.collection))
              }));
              break;
            case !this.model:
              this.el.html(this.template(JSON.parse(JSON.stringify(this.model))));
              break;
            default:
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

    
    // app.eco
    root.require.register('component-400/src/templates/app.js', function(exports, require, module) {
    
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
          
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // row.eco
    root.require.register('component-400/src/templates/duplicates/row.js', function(exports, require, module) {
    
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
            var field, _i, _len, _ref;
          
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
          
            __out.push('\n');
          
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              field = _ref[_i];
              __out.push('\n    <td>\n        ');
              if (field) {
                __out.push('\n            <a>');
                __out.push(field);
                __out.push('</a>\n            ');
                if (this.showFlyout) {
                  __out.push('\n                <span class="help-flyout">i</span>\n            ');
                }
                __out.push('\n        ');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n');
          
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

    
    // table-head-full.eco
    root.require.register('component-400/src/templates/duplicates/table-head-full.js', function(exports, require, module) {
    
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
            var field, _i, _len, _ref;
          
            __out.push('<tr>\n    <th rowspan="2">Identifier you provided</th>\n    <th colspan="');
          
            __out.push(__sanitize(this.fields.length));
          
            __out.push('">Matches <span data-id="matches" class="help hint--left">i</span></th>\n    <th rowspan="2">Action <span data-id="add" class="help hint--left">i</span></th>\n</tr>\n<tr>\n    ');
          
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              field = _ref[_i];
              __out.push('\n    <th data-key="');
              __out.push(__sanitize(field.key));
              __out.push('">');
              __out.push(__sanitize(field.name));
              __out.push('</th>\n    ');
            }
          
            __out.push('\n</tr>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table-head-slim.eco
    root.require.register('component-400/src/templates/duplicates/table-head-slim.js', function(exports, require, module) {
    
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
            __out.push('<tr>\n    <th>Identifier you provided <span data-id="provided" class="help hint--right">i</span></a></th>\n    <th>Matches <span data-id="matches" class="help hint--left">i</span></th>\n    <th>Action <span data-id="add" class="help hint--left">i</span></th>\n</tr>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    root.require.register('component-400/src/templates/duplicates/table.js', function(exports, require, module) {
    
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
            __out.push('<header>\n    <span class="small secondary remove-all button">Remove all</span>\n    <span class="small success add-all button">Add all</span>\n    <h2>Duplicates found - which one(s) do you want?</h2>\n    <span data-id="1" class="help hint--left">i</span>\n</header>\n\n<div class="paginator"></div>\n\n<table class="striped">\n    <thead>\n        <tr>\n            <th>Identifier you provided <span data-id="provided" class="help hint--right">i</span></a></th>\n            <th>Matches <span data-id="matches" class="help hint--left">i</span></th>\n            <th>Action <span data-id="add" class="help hint--left">i</span></th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // flyout.eco
    root.require.register('component-400/src/templates/flyout.js', function(exports, require, module) {
    
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
    root.require.register('component-400/src/templates/header.js', function(exports, require, module) {
    
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
              __out.push(__sanitize(this.type));
              __out.push('</a>\n    ');
            } else {
              __out.push('\n        <a class="success button save">Save a list of ');
              __out.push(__sanitize(this.selected));
              __out.push(' ');
              __out.push(__sanitize(this.type));
              __out.push('s</a>\n    ');
            }
          
            __out.push('\n\n    <table>\n        <tr>\n            <td>You entered:</td>\n            <td>');
          
            __out.push(__sanitize(this.entered));
          
            __out.push(' identifier');
          
            if (this.entered !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n        <tr>\n            <td>We found:</td>\n            <td>');
          
            __out.push(__sanitize(this.found));
          
            __out.push(' ');
          
            __out.push(__sanitize(this.type));
          
            if (this.found !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n    </table>\n\n    ');
          
            if (this.entered !== this.found) {
              __out.push('\n        <p>Why are the numbers different? See below.</p>\n    ');
            }
          
            __out.push('\n</header>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // paginator.eco
    root.require.register('component-400/src/templates/paginator.js', function(exports, require, module) {
    
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
            var n, page, _i, _j, _len, _len1, _ref, _ref1;
          
            __out.push('<!-- does it make sense to show a perPage switcher? -->\n');
          
            if (this.total > 5) {
              __out.push('\n    <div class="small button dropdown secondary right">\n        ');
              __out.push(__sanitize(this.perPage));
              __out.push(' rows per page\n        <ul class="no-hover">\n            ');
              _ref = [5, 10, 20, 50, 100];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                n = _ref[_i];
                if (!(n <= this.total)) {
                  continue;
                }
                __out.push('\n                ');
                if (n !== this.perPage) {
                  __out.push('\n                    <li data-action="resize" data-n="');
                  __out.push(__sanitize(n));
                  __out.push('">\n                        <a>Show ');
                  __out.push(__sanitize(n));
                  __out.push(' rows</a>\n                    </li>\n                ');
                }
                __out.push('\n            ');
              }
              __out.push('\n            <!-- show all rows? -->\n            ');
              if (this.total <= 50 && this.total !== this.perPage) {
                __out.push('\n                <li class="divider"></li>\n                <li data-action="resize" data-n="');
                __out.push(__sanitize(this.total));
                __out.push('">\n                    <a>Show all rows</a>\n                </li>\n            ');
              }
              __out.push('\n        </ul>\n    </div>\n');
            }
          
            __out.push('\n\n<!-- do we need to show a paginator? -->\n<ul class="pagination">\n    ');
          
            if (this.pages > 1) {
              __out.push('\n        <li class="unavailable"><a>Page ');
              __out.push(__sanitize(this.current));
              __out.push(' of ');
              __out.push(__sanitize(this.pages));
              __out.push('</a></li>\n        ');
              if (this.current === 1) {
                __out.push('\n            <li class="unavailable arrow"><a>&lsaquo;</a></li>\n        ');
              } else {
                __out.push('\n            <li class="arrow" data-action="prev" title="Previous"><a>&lsaquo;</a></li>\n        ');
              }
              __out.push('\n\n        ');
              _ref1 = this.range;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                page = _ref1[_j];
                __out.push('\n            ');
                if (page === null) {
                  __out.push('\n                <li class="unavailable"><a>&hellip;</a></li>\n            ');
                } else {
                  __out.push('\n                <li data-action="select" data-n="');
                  __out.push(__sanitize(page));
                  __out.push('"\n                    ');
                  if (page === this.current) {
                    __out.push('\n                        class="current"\n                    ');
                  }
                  __out.push('\n                ><a>');
                  __out.push(__sanitize(page));
                  __out.push('</a></li>\n            ');
                }
                __out.push('\n        ');
              }
              __out.push('\n\n        ');
              if (this.current === this.pages) {
                __out.push('\n            <li class="unavailable arrow"><a>&rsaquo;</a></li>\n        ');
              } else {
                __out.push('\n            <li class="arrow" data-action="next" title="Next"><a>&rsaquo;</a></li>\n        ');
              }
              __out.push('\n    ');
            }
          
            __out.push('\n</ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tab.eco
    root.require.register('component-400/src/templates/summary/tab.js', function(exports, require, module) {
    
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
          
            __out.push('s <span data-id="');
          
            __out.push(__sanitize(this.reason));
          
            __out.push('" class="help hint--top">i</span></a>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tabs.eco
    root.require.register('component-400/src/templates/summary/tabs.js', function(exports, require, module) {
    
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
          
            if (this.options.showDownloadSummary) {
              __out.push('\n        ');
              if (this.canDownload) {
                __out.push('\n            <span class="small download button">Download summary</span>\n        ');
              } else {
                __out.push('\n            <span data-id="noblob" class="help hint--left right">i</span>\n            <span class="small secondary disabled button">Download summary</span>\n        ');
              }
              __out.push('\n    ');
            }
          
            __out.push('\n    <h2>Summary</h2>\n    <span data-id="2" class="help hint--right">i</span>\n</header>\n<dl class="tabs contained"></dl>\n<ul class="tabs-content contained"></ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // many-to-one-row.eco
    root.require.register('component-400/src/templates/table/many-to-one-row.js', function(exports, require, module) {
    
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
            var field, item, _i, _j, _len, _len1, _ref, _ref1;
          
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
              __out.push('\n        </ul>\n        ');
              if (this.input.length !== 1) {
                __out.push('\n            <span data-id="5" class="help">i</span>\n        ');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n');
          
            _ref1 = this.fields;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              field = _ref1[_j];
              __out.push('\n    <td>\n        ');
              if (field) {
                __out.push('\n            <a>');
                __out.push(field);
                __out.push('</a>\n            ');
                if (this.showFlyout) {
                  __out.push('\n                <span class="help-flyout">i</span>\n            ');
                }
                __out.push('\n        ');
              }
              __out.push('\n    </td>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // one-to-many-row.eco
    root.require.register('component-400/src/templates/table/one-to-many-row.js', function(exports, require, module) {
    
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
            var field, _i, _len, _ref;
          
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
          
            __out.push('\n');
          
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              field = _ref[_i];
              __out.push('\n    <td>\n        ');
              if (field) {
                __out.push('\n            <a>');
                __out.push(field);
                __out.push('</a>\n            ');
                if (this.showFlyout) {
                  __out.push('\n                <span class="help-flyout">i</span>\n            ');
                }
                __out.push('\n        ');
              }
              __out.push('\n    </td>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table-head-full.eco
    root.require.register('component-400/src/templates/table/table-head-full.js', function(exports, require, module) {
    
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
            var field, _i, _len, _ref;
          
            __out.push('<tr>\n    <th rowspan="2">Identifier you provided</th>\n    <th colspan="');
          
            __out.push(__sanitize(this.fields.length));
          
            __out.push('">Match <span data-id="matches" class="help hint--left">i</span></th>\n</tr>\n<tr>\n    ');
          
            _ref = this.fields;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              field = _ref[_i];
              __out.push('\n    <th data-key="');
              __out.push(__sanitize(field.key));
              __out.push('">');
              __out.push(__sanitize(field.name));
              __out.push('</th>\n    ');
            }
          
            __out.push('\n</tr>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table-head-slim.eco
    root.require.register('component-400/src/templates/table/table-head-slim.js', function(exports, require, module) {
    
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
            __out.push('<tr>\n    <th>Identifier you provided</th>\n    <th>Match <span data-id="matches" class="help hint--left">i</span></th>\n</tr>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    root.require.register('component-400/src/templates/table/table.js', function(exports, require, module) {
    
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
            __out.push('<div class="paginator"></div>\n\n<table class="striped">\n    <thead></thead>\n    <tbody></tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // unresolved.eco
    root.require.register('component-400/src/templates/unresolved.js', function(exports, require, module) {
    
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
          
            __out.push('<header>\n    <h2>No matches found</h2>\n    <span data-id="4" class="help hint--top">i</span>\n</header>\n\n<ul class="inline">\n    ');
          
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
    root.require.register('component-400/src/views/app.js', function(exports, require, module) {
    
      var $, AppView, DuplicatesTableView, HeaderView, SummaryView, UnresolvedView, View, mediator, tooltips, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      $ = require('../modules/deps').$;
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      tooltips = require('../models/tooltips');
      
      HeaderView = require('./header');
      
      DuplicatesTableView = require('./duplicates');
      
      UnresolvedView = require('./unresolved');
      
      SummaryView = require('./summary');
      
      HeaderView = require('./header');
      
      AppView = (function(_super) {
        __extends(AppView, _super);
      
        function AppView() {
          _ref = AppView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        AppView.prototype.autoRender = true;
      
        AppView.prototype.template = require('../templates/app');
      
        AppView.prototype.events = {
          'mouseover .help': 'addTooltip'
        };
      
        AppView.prototype.render = function() {
          var collection;
          AppView.__super__.render.apply(this, arguments);
          this.el.append((new HeaderView({
            'db': this.options.db
          })).render().el);
          if ((collection = this.options.db.duplicates).length) {
            this.el.append((new DuplicatesTableView({
              collection: collection
            })).render().el);
          }
          this.el.append((new SummaryView({
            'matches': this.options.db.matches
          })).render().el);
          if ((collection = this.options.db.data.unresolved).length) {
            this.el.append((new UnresolvedView({
              collection: collection
            })).render().el);
          }
          return this;
        };
      
        AppView.prototype.addTooltip = function(ev) {
          var target;
          target = $(ev.target);
          target.addClass('hint--bounce');
          return ev.target.setAttribute('data-hint', tooltips[target.data('id')]);
        };
      
        return AppView;
      
      })(View);
      
      module.exports = AppView;
      
    });

    
    // duplicates.coffee
    root.require.register('component-400/src/views/duplicates.js', function(exports, require, module) {
    
      var Daddy, DuplicatesTableRowView, DuplicatesTableView, FlyoutView, Table, View, formatter, mediator, options, _, _ref, _ref1,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ = require('../modules/deps')._;
      
      formatter = require('../modules/formatter');
      
      mediator = require('../modules/mediator');
      
      options = require('../modules/options');
      
      View = require('../modules/view');
      
      FlyoutView = require('../views/flyout');
      
      Table = require('../views/table');
      
      Daddy = Table.TableRowView;
      
      DuplicatesTableRowView = (function(_super) {
        __extends(DuplicatesTableRowView, _super);
      
        function DuplicatesTableRowView() {
          _ref = DuplicatesTableRowView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        DuplicatesTableRowView.prototype.template = require('../templates/duplicates/row');
      
        DuplicatesTableRowView.prototype.events = _.extend({}, Daddy.prototype.events, {
          'click .button': 'toggle'
        });
      
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
      
      })(Daddy);
      
      DuplicatesTableView = (function(_super) {
        __extends(DuplicatesTableView, _super);
      
        function DuplicatesTableView() {
          _ref1 = DuplicatesTableView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        DuplicatesTableView.prototype.template = {
          table: require('../templates/duplicates/table'),
          thead: {
            slim: require('../templates/duplicates/table-head-slim'),
            full: require('../templates/duplicates/table-head-full')
          }
        };
      
        DuplicatesTableView.prototype.rowClass = DuplicatesTableRowView;
      
        DuplicatesTableView.prototype.events = {
          'click .button.add-all': 'addAll',
          'click .button.remove-all': 'removeAll'
        };
      
        DuplicatesTableView.prototype.render = function() {
          this.el.addClass('duplicates section');
          return DuplicatesTableView.__super__.render.apply(this, arguments);
        };
      
        DuplicatesTableView.prototype.addAll = function() {
          return this.doAll(true);
        };
      
        DuplicatesTableView.prototype.removeAll = function() {
          return this.doAll(false);
        };
      
        DuplicatesTableView.prototype.doAll = function(state) {
          var item, match, _i, _j, _len, _len1, _ref2, _ref3;
          _ref2 = this.collection;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            item = _ref2[_i];
            _ref3 = item.matches;
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
              match = _ref3[_j];
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
    root.require.register('component-400/src/views/flyout.js', function(exports, require, module) {
    
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
    root.require.register('component-400/src/views/header.js', function(exports, require, module) {
    
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
          this.found = mori.count(this.options.db.selected);
          mediator.on('item:toggle', this.render, this);
        }
      
        HeaderView.prototype.render = function() {
          this.el.addClass('header section');
          this.el.html(this.template({
            'selected': mori.count(this.options.db.selected),
            'type': this.options.db.type,
            'entered': this.options.db.data.stats.identifiers.all,
            found: this.found
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
    root.require.register('component-400/src/views/paginator.js', function(exports, require, module) {
    
      var $, Paginator, View, mediator, _, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), $ = _ref.$, _ = _ref._;
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      Paginator = (function(_super) {
        __extends(Paginator, _super);
      
        Paginator.prototype.template = require('../templates/paginator');
      
        Paginator.prototype.events = {
          'click a': 'onclick',
          'click div.dropdown': 'dropdown'
        };
      
        function Paginator() {
          var _base, _base1, _base2;
          Paginator.__super__.constructor.apply(this, arguments);
          if ((_base = this.options).total == null) {
            _base.total = 0;
          }
          if ((_base1 = this.options).perPage == null) {
            _base1.perPage = 5;
          }
          if ((_base2 = this.options).current == null) {
            _base2.current = 1;
          }
        }
      
        Paginator.prototype.render = function() {
          var a, b,
            _this = this;
          this.options.pages = Math.ceil(this.options.total / this.options.perPage);
          (function() {
            var diff, max, min, number, previous, range, _i, _j, _len, _ref1, _ref2, _results, _results1;
            _this.options.range = [];
            if (_this.options.pages === 1) {
              return;
            }
            min = _this.options.current - 2;
            max = _this.options.current + 2;
            if ((diff = _this.options.pages - max) < 0) {
              min += diff;
            }
            if ((diff = 1 - min) > 0) {
              max += diff;
            }
            range = (function() {
              _results = [];
              for (var _i = _ref1 = Math.max(1, min), _ref2 = Math.min(_this.options.pages, max); _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref1 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this);
            range.push(1);
            range.push(_this.options.pages);
            range = _.unique(range).sort(function(a, b) {
              return a - b;
            });
            _this.options.range = [];
            previous = range[0] - 1;
            _results1 = [];
            for (_j = 0, _len = range.length; _j < _len; _j++) {
              number = range[_j];
              if (previous) {
                switch (false) {
                  case previous + 2 !== number:
                    _this.options.range.push(previous + 1);
                    break;
                  case !(previous + 1 < number):
                    _this.options.range.push(null);
                }
              }
              _results1.push(_this.options.range.push(previous = number));
            }
            return _results1;
          })();
          this.el.html(this.template(this.options));
          b = Math.min((a = (this.options.current - 1) * this.options.perPage) + this.options.perPage, this.options.total);
          mediator.trigger('page:change', this.cid, a, b);
          return this;
        };
      
        Paginator.prototype.onclick = function(evt) {
          var fn, li;
          switch (fn = (li = $(evt.target).closest('li')).data('action')) {
            case 'select':
            case 'resize':
              this[fn](parseInt(li.data('n')));
              break;
            case 'first':
            case 'prev':
            case 'next':
            case 'last':
              this[fn]();
          }
          this.render();
          evt.preventDefault();
          return false;
        };
      
        Paginator.prototype.first = function() {
          return this.select(0);
        };
      
        Paginator.prototype.prev = function() {
          return this.select(Math.max(1, this.options.current - 1));
        };
      
        Paginator.prototype.next = function() {
          return this.select(Math.min(this.options.pages, this.options.current + 1));
        };
      
        Paginator.prototype.last = function() {
          return this.select(this.options.pages - 1);
        };
      
        Paginator.prototype.select = function(current) {
          return this.options.current = current;
        };
      
        Paginator.prototype.resize = function(n) {
          var row;
          row = 1 + (this.options.perPage * (this.options.current - 1));
          this.options.perPage = n;
          return this.options.current = Math.ceil(row / this.options.perPage);
        };
      
        Paginator.prototype.dropdown = function() {
          return this.el.find('.dropdown ul').toggleClass('show-dropdown');
        };
      
        return Paginator;
      
      })(View);
      
      module.exports = Paginator;
      
    });

    
    // summary.coffee
    root.require.register('component-400/src/views/summary.js', function(exports, require, module) {
    
      var SummaryView, TabMatchesTableView, TabSwitcherView, TabTableView, Table, View, csv, formatter, mediator, options, saveAs, _, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), _ = _ref._, saveAs = _ref.saveAs;
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      options = require('../modules/options');
      
      csv = require('../modules/csv');
      
      View = require('../modules/view');
      
      Table = require('./table');
      
      SummaryView = (function(_super) {
        __extends(SummaryView, _super);
      
        SummaryView.prototype.template = require('../templates/summary/tabs');
      
        SummaryView.prototype.events = {
          'click .button.download': 'download'
        };
      
        SummaryView.prototype.canDownload = false;
      
        function SummaryView() {
          SummaryView.__super__.constructor.apply(this, arguments);
          try {
            this.canDownload = !!new Blob();
          } catch (_error) {}
        }
      
        SummaryView.prototype.render = function() {
          var Clazz, collection, content, name, reason, showFirstTab, tabs, view, _i, _len, _ref1, _ref2;
          this.el.addClass('summary section');
          this.el.html(this.template({
            canDownload: this.canDownload,
            'options': options.get()
          }));
          tabs = this.el.find('.tabs');
          content = this.el.find('.tabs-content');
          showFirstTab = _.once(function(reason) {
            return mediator.trigger('tab:switch', reason);
          });
          _ref1 = this.options.matches;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            _ref2 = _ref1[_i], name = _ref2.name, collection = _ref2.collection, reason = _ref2.reason;
            if (!(reason !== 'UNRESOLVED')) {
              continue;
            }
            this.views.push(view = new TabSwitcherView({
              'model': {
                name: name,
                'reason': reason.toLowerCase()
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
            showFirstTab(reason);
          }
          return this;
        };
      
        SummaryView.prototype.download = function() {
          var adder, blob, collection, columns, converted, input, item, match, reason, rows, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _ref4;
          columns = null;
          rows = [];
          adder = function(match, input, count) {
            var row, _ref1;
            _ref1 = formatter.csv(match, columns), columns = _ref1[0], row = _ref1[1];
            return rows.push([input, reason, count].concat(row));
          };
          _ref1 = this.options.matches;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            _ref2 = _ref1[_i], collection = _ref2.collection, reason = _ref2.reason;
            for (_j = 0, _len1 = collection.length; _j < _len1; _j++) {
              item = collection[_j];
              switch (reason) {
                case 'MATCH':
                  _ref3 = item.input;
                  for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
                    input = _ref3[_k];
                    adder(item, input, 1);
                  }
                  break;
                case 'UNRESOLVED':
                  rows.push([item, reason, 0]);
                  break;
                default:
                  _ref4 = item.matches;
                  for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
                    match = _ref4[_l];
                    adder(match, item.input, item.matches.length);
                  }
              }
            }
          }
          columns = ['input', 'reason', 'matches'].concat(columns);
          converted = csv.save([columns].concat(rows));
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
    root.require.register('component-400/src/views/table.js', function(exports, require, module) {
    
      var $, Fields, FlyoutView, ManyToOneTableRowView, ManyToOneTableView, OneToManyTableView, Paginator, TableRowView, TableView, View, formatter, mediator, options, slicer, _, _ref, _ref1,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), _ = _ref._, $ = _ref.$;
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      options = require('../modules/options');
      
      View = require('../modules/view');
      
      Paginator = require('./paginator');
      
      FlyoutView = require('./flyout');
      
      slicer = require('../modules/slicer');
      
      Fields = function() {
        var list;
        list = [];
        list.set = {};
        list.add = function(key) {
          var obj;
          if (list.set[key]) {
            return;
          }
          obj = {
            key: key,
            'name': formatter.field(key)
          };
          list.set[key] = obj;
          return list.push(obj);
        };
        return list;
      };
      
      TableRowView = (function(_super) {
        __extends(TableRowView, _super);
      
        TableRowView.prototype.template = require('../templates/table/one-to-many-row');
      
        TableRowView.prototype.tag = 'tr';
      
        TableRowView.prototype.events = {
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        function TableRowView() {
          TableRowView.__super__.constructor.apply(this, arguments);
          this.strategy = options.get('matchViewStrategy');
        }
      
        TableRowView.prototype.render = function() {
          var fields, key, showFlyout, _i, _len, _ref1;
          fields = [];
          showFlyout = true;
          switch (this.strategy) {
            case 'full':
              if (this.options.fields) {
                _ref1 = this.options.fields;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  key = _ref1[_i].key;
                  fields.push(this.model.summary[key]);
                }
                showFlyout = false;
              }
              break;
            case 'slim':
              fields.push(formatter.primary(this.model));
          }
          this.el.html(this.template({
            'fields': fields,
            'input': this.options.input || this.model.input,
            'rowspan': this.options.rowspan,
            'class': this.options["class"],
            'showFlyout': showFlyout,
            'selected': this.model.selected || false,
            'continuing': this.options.continuing || false
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
      
      TableView = (function(_super) {
        __extends(TableView, _super);
      
        TableView.prototype.template = {
          table: require('../templates/table/table'),
          thead: {
            slim: require('../templates/table/table-head-slim'),
            full: require('../templates/table/table-head-full')
          }
        };
      
        function TableView() {
          TableView.__super__.constructor.apply(this, arguments);
          this.strategy = options.get('matchViewStrategy');
        }
      
        return TableView;
      
      })(View);
      
      OneToManyTableView = (function(_super) {
        __extends(OneToManyTableView, _super);
      
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
          this.el.html(this.template.table());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        OneToManyTableView.prototype.renderPage = function(aRng, bRng) {
          var fields, i, tbody;
          this.range = [aRng, bRng];
          while (this.views.length) {
            this.views.pop().dispose();
          }
          fields = new Fields();
          i = 0;
          slicer.apply(this, [this.collection].concat(this.range, function(_arg, begin, end) {
            var input, j, matches, model, _ref1;
            input = _arg.input, matches = _arg.matches;
            _ref1 = matches.slice(begin, +end + 1 || 9e9);
            for (j in _ref1) {
              model = _ref1[j];
              this.views.push(new this.rowClass((function() {
                if (j !== '0') {
                  return {
                    model: model,
                    fields: fields
                  };
                }
                return {
                  model: model,
                  fields: fields,
                  'rowspan': end - begin + 1,
                  'class': ['even', 'odd'][i % 2],
                  'continuing': begin !== 0,
                  'input': [input]
                };
              })()));
              _.each(_.keys(model.summary), fields.add);
            }
            return i++;
          }));
          this.el.find('thead').html(this.template.thead[this.strategy]({
            fields: fields
          }));
          tbody = this.el.find('tbody');
          return _.each(this.views, function(view) {
            return tbody.append(view.render().el);
          });
        };
      
        return OneToManyTableView;
      
      })(TableView);
      
      ManyToOneTableRowView = (function(_super) {
        __extends(ManyToOneTableRowView, _super);
      
        function ManyToOneTableRowView() {
          _ref1 = ManyToOneTableRowView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        ManyToOneTableRowView.prototype.template = require('../templates/table/many-to-one-row');
      
        return ManyToOneTableRowView;
      
      })(TableRowView);
      
      ManyToOneTableView = (function(_super) {
        __extends(ManyToOneTableView, _super);
      
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
          this.el.html(this.template.table());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        ManyToOneTableView.prototype.renderPage = function(aRng, bRng) {
          var fields, model, tbody, _i, _len, _ref2;
          this.range = [aRng, bRng];
          while (this.views.length) {
            this.views.pop().dispose();
          }
          fields = new Fields();
          _ref2 = this.collection.slice(aRng, +bRng + 1 || 9e9);
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            model = _ref2[_i];
            this.views.push(new this.rowClass({
              model: model,
              fields: fields
            }));
            _.each(_.keys(model.summary), fields.add);
          }
          this.el.find('thead').html(this.template.thead[this.strategy]({
            fields: fields
          }));
          tbody = this.el.find('tbody');
          return _.each(this.views, function(view) {
            return tbody.append(view.render().el);
          });
        };
      
        return ManyToOneTableView;
      
      })(TableView);
      
      exports.TableRowView = TableRowView;
      
      exports.OtMTableView = OneToManyTableView;
      
      exports.MtOTableView = ManyToOneTableView;
      
    });

    
    // unresolved.coffee
    root.require.register('component-400/src/views/unresolved.js', function(exports, require, module) {
    
      var UnresolvedView, View, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../modules/view');
      
      UnresolvedView = (function(_super) {
        __extends(UnresolvedView, _super);
      
        function UnresolvedView() {
          _ref = UnresolvedView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        UnresolvedView.prototype.template = require('../templates/unresolved');
      
        UnresolvedView.prototype.render = function() {
          this.el.addClass('unresolved section');
          return UnresolvedView.__super__.render.apply(this, arguments);
        };
      
        return UnresolvedView;
      
      })(View);
      
      module.exports = UnresolvedView;
      
    });
  })();

  // Return the main app.
  var main = root.require("component-400/src/app.js");

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
  
  root.require.alias("component-400/src/app.js", "component-400/index.js");
  
})();