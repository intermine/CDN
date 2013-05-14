(function() {
  var ReportWidgets, root, _each, _extend, _setImmediate, _uid,
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

  _uid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r;

      r = Math.random() * 16 | 0;
      return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
    });
  };

  root = this;

  if (!document.querySelector) {
    throw 'An old & unsupported browser detected';
  }

  ReportWidgets = (function() {
    ReportWidgets.prototype.selectorPrefix = 'w';

    function ReportWidgets(server) {
      this.load = __bind(this.load, this);
      var callback,
        _this = this;

      this.server = server.replace(/\/+$/, '');
      callback = 'rwc' + +(new Date);
      root[callback] = function(config) {
        _this.config = config;
      };
      root.intermine.load([
        {
          'path': "" + this.server + "/widget/report?callback=" + callback,
          'type': 'js'
        }
      ]);
    }

    ReportWidgets.prototype.load = function(widgetId, target, options) {
      var again, deps, run,
        _this = this;

      if (options == null) {
        options = {};
      }
      again = function() {
        return _this.load(widgetId, target, options);
      };
      if (!this.config) {
        return _setImmediate(again);
      }
      run = function(err) {
        var uid;

        if (err) {
          throw err;
        }
        uid = _uid();
        return root.intermine.load([
          {
            'path': "" + _this.server + "/widget/report/" + widgetId + "?callback=" + uid,
            'type': 'js'
          }
        ], function(err) {
          var article, div, widget;

          article = document.createElement('article');
          article.setAttribute('class', "im-report-widget " + widgetId);
          div = document.createElement('div');
          div.setAttribute('id', 'w' + uid);
          div.appendChild(article);
          document.querySelector(target).appendChild(div);
          if (!root.intermine.temp) {
            throw '`intermine.temp` object cache does not exist';
          }
          if (!(widget = root.intermine.temp.widgets[uid])) {
            throw "Unknown widget `" + uid + "`";
          }
          widget.config = _extend(widget.config, options);
          return widget.render("#w" + uid + " article.im-report-widget");
        });
      };
      deps = this.config[widgetId];
      if (deps != null) {
        return root.intermine.load(deps, run);
      } else {
        return run();
      }
    };

    return ReportWidgets;

  })();

  if (!root.intermine) {
    throw 'You need to include the InterMine API Loader first!';
  } else {
    root.intermine.reportWidgets = root.intermine.reportWidgets || ReportWidgets;
  }

}).call(this);
