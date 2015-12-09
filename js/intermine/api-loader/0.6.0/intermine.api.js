(function() {
  var document, head, intermine, jobs, load, loadRoot, loading, log, paths, root, _auto, _contains, _each, _get, _keys, _map, _reduce, _setImmediate,
    __slice = [].slice;

  paths = {
    "widgets": {
      "latest": "/js/intermine/widgets/latest/intermine.widgets.js",
      "1.0.0": "/js/intermine/widgets/1.0.0/intermine.widgets.js",
      "1.1.0": "/js/intermine/widgets/1.1.0/intermine.widgets.js",
      "1.1.7": "/js/intermine/widgets/1.1.7/intermine.widgets.js",
      "1.1.8": "/js/intermine/widgets/1.1.8/intermine.widgets.js",
      "1.1.9": "/js/intermine/widgets/1.1.9/intermine.widgets.js",
      "1.1.10": "/js/intermine/widgets/1.1.10/intermine.widgets.js",
      "1.2.0": "/js/intermine/widgets/1.2.0/intermine.widgets.js",
      "1.2.1": "/js/intermine/widgets/1.2.1/intermine.widgets.js",
      "1.3.0": "/js/intermine/widgets/1.3.0/intermine.widgets.js",
      "1.4.0": "/js/intermine/widgets/1.4.0/intermine.widgets.js",
      "1.4.1": "/js/intermine/widgets/1.4.1/intermine.widgets.js",
      "1.4.2": "/js/intermine/widgets/1.4.2/intermine.widgets.js",
      "1.6.7": "/js/intermine/widgets/1.6.7/intermine.widgets.js",
      "1.6.8": "/js/intermine/widgets/1.6.8/intermine.widgets.js",
      "1.7.0": "/js/intermine/widgets/1.7.0/intermine.widgets.js",
      "1.7.3": "/js/intermine/widgets/1.7.3/intermine.widgets.js",
      "1.8.0": "/js/intermine/widgets/1.8.0/intermine.widgets.js",
      "1.8.1": "/js/intermine/widgets/1.8.1/intermine.widgets.js",
      "1.8.2": "/js/intermine/widgets/1.8.2/intermine.widgets.js",
      "1.8.3": "/js/intermine/widgets/1.8.3/intermine.widgets.js",
      "1.9.1": "/js/intermine/widgets/1.9.1/intermine.widgets.js",
      "1.10.0": "/js/intermine/widgets/1.10.0/intermine.widgets.js",
      "1.11.2": "/js/intermine/widgets/1.11.2/intermine.widgets.js"
    },
    "report-widgets": {
      "latest": "/js/intermine/report-widgets/latest/intermine.report-widgets.js",
      "0.7.0": "/js/intermine/report-widgets/0.7.0/intermine.report-widgets.js"
    }
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

  intermine.loader = {
    'timeout': 1e4,
    'processing': 50,
    'fn': function(path, type, cb) {
      if (type == null) {
        type = 'js';
      }
      switch (type) {
        case 'js':
          return _get.script(path, cb);
        case 'css':
          return _get.style(path, cb);
        default:
          return cb("Unrecognized type `" + type + "`");
      }
    }
  };

  loading = {};

  jobs = 0;

  loadRoot = 'http://cdn.intermine.org';

  load = function(resources, type, cb) {
    var branch, err, exit, exited, job, key, obj, onWindow, seen, value, _fn, _i, _len, _ref;

    job = ++jobs;
    log({
      'job': job,
      'message': 'start'
    });
    onWindow = function(path) {
      var loc, part, _i, _len, _ref;

      if (~path.indexOf('?')) {
        return false;
      }
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

      log({
        'job': job,
        'library': key,
        'message': 'start'
      });
      if (exited) {
        return;
      }
      path = value.path, test = value.test, depends = value.depends;
      if (!path) {
        return exit("Library `path` not provided for " + key);
      }
      if (!!(test && typeof test === 'function' && test()) || onWindow(key)) {
        log({
          'job': job,
          'library': key,
          'message': 'exists'
        });
        return obj[key] = function(cb) {
          return cb(null);
        };
      }
      if (loading[key]) {
        log({
          'job': job,
          'library': key,
          'message': 'will wait'
        });
        return obj[key] = function(cb) {
          return loading[key].push(cb);
        };
      }
      loading[key] = [];
      log({
        'job': job,
        'library': key,
        'message': 'will download'
      });
      obj[key] = function(cb) {
        var postCall, timeout;

        log({
          'job': job,
          'library': key,
          'message': 'downloading'
        });
        timeout = root.window.setTimeout(function() {
          log({
            'job': job,
            'library': key,
            'message': 'timed out'
          });
          return postCall("The library `" + key + "` has timed out");
        }, intermine.loader.timeout);
        postCall = function(err) {
          var isAvailable, isReady;

          if (exited) {
            return;
          }
          clearTimeout(timeout);
          if (err) {
            delete loading[key];
            return exit(err);
          }
          log({
            'job': job,
            'library': key,
            'message': 'downloaded'
          });
          isReady = function() {
            log({
              'job': job,
              'library': key,
              'message': 'ready'
            });
            while (loading[key].length !== 0) {
              loading[key].pop()();
            }
            delete loading[key];
            return cb(null);
          };
          timeout = root.window.setTimeout(isReady, intermine.loader.processing);
          return (isAvailable = function() {
            if (!!(test && typeof test === 'function' && test()) || onWindow(key)) {
              log({
                'job': job,
                'library': key,
                'message': 'exists'
              });
              root.window.clearTimeout(timeout);
              return isReady();
            } else {
              return _setImmediate(isAvailable);
            }
          })();
        };
        return intermine.loader.fn(path, type, postCall);
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

  intermine.setLoadRoot = function(root) {
    return loadRoot = root;
  };

  intermine.load = function() {
    var args, cb, exited, getPath, handle, i, key, library, name, o, path, resources, type, version, wait, _ref;

    library = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    cb = arguments.length === 1 ? library : args.pop();
    version = 'latest';
    if (typeof args[0] === 'string') {
      version = args[0];
    }
    if (typeof cb !== 'function') {
      cb = function() {};
    }
    getPath = function(theLibrary, version) {
      var thePath;

      thePath = loadRoot;
      if (!(paths[theLibrary] && paths[theLibrary][version])) {
        return false;
      }
      return thePath + paths[theLibrary][version];
    };
    if (typeof library === 'string') {
      if (!paths[library]) {
        return cb("Unknown library `" + library + "`");
      }
      if (!(path = getPath(library, version))) {
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

  if (!(intermine.log && intermine.log instanceof Array)) {
    intermine.log = [];
  }

  log = function() {
    var arg;

    return intermine.log.push([
      'api-loader', (new Date).toLocaleString(), ((function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          arg = arguments[_i];
          _results.push(JSON.stringify(arg));
        }
        return _results;
      }).apply(this, arguments)).join(' ')
    ]);
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

  document = root.window.document;

  if (document) {
    head = document.head || document.getElementsByTagName('head')[0];
  }

  _get = {
    'script': function(url, cb) {
      var done, loaded, script;

      if (!head) {
        return cb('`window.document` does not exist');
      }
      done = function() {
        script.onload = script.onreadystatechange = script.onerror = null;
        head.removeChild(script);
        return cb && cb.call(root.window, (loaded ? null : '`script.onerror` fired'));
      };
      script = document.createElement('script');
      loaded = false;
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.src = url;
      script.onload = script.onreadystatechange = function(event) {
        event = event || root.window.event;
        if (event.type === 'load' || (/loaded|complete/.test(script.readyState) && (!document.documentMode || document.documentMode < 9))) {
          loaded = true;
          script.onload = script.onreadystatechange = script.onerror = null;
          return _setImmediate(done);
        }
      };
      script.onerror = function(event) {
        event = event || root.window.event;
        script.onload = script.onreadystatechange = script.onerror = null;
        return _setImmediate(done);
      };
      return head.insertBefore(script, head.lastChild);
    },
    'style': function(url, cb) {
      var style;

      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = url;
      head.insertBefore(style, head.lastChild);
      return _setImmediate(cb);
    }
  };

}).call(this);
