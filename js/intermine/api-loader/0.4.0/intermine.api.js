(function() {
  var intermine, load, loading, paths, root, _auto, _contains, _each, _keys, _map, _reduce, _setImmediate,
    __slice = [].slice;

  paths = {
    "widgets": {
      "latest": "http://cdn.intermine.org/js/intermine/widgets/latest/intermine.widgets.js",
      "1.0.0": "http://cdn.intermine.org/js/intermine/widgets/1.0.0/intermine.widgets.js",
      "1.1.0": "http://cdn.intermine.org/js/intermine/widgets/1.1.0/intermine.widgets.js",
      "1.1.7": "http://cdn.intermine.org/js/intermine/widgets/1.1.7/intermine.widgets.js",
      "1.1.8": "http://cdn.intermine.org/js/intermine/widgets/1.1.8/intermine.widgets.js",
      "1.1.9": "http://cdn.intermine.org/js/intermine/widgets/1.1.9/intermine.widgets.js",
      "1.1.10": "http://cdn.intermine.org/js/intermine/widgets/1.1.10/intermine.widgets.js",
      "1.2.0": "http://cdn.intermine.org/js/intermine/widgets/1.2.0/intermine.widgets.js",
      "1.2.1": "http://cdn.intermine.org/js/intermine/widgets/1.2.1/intermine.widgets.js",
      "1.3.0": "http://cdn.intermine.org/js/intermine/widgets/1.3.0/intermine.widgets.js",
      "1.4.0": "http://cdn.intermine.org/js/intermine/widgets/1.4.0/intermine.widgets.js",
      "1.4.1": "http://cdn.intermine.org/js/intermine/widgets/1.4.1/intermine.widgets.js",
      "1.4.2": "http://cdn.intermine.org/js/intermine/widgets/1.4.2/intermine.widgets.js",
      "1.6.7": "http://cdn.intermine.org/js/intermine/widgets/1.6.7/intermine.widgets.js",
      "1.6.8": "http://cdn.intermine.org/js/intermine/widgets/1.6.8/intermine.widgets.js",
      "1.7.0": "http://cdn.intermine.org/js/intermine/widgets/1.7.0/intermine.widgets.js",
      "1.7.3": "http://cdn.intermine.org/js/intermine/widgets/1.7.3/intermine.widgets.js",
      "1.8.0": "http://cdn.intermine.org/js/intermine/widgets/1.8.0/intermine.widgets.js",
      "1.8.1": "http://cdn.intermine.org/js/intermine/widgets/1.8.1/intermine.widgets.js",
      "1.8.2": "http://cdn.intermine.org/js/intermine/widgets/1.8.2/intermine.widgets.js",
      "1.8.3": "http://cdn.intermine.org/js/intermine/widgets/1.8.3/intermine.widgets.js",
      "1.9.1": "http://cdn.intermine.org/js/intermine/widgets/1.9.1/intermine.widgets.js",
      "1.10.0": "http://cdn.intermine.org/js/intermine/widgets/1.10.0/intermine.widgets.js",
      "1.11.2": "http://cdn.intermine.org/js/intermine/widgets/1.11.2/intermine.widgets.js"
    },
    "report-widgets": {
      "latest": "http://cdn.intermine.org/js/intermine/report-widgets/latest/intermine.report-widgets.js",
      "0.7.0": "http://cdn.intermine.org/js/intermine/report-widgets/0.7.0/intermine.report-widgets.js"
    }
  };

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

  _map = function(arr, iterator) {
    var results;

    if (arr.map) {
      return arr.map(iterator);
    }
    results = [];
    _each(arr, function(x, i, a) {
      return results.push(iterator(x, i, a));
    });
    return results;
  };

  _reduce = function(arr, iterator, memo) {
    if (arr.reduce) {
      return arr.reduce(iterator, memo);
    }
    _each(arr, function(x, i, a) {
      return memo = iterator(memo, x, i, a);
    });
    return memo;
  };

  _keys = function(obj) {
    var k, keys;

    if (Object.keys) {
      return Object.keys(obj);
    }
    keys = [];
    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    return keys;
  };

  _contains = function(arr, item) {
    var value, _i, _len;

    if ([].indexOf) {
      return arr.indexOf(item) >= 0;
    }
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      value = arr[_i];
      if (value === item) {
        return true;
      }
    }
    return false;
  };

  _auto = function(tasks, callback) {
    var addListener, keys, listeners, removeListener, results, taskComplete;

    callback = callback || function() {};
    keys = _keys(tasks);
    if (!keys.length) {
      return callback(null);
    }
    results = {};
    listeners = [];
    addListener = function(fn) {
      return listeners.unshift(fn);
    };
    removeListener = function(fn) {
      var i, listener;

      for (i in listeners) {
        listener = listeners[i];
        if (listener === fn) {
          listeners.splice(i, 1);
          return;
        }
      }
    };
    taskComplete = function() {
      return _each(listeners.slice(0), function(fn) {
        return fn();
      });
    };
    addListener(function() {
      if (_keys(results).length === keys.length) {
        callback(null, results);
        return callback = function() {};
      }
    });
    return _each(keys, function(k) {
      var listener, ready, requires, task, taskCallback;

      task = (tasks[k] instanceof Function ? [tasks[k]] : tasks[k]);
      taskCallback = function(err) {
        var args, safeResults;

        args = Array.prototype.slice.call(arguments, 1);
        if (args.length <= 1) {
          args = args[0];
        }
        if (err) {
          safeResults = {};
          _each(_keys(results), function(rkey) {
            return safeResults[rkey] = results[rkey];
          });
          safeResults[k] = args;
          callback(err, safeResults);
          return callback = function() {};
        } else {
          results[k] = args;
          return _setImmediate(taskComplete);
        }
      };
      requires = task.slice(0, Math.abs(task.length - 1)) || [];
      ready = function() {
        return _reduce(requires, function(a, x) {
          return a && results.hasOwnProperty(x);
        }, true) && !results.hasOwnProperty(k);
      };
      if (ready()) {
        return task[task.length - 1](taskCallback, results);
      } else {
        listener = function() {
          if (ready()) {
            removeListener(listener);
            return task[task.length - 1](taskCallback, results);
          }
        };
        return addListener(listener);
      }
    });
  };

  root = this;

  root.intermine = intermine = root.intermine || {};

  if (typeof root.window === 'undefined') {
    if (typeof global === 'undefined') {
      throw 'what kind of environment is this?';
    }
    root.window = global;
  }

  if (intermine.load) {
    return;
  }

  intermine.loader = function(path, type, cb) {
    var script, setCallback, sheet;

    if (type == null) {
      type = 'js';
    }
    setCallback = function(tag, cb) {
      tag.onload = cb;
      return tag.onreadystatechange = function() {
        var state;

        state = tag.readyState;
        if (state === 'complete' || state === 'loaded') {
          tag.onreadystatechange = null;
          return _setImmediate(cb);
        }
      };
    };
    switch (type) {
      case 'js':
        script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        setCallback(script, cb);
        return document.getElementsByTagName('head')[0].appendChild(script);
      case 'css':
        sheet = document.createElement('link');
        sheet.rel = 'stylesheet';
        sheet.type = 'text/css';
        sheet.href = path;
        document.getElementsByTagName('head')[0].appendChild(sheet);
        return cb(null);
      default:
        return cb("Unrecognized type `" + type + "`");
    }
  };

  loading = {};

  load = function(resources, type, cb) {
    var branch, err, exit, exited, key, obj, onWindow, seen, value, _fn, _i, _len, _ref;

    onWindow = function(path) {
      var loc, part, _i, _len, _ref;

      loc = root.window;
      _ref = path.split('.');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        if (!((loc[part] != null) && (typeof loc[part] === 'function' || 'object'))) {
          return false;
        }
        loc = loc[part];
      }
      return true;
    };
    exited = false;
    exit = function(err) {
      exited = true;
      return cb(err);
    };
    obj = {};
    _fn = function(key, value) {
      var dep, depends, path, test, _i, _len;

      if (exited) {
        return;
      }
      path = value.path, test = value.test, depends = value.depends;
      if (!path) {
        return exit("Library `path` not provided for " + key);
      }
      if (!!(test && typeof test === 'function' && test()) || onWindow(key)) {
        return obj[key] = function(cb) {
          return cb(null);
        };
      }
      if (loading[key]) {
        return obj[key] = function(cb) {
          var isDone;

          return (isDone = function() {
            if (!loading[key]) {
              return _setImmediate(isDone);
            } else {
              return cb(null);
            }
          })();
        };
      }
      loading[key] = true;
      obj[key] = function(cb) {
        return intermine.loader(path, type, function() {
          delete loading[key];
          return cb(null);
        });
      };
      if (depends && depends instanceof Array) {
        for (_i = 0, _len = depends.length; _i < _len; _i++) {
          dep = depends[_i];
          if (!(typeof dep !== 'string' || (resources[dep] == null))) {
            continue;
          }
          delete loading[key];
          return exit("Unrecognized dependency `" + dep + "`");
        }
        return obj[key] = depends.concat(obj[key]);
      }
    };
    for (key in resources) {
      value = resources[key];
      _fn(key, value);
    }
    if (exited) {
      return;
    }
    err = [];
    for (key in obj) {
      value = obj[key];
      if (!(value instanceof Array)) {
        continue;
      }
      seen = {};
      (branch = function(key) {
        var i, val, _i, _ref, _results;

        if (typeof key !== 'string') {
          return;
        }
        if (seen[key] != null) {
          if (!_contains(err, key)) {
            return err.push(key);
          }
        } else {
          seen[key] = true;
          if ((val = obj[key]) instanceof Array) {
            _results = [];
            for (i = _i = 0, _ref = val.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
              _results.push(branch(val[i]));
            }
            return _results;
          }
        }
      })(key);
    }
    if (!!err.length) {
      _ref = _keys(obj);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        delete loading[key];
      }
      return exit("Circular dependencies detected for `" + err + "`");
    }
    return _auto(obj, function(err) {
      if (err) {
        return cb(err);
      } else {
        return cb(null);
      }
    });
  };

  intermine.load = function() {
    var args, cb, exited, handle, i, key, library, name, o, path, resources, type, version, wait, _ref;

    library = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    cb = arguments.length === 1 ? library : args.pop();
    version = 'latest';
    if (typeof args[0] === 'string') {
      version = args[0];
    }
    if (typeof cb !== 'function') {
      cb = function() {};
    }
    if (typeof library === 'string') {
      if (!paths[library]) {
        return cb("Unknown library `" + library + "`");
      }
      if (!(path = paths[library][version])) {
        return cb("Unknown `" + library + "` version " + version);
      }
      o = {};
      o["intermine." + library] = {
        'path': path
      };
      return load(o, 'js', cb);
    }
    if (library instanceof Array) {
      o = {
        'js': {},
        'css': {}
      };
      for (i in library) {
        _ref = library[i], name = _ref.name, path = _ref.path, type = _ref.type, wait = _ref.wait;
        if (!(path || type)) {
          return cb('Library `path` or `type` not provided');
        }
        if (type !== 'css' && type !== 'js') {
          return cb("Library type `" + type + "` not recognized");
        }
        if (!name) {
          name = path.split('/').pop();
        }
        library[i].name = name;
        o[type][name] = {
          'path': path
        };
        if (!!wait && !!parseInt(i)) {
          o[type][name].depends = [library[i - 1].name];
        }
      }
      library = o;
    }
    if (typeof library === 'object') {
      i = _keys(library).length;
      exited = false;
      handle = function(err) {
        if (exited) {
          return;
        }
        if (err) {
          exited = true;
          return cb(err);
        }
        if (i-- && !!!i) {
          return cb(null);
        }
      };
      return (function() {
        var _results;

        _results = [];
        for (key in library) {
          resources = library[key];
          _results.push(load(resources, key, handle));
        }
        return _results;
      })();
    }
    return cb('Unrecognized input');
  };

}).call(this);
