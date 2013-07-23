(function() {
  var AppsClient, root, _base, _base1, _each, _extend, _id, _ref, _ref1, _setImmediate,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = this;

  if (typeof process === 'undefined' || !process.nextTick) {
    if (typeof setImmediate === 'function') {
      _setImmediate = setImmediate;
    } else {
      _setImmediate = function(fn) {
        return setTimeout(fn, 0);
      };
    }
  } else {
    if (typeof setImmediate !== 'undefined') {
      _setImmediate = setImmediate;
    } else {
      _setImmediate = process.nextTick;
    }
  }

  _each = function(arr, iterator) {
    var key, value, _results;

    if (arr.forEach) {
      return arr.forEach(iterator);
    }
    _results = [];
    for (key in arr) {
      value = arr[key];
      _results.push(iterator(value, key, arr));
    }
    return _results;
  };

  _extend = function(obj) {
    _each(Array.prototype.slice.call(arguments, 1), function(source) {
      var prop, _results;

      if (source) {
        _results = [];
        for (prop in source) {
          _results.push(obj[prop] = source[prop]);
        }
        return _results;
      }
    });
    return obj;
  };

  _id = function() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r;

      r = Math.random() * 16 | 0;
      return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
    });
  };

  root = this;

  if (!document.querySelector) {
    throw 'An old & unsupported browser detected';
  }

  AppsClient = (function() {
    function AppsClient(server) {
      this.load = __bind(this.load, this);
      var callback,
        _this = this;

      this.server = server.replace(/\/+$/, '');
      callback = 'appcall' + +(new Date);
      root[callback] = function(config) {
        _this.config = config;
      };
      root.intermine.load([
        {
          'path': "" + this.server + "/middleware/apps/a?callback=" + callback,
          'type': 'js'
        }
      ]);
    }

    AppsClient.prototype.load = function(appId, target, options) {
      var again, deps, run,
        _this = this;

      if (options == null) {
        options = {};
      }
      again = function() {
        return _this.load(appId, target, options);
      };
      if (!this.config) {
        return _setImmediate(again);
      }
      run = function(err) {
        var id;

        if (err) {
          throw new Error(err);
        }
        id = _id();
        return root.intermine.load([
          {
            'path': "" + _this.server + "/middleware/apps/a/" + appId + "?callback=" + id,
            'type': 'js'
          }
        ], function(err) {
          var app, config, div, instance, module, templates;

          div = document.createElement('div');
          div.setAttribute('class', "-im-apps-a " + appId);
          div.setAttribute('id', 'a' + id);
          document.querySelector(target).appendChild(div);
          if (!root.intermine.temp) {
            throw new Error('`intermine.temp` object cache does not exist');
          }
          if (!(app = root.intermine.temp.apps[id])) {
            throw new Error("Unknown app `" + id + "`");
          }
          module = app[0], config = app[1], templates = app[2];
          if (!module.App) {
            throw new Error('Root module is not exporting App');
          }
          config = _extend(config, options);
          instance = new module.App(config, templates);
          if (!(instance && typeof instance === 'object')) {
            throw new Error('App failed to instantiate');
          }
          if (!(instance.render && typeof instance.render === 'function')) {
            throw new Error('App does not implement `render` function');
          }
          return instance.render("#a" + id + ".-im-apps-a");
        });
      };
      deps = this.config[appId];
      if (deps != null) {
        return root.intermine.load(deps, run);
      } else {
        return run();
      }
    };

    return AppsClient;

  })();

  if (!root.intermine) {
    throw new Error('You need to include the InterMine API Loader first!');
  } else {
    root.intermine.appsA = root.intermine.appsA || AppsClient;
  }

  if ((_ref = (_base = root.intermine).temp) == null) {
    _base.temp = {};
  }

  if ((_ref1 = (_base1 = root.intermine.temp).apps) == null) {
    _base1.apps = {};
  }

}).call(this);
