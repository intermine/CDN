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
    
    
    // channel.coffee
    require.register('pomme.js/src/channel.js', function(exports, require, module) {
    
      var ChanID, Channel, FnID, constants, helpers, iFrame, router, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __slice = [].slice;
      
      iFrame = require('./iframe');
      
      helpers = require('./helpers');
      
      _ref = require('./router'), ChanID = _ref.ChanID, FnID = _ref.FnID, router = _ref.router;
      
      constants = require('./constants');
      
      Channel = (function() {
        Channel.prototype.ready = false;
      
        Channel.prototype.scope = 'testScope';
      
        function Channel(opts) {
          this.onMessage = __bind(this.onMessage, this);
          this.onReady = __bind(this.onReady, this);
          var scope, target, template,
            _this = this;
          if (opts == null) {
            opts = {};
          }
          target = opts.target, scope = opts.scope, template = opts.template;
          this.id = new ChanID().id;
          if (scope) {
            this.scope = scope;
          }
          if (!_.isString(this.scope)) {
            throw 'only strings accepted for a scope';
          }
          switch (false) {
            case !_.isWindow(target):
              this.window = target;
              break;
            case !target:
              this.window = (this.iframe = new iFrame({
                id: this.id,
                target: target,
                scope: this.scope,
                template: template
              })).el;
              break;
            default:
              this.window = window.parent;
              this.child = true;
          }
          if (window === this.window) {
            throw 'child and parent windows cannot be one and the same';
          }
          this.handlers = {};
          this.pending = [];
          router.register(this.window, this.scope, this.onMessage);
          this.on(constants.ready, this.onReady);
          this.on('eval', function(code) {
            return eval.call(_this, code);
          });
          helpers.nextTick(function() {
            return _this.postMessage({
              'method': _this.scopeMethod(constants.ready),
              'params': ['ping']
            }, true);
          });
        }
      
        Channel.prototype.onReady = function(type) {
          var _results;
          if (this.ready) {
            return this.error('received ready message while in ready state');
          }
          this.id += [':B', ':A'][+type === 'ping'];
          this.unbind(constants.ready);
          this.ready = true;
          if (type === 'ping') {
            this.trigger(constants.ready, 'pong');
          }
          _results = [];
          while (this.pending.length) {
            _results.push(this.postMessage(this.pending.pop()));
          }
          return _results;
        };
      
        Channel.prototype.trigger = function() {
          var defunc, e, method, opts, params,
            _this = this;
          method = arguments[0], opts = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          try {
            JSON.stringify(opts);
          } catch (_error) {
            e = _error;
            return this.error('cannot convert circular structure');
          }
          params = (defunc = function(obj) {
            var id;
            if (_.isFunction(obj)) {
              id = new FnID().id;
              _this.on(id, obj);
              return id;
            } else {
              switch (false) {
                case !_.isArray(obj):
                  return _.collect(obj, defunc);
                case !_.isObject(obj):
                  return _.transform(obj, function(result, val, key) {
                    return result[key] = defunc(val);
                  });
                default:
                  return obj;
              }
            }
          })(opts);
          this.postMessage({
            'method': this.scopeMethod(method),
            params: params
          });
          return this;
        };
      
        Channel.prototype.postMessage = function(message, force) {
          if (force == null) {
            force = false;
          }
          if (this.disposed) {
            return;
          }
          if (!force && !this.ready) {
            return this.pending.push(message);
          }
          message[constants.postmessage] = true;
          return this.window.postMessage(JSON.stringify(message), '*');
        };
      
        Channel.prototype.onMessage = function(method, params) {
          var err, handler, makefunc,
            _this = this;
          params = (makefunc = function(obj) {
            switch (false) {
              case !_.isArray(obj):
                return _.collect(obj, makefunc);
              case !_.isObject(obj):
                return _.transform(obj, function(result, val, key) {
                  return result[key] = makefunc(val);
                });
              case !(_.isString(obj) && obj.match(constants["function"])):
                return function() {
                  return _this.trigger.apply(_this, [obj].concat(_.toArray(arguments)));
                };
              default:
                return obj;
            }
          })(params);
          if (!_.isFunction(handler = this.handlers[method])) {
            return;
          }
          if (!_.isArray(params)) {
            params = [params];
          }
          try {
            return handler.apply(null, params);
          } catch (_error) {
            err = _error;
            return this.error(err);
          }
        };
      
        Channel.prototype.scopeMethod = function(method) {
          return [this.scope, method].join('::');
        };
      
        Channel.prototype.on = function(method, cb) {
          if (this.disposed) {
            return;
          }
          if (!method || !_.isString(method)) {
            return this.error('`method` must be string');
          }
          if (!cb || !_.isFunction(cb)) {
            return this.error('callback missing');
          }
          if (this.handlers[method]) {
            return this.error("`" + method + "` is already bound");
          }
          this.handlers[method] = cb;
          return this;
        };
      
        Channel.prototype.unbind = function(method) {
          if (!(method in this.handlers)) {
            return this.error("`" + method + "` is not bound");
          }
          return delete this.handlers[method];
        };
      
        Channel.prototype.error = function(err) {
          var message, _base;
          message = null;
          switch (false) {
            case !_.isString(err):
              message = err;
              break;
            case !_.isArray(err):
              message = err[1];
              break;
            case !(_.isObject(err) && _.isString(err.message)):
              message = err.message;
          }
          if (!message) {
            try {
              message = JSON.stringify(err);
            } catch (_error) {
              message = err.toString();
            }
          }
          if (this.child) {
            if (_.isFunction(this.handlers.error)) {
              return this.handlers.error(message);
            } else {
              return this.trigger('error', message);
            }
          } else {
            if ((_base = this.handlers).error == null) {
              _base.error = function(err) {};
            }
            return this.handlers.error(message);
          }
        };
      
        Channel.prototype.dispose = function() {
          var key, val, _ref1, _ref2;
          if (this.disposed) {
            return;
          }
          this.disposed = true;
          if ((_ref1 = this.iframe) != null) {
            _ref1.dispose();
          }
          _ref2 = this.handlers;
          for (key in _ref2) {
            val = _ref2[key];
            if (key !== 'error') {
              this.unbind(key);
            }
          }
          if (typeof Object.freeze === "function") {
            Object.freeze(this.handlers);
          }
          return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
        };
      
        return Channel;
      
      })();
      
      module.exports = Channel;
      
      _.mixin((function() {
        return {
          'isWindow': function(obj) {
            switch (false) {
              case !!_.isObject(obj):
                return false;
              default:
                return obj.window === obj;
            }
          },
          'transform': function(obj, cb) {
            var key, val;
            for (key in obj) {
              val = obj[key];
              cb(obj, val, key);
            }
            return obj;
          }
        };
      })());
      
    });

    
    // constants.coffee
    require.register('pomme.js/src/constants.js', function(exports, require, module) {
    
      module.exports = {
        'postmessage': '__pomme__',
        'function': '__function::',
        'iframe': '__pomme::',
        'ready': '__ready'
      };
      
    });

    
    // helpers.coffee
    require.register('pomme.js/src/helpers.js', function(exports, require, module) {
    
      var root;
      
      root = window;
      
      module.exports = {
        'nextTick': (function() {
          var fns, tick;
          switch (false) {
            case !('setImmediate' in root && _.isFunction(root.setImmediate)):
              return function(f) {
                return setImmediate(f);
              };
            case !(typeof root === 'undefined' || 'ActiveXObject' in root || !'postMessage' in root):
              return function(f) {
                return setTimeout(f);
              };
            default:
              fns = [];
              tick = function() {
                return root.postMessage('tick', '*');
              };
              root.addEventListener('message', function() {
                var err, fn, _results;
                _results = [];
                while (fns.length) {
                  fn = fns.shift();
                  try {
                    _results.push(fn());
                  } catch (_error) {
                    err = _error;
                    tick();
                    throw err;
                  }
                }
                return _results;
              }, true);
              return function(fn) {
                if (!fns.length) {
                  tick();
                }
                return fns.push(fn);
              };
          }
        })()
      };
      
    });

    
    // iframe.coffee
    require.register('pomme.js/src/iframe.js', function(exports, require, module) {
    
      var constants, iFrame;
      
      constants = require('./constants');
      
      iFrame = (function() {
        function iFrame(_arg) {
          var html, id, name, scope, target, template;
          id = _arg.id, target = _arg.target, scope = _arg.scope, template = _arg.template;
          try {
            document.querySelector(target);
          } catch (_error) {
            return this.error('target selector not found');
          }
          name = constants.iframe + id || +(new Date);
          this.node = document.createElement('iframe');
          this.node.name = name;
          document.querySelector(target).appendChild(this.node);
          if (!_.isFunction(template)) {
            return this.error('template is not a function');
          }
          if (!_.isString(html = template({
            scope: scope
          }))) {
            return this.error('template did not return a string');
          }
          this.node.contentWindow.document.open();
          this.node.contentWindow.document.write(html);
          this.node.contentWindow.document.close();
          this.el = window.frames[name];
        }
      
        iFrame.prototype.error = function(message) {
          this.dispose();
          throw message;
        };
      
        iFrame.prototype.dispose = function() {
          if (this.disposed) {
            return;
          }
          this.disposed = true;
          if (this.node) {
            switch (false) {
              case !_.isFunction(this.node.remove):
                this.node.remove();
                break;
              case !_.isFunction(this.node.removeNode):
                this.node.removeNode(true);
                break;
              case !this.node.parentNode:
                this.node.parentNode.removeChild(this.node);
            }
          }
          return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
        };
      
        return iFrame;
      
      })();
      
      module.exports = iFrame;
      
    });

    
    // router.coffee
    require.register('pomme.js/src/router.js', function(exports, require, module) {
    
      var ChanID, FnID, Router, constants, router,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
      
      constants = require('./constants');
      
      Router = (function() {
        function Router() {
          this.route = __bind(this.route, this);
        }
      
        Router.prototype.table = {};
      
        Router.prototype.transactions = {};
      
        Router.prototype.register = function(win, scope, handler) {
          var route, _base, _i, _len, _ref;
          if (scope == null) {
            scope = '';
          }
          if ((_base = this.table)[scope] == null) {
            _base[scope] = [];
          }
          _ref = this.table[scope];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            route = _ref[_i];
            if (route.win === win) {
              throw "a channel is already bound to the same window under `" + scope + "`";
            }
          }
          return this.table[scope].push({
            win: win,
            handler: handler
          });
        };
      
        Router.prototype.route = function(event) {
          var data, method, route, scope, _i, _len, _ref, _ref1, _ref2;
          data = null;
          try {
            data = JSON.parse(event.data);
          } catch (_error) {}
          if (!(_.isObject(data) && (_ref = constants.postmessage, __indexOf.call(_.keys(data), _ref) >= 0))) {
            return;
          }
          scope = null;
          method = null;
          if (_.isString(data.method)) {
            _ref1 = data.method.match(/^([^:]+)::(.+)$/).slice(1, 3), scope = _ref1[0], method = _ref1[1];
            if (!(scope && method)) {
              method = data.method;
            }
          }
          if (method && (this.table[scope] != null)) {
            _ref2 = this.table[scope];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              route = _ref2[_i];
              if (route.win === event.source) {
                return route.handler(method, data.params);
              }
            }
          }
        };
      
        return Router;
      
      })();
      
      ChanID = (function() {
        ChanID.prototype._id = 0;
      
        function ChanID() {
          this.id = ChanID.prototype._id++;
        }
      
        return ChanID;
      
      })();
      
      FnID = (function() {
        FnID.prototype._id = 0;
      
        function FnID() {
          this.id = constants["function"] + FnID.prototype._id++;
        }
      
        return FnID;
      
      })();
      
      if (!('postMessage' in window)) {
        throw 'cannot run in this browser, no postMessage';
      }
      
      router = new Router();
      
      switch (false) {
        case !('addEventListener' in window):
          window.addEventListener('message', router.route, false);
          break;
        case !('attachEvent' in window):
          window.attachEvent('onmessage', router.route);
      }
      
      module.exports = {
        ChanID: ChanID,
        FnID: FnID,
        router: router
      };
      
    });
  })();

  // Return the main app.
  var main = require("pomme.js/src/channel.js");

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("pomme.js", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("Pomme.js", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("pommejs", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("PommeJS", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("pomme", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("Pomme", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["pomme.js"] = main;
  
    root["Pomme.js"] = main;
  
    root["pommejs"] = main;
  
    root["PommeJS"] = main;
  
    root["pomme"] = main;
  
    root["Pomme"] = main;
  
  }

  // Alias our app.
  
  require.alias("pomme.js/src/channel.js", "pomme.js/index.js");
  
  require.alias("pomme.js/src/channel.js", "Pomme.js/index.js");
  
  require.alias("pomme.js/src/channel.js", "pommejs/index.js");
  
  require.alias("pomme.js/src/channel.js", "PommeJS/index.js");
  
  require.alias("pomme.js/src/channel.js", "pomme/index.js");
  
  require.alias("pomme.js/src/channel.js", "Pomme/index.js");
  
})();