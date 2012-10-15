(function() {
  var $, ReportWidgets, root;

  $ = jQuery || Zepto;

  root = this;

  ReportWidgets = (function() {

    ReportWidgets.prototype.selectorPrefix = 'w';

    function ReportWidgets(server) {
      var _this = this;
      this.server = server;
      console.log("Initialize ReportWidgets for " + this.server);
      $.ajax({
        'url': "" + this.server + "/widget/report",
        'dataType': 'jsonp',
        success: function(data) {
          console.log("Got config for " + server);
          return _this.config = data;
        }
      });
    }

    ReportWidgets.prototype.load = function(widgetId, target, options) {
      var deps, run,
        _this = this;
      if (options == null) {
        options = {};
      }
      if (!(this.config != null)) {
        return window.setTimeout((function() {
          return _this.load(widgetId, target, options);
        }), 0);
      } else {
        run = function() {
          var uid;
          uid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r;
            r = Math.random() * 16 | 0;
            return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
          });
          console.log("Getting widget " + widgetId);
          return $.ajax({
            'url': "" + _this.server + "/widget/report/" + widgetId + "?callback=" + uid,
            'dataType': 'script',
            success: function() {
              var merge, widget;
              $(target).html($("<div/>", {
                'id': "w" + uid,
                'html': $('<article/>', {
                  'class': "im-report-widget " + widgetId
                })
              }));
              widget = root.intermine.temp.widgets[uid];
              merge = function(child, parent) {
                var key;
                for (key in parent) {
                  if (!(child[key] != null)) {
                    if (Object.prototype.hasOwnProperty.call(parent, key)) {
                      child[key] = parent[key];
                    }
                  }
                }
                return child;
              };
              widget.config = merge(widget.config, options);
              return widget.render("#w" + uid + " article.im-report-widget");
            }
          });
        };
        deps = this.config[widgetId];
        if (deps != null) {
          return root.intermine.load(deps, run);
        } else {
          return run;
        }
      }
    };

    return ReportWidgets;

  })();

  if (!root.intermine) {
    throw 'You need to include the InterMine API Loader first!';
  } else {
    root.intermine.reportWidgets = ReportWidgets;
  }

}).call(this);
