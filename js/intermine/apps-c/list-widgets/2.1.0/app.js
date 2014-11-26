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

    var localRequire = function(path) {
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
  root.require = (typeof root.require !== 'undefined') ? root.require : require;

  // All our modules will use global require.
  (function() {
    
    
    // ChartWidget.coffee
    root.require.register('list-widgets/src/class/ChartWidget.js', function(exports, require, module) {
    
      var $, ChartView, ChartWidget, InterMineWidget, type, _, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../deps'), _ = _ref._, $ = _ref.$;
      
      InterMineWidget = require('./InterMineWidget');
      
      ChartView = require('./views/ChartView');
      
      type = require('../utils/type');
      
      ChartWidget = (function(_super) {
        __extends(ChartWidget, _super);
      
        ChartWidget.prototype.widgetOptions = {
          'title': true,
          'description': true,
          'matchCb': false,
          'resultsCb': false,
          'listCb': false
        };
      
        ChartWidget.prototype.formOptions = {};
      
        ChartWidget.prototype.spec = {
          response: {
            "chartType": type.isString,
            "description": type.isString,
            "error": type.isNull,
            "list": type.isString,
            "notAnalysed": type.isInteger,
            "pathQuery": type.isString,
            "requestedAt": type.isString,
            "results": type.isArray,
            "seriesLabels": type.isString,
            "seriesValues": type.isString,
            "statusCode": type.isHTTPSuccess,
            "title": type.isString,
            "type": type.isString,
            "wasSuccessful": type.isBoolean,
            "filters": type.isString,
            "filterLabel": type.isString,
            "filterSelectedValue": type.isString,
            "simplePathQuery": type.isString,
            "domainLabel": type.isString,
            "rangeLabel": type.isString
          }
        };
      
        function ChartWidget(imjs, service, token, id, bagName, el, widgetOptions) {
          this.imjs = imjs;
          this.service = service;
          this.token = token;
          this.id = id;
          this.bagName = bagName;
          this.el = el;
          if (widgetOptions == null) {
            widgetOptions = {};
          }
          this.render = __bind(this.render, this);
          this.widgetOptions = _.extend({}, this.widgetOptions, widgetOptions);
          this.log = [];
          ChartWidget.__super__.constructor.apply(this, arguments);
          this.render();
        }
      
        ChartWidget.prototype.render = function() {
          var data, key, timeout, value, _ref1, _ref2,
            _this = this;
          timeout = window.setTimeout((function() {
            return $(_this.el).append(_this.loading = $(require('../templates/loading')()));
          }), 400);
          if ((_ref1 = this.view) != null) {
            _ref1.undelegateEvents();
          }
          data = {
            'widget': this.id,
            'list': this.bagName,
            'token': this.token
          };
          _ref2 = this.formOptions;
          for (key in _ref2) {
            value = _ref2[key];
            if (key !== 'errorCorrection' && key !== 'pValue') {
              data['filter'] = value;
            }
          }
          this.log.push('Sending data payload ' + JSON.stringify(data));
          return $.ajax({
            url: "" + this.service + "list/chart",
            dataType: "jsonp",
            data: data,
            success: function(response) {
              var _ref3;
              _this.log.push('Received a response ' + JSON.stringify(response));
              window.clearTimeout(timeout);
              if ((_ref3 = _this.loading) != null) {
                _ref3.remove();
              }
              _this.validateType(response, _this.spec.response);
              if (response.wasSuccessful) {
                _this.name = response.title;
                _this.log.push('Creating new ChartView');
                return _this.view = new ChartView({
                  "widget": _this,
                  "el": _this.el,
                  "response": response,
                  "form": {
                    "options": _this.formOptions
                  },
                  "options": _this.widgetOptions
                });
              }
            },
            error: function(request, status, error) {
              clearTimeout(timeout);
              return _this.error({
                'text': "" + _this.service + "list/chart"
              }, 'AJAXTransport');
            }
          });
        };
      
        return ChartWidget;
      
      })(InterMineWidget);
      
      module.exports = ChartWidget;
      
    });

    
    // EnrichmentWidget.coffee
    root.require.register('list-widgets/src/class/EnrichmentWidget.js', function(exports, require, module) {
    
      var $, EnrichmentView, EnrichmentWidget, InterMineWidget, type, _, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
      
      _ref = require('../deps'), _ = _ref._, $ = _ref.$;
      
      InterMineWidget = require('./InterMineWidget');
      
      EnrichmentView = require('./views/EnrichmentView');
      
      type = require('../utils/type');
      
      EnrichmentWidget = (function(_super) {
        __extends(EnrichmentWidget, _super);
      
        EnrichmentWidget.prototype.widgetOptions = {
          'title': true,
          'description': true,
          'matchCb': false,
          'resultsCb': false,
          'listCb': false
        };
      
        EnrichmentWidget.prototype.formOptions = {
          errorCorrection: "Holm-Bonferroni",
          pValue: "0.05"
        };
      
        EnrichmentWidget.prototype.errorCorrections = ["Holm-Bonferroni", "Benjamini Hochberg", "Bonferroni", "None"];
      
        EnrichmentWidget.prototype.pValues = ["0.05", "0.10", "1.00"];
      
        EnrichmentWidget.prototype.spec = {
          response: {
            "title": type.isString,
            "description": type.isString,
            "pathQuery": type.isJSON,
            "pathConstraint": type.isString,
            "error": type.isNull,
            "list": type.isString,
            "notAnalysed": type.isInteger,
            "requestedAt": type.isString,
            "results": type.isArray,
            "label": type.isString,
            "statusCode": type.isHTTPSuccess,
            "type": type.isString,
            "wasSuccessful": type.isBoolean,
            "filters": type.isString,
            "filterLabel": type.isString,
            "filterSelectedValue": type.isString,
            "externalLink": type.isString,
            "pathQueryForMatches": type.isString,
            "is_logged": type.isBoolean,
            "current_population": type.isStringOrNull,
            "message": type.isString,
            "extraAttribute": type.isStringOrNull
          }
        };
      
        /*
        Set the params on us and render.
        @param {object} intermine.Service
        @param {string} service http://aragorn.flymine.org:8080/flymine/service/
        @param {string} token Token for accessing user's lists
        @param {Array} lists All lists that we have access to
        @param {string} id widgetId
        @param {string} bagName myBag
        @param {string} el #target
        @param {object} widgetOptions { "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {}, "errorCorrection": "Holm-Bonferroni", "pValue": "0.05" }
        */
      
      
        function EnrichmentWidget(imjs, service, token, lists, id, bagName, el, widgetOptions) {
          var formKeys, formOptions, k, v, _i, _len;
          this.imjs = imjs;
          this.service = service;
          this.token = token;
          this.lists = lists;
          this.id = id;
          this.bagName = bagName;
          this.el = el;
          if (widgetOptions == null) {
            widgetOptions = {};
          }
          this.render = __bind(this.render, this);
          formKeys = ['errorCorrection', 'pValue'];
          formOptions = {};
          for (k in widgetOptions) {
            v = widgetOptions[k];
            if (__indexOf.call(formKeys, k) >= 0) {
              formOptions[k] = v;
            }
          }
          for (_i = 0, _len = formKeys.length; _i < _len; _i++) {
            k = formKeys[_i];
            delete widgetOptions[k];
          }
          this.widgetOptions = _.extend({}, this.widgetOptions, widgetOptions);
          this.formOptions = _.extend({}, this.formOptions, formOptions);
          this.log = [];
          EnrichmentWidget.__super__.constructor.apply(this, arguments);
          this.render();
        }
      
        EnrichmentWidget.prototype.render = function() {
          var data, key, timeout, value, _ref1, _ref2,
            _this = this;
          timeout = window.setTimeout((function() {
            return $(_this.el).append(_this.loading = $(require('../templates/loading')()));
          }), 400);
          if ((_ref1 = this.view) != null) {
            _ref1.undelegateEvents();
          }
          data = {
            'widget': this.id,
            'list': this.bagName,
            'correction': this.formOptions.errorCorrection,
            'maxp': this.formOptions.pValue,
            'token': this.token
          };
          _ref2 = this.formOptions;
          for (key in _ref2) {
            value = _ref2[key];
            if (key !== 'errorCorrection' && key !== 'pValue' && key !== 'current_population' && key !== 'remember_population' && key !== 'gene_length_correction') {
              key = 'filter';
            }
            data[key] = value;
          }
          this.log.push('Sending data payload ' + JSON.stringify(data));
          return $.ajax({
            'url': "" + this.service + "list/enrichment",
            'dataType': "jsonp",
            'data': data,
            success: function(response) {
              var l, lists, _ref3;
              _this.log.push('Received a response ' + JSON.stringify(response));
              window.clearTimeout(timeout);
              if ((_ref3 = _this.loading) != null) {
                _ref3.remove();
              }
              _this.validateType(response, _this.spec.response);
              if (response.wasSuccessful) {
                _this.name = response.title;
                lists = (function() {
                  var _i, _len, _ref4, _results;
                  _ref4 = this.lists;
                  _results = [];
                  for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                    l = _ref4[_i];
                    if (l.type === response.type && l.size !== 0) {
                      _results.push(l);
                    }
                  }
                  return _results;
                }).call(_this);
                _this.log.push('Creating new EnrichmentView');
                return _this.view = new EnrichmentView({
                  "widget": _this,
                  "el": _this.el,
                  "template": _this.template,
                  "response": response,
                  "form": {
                    "options": _this.formOptions,
                    "pValues": _this.pValues,
                    "errorCorrections": _this.errorCorrections
                  },
                  "options": _this.widgetOptions,
                  "lists": lists
                });
              }
            },
            error: function(request, status, error) {
              clearTimeout(timeout);
              return _this.error({
                'text': "" + _this.service + "list/enrichment"
              }, "AJAXTransport");
            }
          });
        };
      
        return EnrichmentWidget;
      
      })(InterMineWidget);
      
      module.exports = EnrichmentWidget;
      
    });

    
    // InterMineWidget.coffee
    root.require.register('list-widgets/src/class/InterMineWidget.js', function(exports, require, module) {
    
      var $, InterMineWidget, intermine, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
      
      _ref = require('../deps'), $ = _ref.$, intermine = _ref.intermine;
      
      InterMineWidget = (function() {
        function InterMineWidget() {
          this.queryRows = __bind(this.queryRows, this);
          this.error = __bind(this.error, this);
          this.validateType = __bind(this.validateType, this);
          var _this = this;
          this.log = this.log || [];
          this.log.push('Creating wrapping element');
          $(this.el).html($('<div/>', {
            'class': "inner",
            'style': "height:572px;overflow:hidden;position:relative"
          }));
          this.el = $(this.el).find('div.inner');
          this.log.push('Monitoring for debug mode');
          $(window).on('hashchange', function() {
            if (window.location.hash === '#debug') {
              return $(_this.el).append($('<a/>', {
                'class': 'btn btn-small btn-warning',
                'text': 'Debug',
                'style': 'z-index:5;position:absolute;display:block;top:0;left:0',
                click: function() {
                  var pre;
                  pre = $('<pre/>', {
                    'html': _this.log.join('\n\n')
                  });
                  return $(_this.el).css('overflow', 'scroll').html(pre);
                }
              }));
            }
          });
        }
      
        InterMineWidget.prototype.validateType = function(object, spec) {
          var fails, key, r, value;
          this.log.push('Validating ' + JSON.stringify(object));
          fails = [];
          for (key in object) {
            value = object[key];
            r = typeof spec[key] === "function" ? new spec[key](value) : void 0;
            if (r && !r.is()) {
              fails.push(require('../templates/invalidjsonkey')({
                'actual': r.is(),
                'expected': new String(r),
                key: key
              }));
            }
          }
          if (fails.length) {
            return this.error(fails, "JSONResponse");
          }
        };
      
        InterMineWidget.prototype.error = function(opts, type) {
          if (opts == null) {
            opts = {
              'title': 'Error',
              'text': 'Generic error'
            };
          }
          opts.name = this.name || this.id;
          switch (type) {
            case "AJAXTransport":
              opts.title = "AJAX Request Failed";
              break;
            case "JSONResponse":
              opts.title = "Invalid JSON Response";
              opts.text = "<ol>" + (opts.join('')) + "</ol>";
          }
          $(this.el).html(require('../templates/error')(opts));
          this.log.push(opts.title);
          return this.fireEvent({
            'event': 'error',
            'type': type,
            'message': opts.title
          });
        };
      
        InterMineWidget.prototype.fireEvent = function(obj) {
          var evt, key, value;
          evt = document.createEvent('Events');
          evt.initEvent('InterMine', true, true);
          for (key in obj) {
            value = obj[key];
            evt[key] = value;
          }
          evt.source = 'ListWidgets';
          evt.widget = {
            'id': this.id,
            'bag': this.bagName,
            'el': this.el,
            'service': this.service
          };
          return window.dispatchEvent(evt);
        };
      
        InterMineWidget.prototype.queryRows = function(query, cb) {
          this.log.push('Querying for rows');
          return this.imjs.rows(query).done(cb);
        };
      
        return InterMineWidget;
      
      })();
      
      module.exports = InterMineWidget;
      
    });

    
    // TableWidget.coffee
    root.require.register('list-widgets/src/class/TableWidget.js', function(exports, require, module) {
    
      var $, InterMineWidget, TableView, TableWidget, type, _, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../deps'), _ = _ref._, $ = _ref.$;
      
      InterMineWidget = require('./InterMineWidget');
      
      TableView = require('./views/TableView');
      
      type = require('../utils/type');
      
      TableWidget = (function(_super) {
        __extends(TableWidget, _super);
      
        TableWidget.prototype.widgetOptions = {
          'title': true,
          'description': true,
          'matchCb': false,
          'resultsCb': false,
          'listCb': false
        };
      
        TableWidget.prototype.spec = {
          response: {
            "columnTitle": type.isString,
            "title": type.isString,
            "description": type.isString,
            "pathQuery": type.isString,
            "columns": type.isString,
            "pathConstraint": type.isString,
            "requestedAt": type.isString,
            "list": type.isString,
            "type": type.isString,
            "notAnalysed": type.isInteger,
            "results": type.isArray,
            "wasSuccessful": type.isBoolean,
            "error": type.isNull,
            "statusCode": type.isHTTPSuccess
          }
        };
      
        function TableWidget(imjs, service, token, id, bagName, el, widgetOptions) {
          this.imjs = imjs;
          this.service = service;
          this.token = token;
          this.id = id;
          this.bagName = bagName;
          this.el = el;
          if (widgetOptions == null) {
            widgetOptions = {};
          }
          this.render = __bind(this.render, this);
          this.widgetOptions = _.extend({}, this.widgetOptions, widgetOptions);
          this.log = [];
          TableWidget.__super__.constructor.apply(this, arguments);
          this.render();
        }
      
        TableWidget.prototype.render = function() {
          var data, timeout, _ref1,
            _this = this;
          timeout = window.setTimeout((function() {
            return $(_this.el).append(_this.loading = $(require('../templates/loading')()));
          }), 400);
          if ((_ref1 = this.view) != null) {
            _ref1.undelegateEvents();
          }
          data = {
            'widget': this.id,
            'list': this.bagName,
            'token': this.token
          };
          this.log.push('Sending data payload ' + JSON.stringify(data));
          return $.ajax({
            url: "" + this.service + "list/table",
            dataType: "jsonp",
            data: data,
            success: function(response) {
              var _ref2;
              _this.log.push('Received a response ' + JSON.stringify(response));
              window.clearTimeout(timeout);
              if ((_ref2 = _this.loading) != null) {
                _ref2.remove();
              }
              _this.validateType(response, _this.spec.response);
              if (response.wasSuccessful) {
                _this.name = response.title;
                _this.log.push('Creating new TableView');
                return _this.view = new TableView({
                  "widget": _this,
                  "el": _this.el,
                  "response": response,
                  "options": _this.widgetOptions
                });
              }
            },
            error: function(request, status, error) {
              clearTimeout(timeout);
              return _this.error({
                'text': "" + _this.service + "list/table"
              }, "AJAXTransport");
            }
          });
        };
      
        return TableWidget;
      
      })(InterMineWidget);
      
      module.exports = TableWidget;
      
    });

    
    // CoreModel.coffee
    root.require.register('list-widgets/src/class/models/CoreModel.js', function(exports, require, module) {
    
      var Backbone, CoreCollection, CoreModel, EnrichmentResults, EnrichmentRow, TableResults, TableRow, type, _, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), _ = _ref._, Backbone = _ref.Backbone;
      
      type = require('../../utils/type');
      
      CoreModel = (function(_super) {
        __extends(CoreModel, _super);
      
        function CoreModel() {
          this.toggleSelected = __bind(this.toggleSelected, this);
          this.validate = __bind(this.validate, this);
          _ref1 = CoreModel.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        CoreModel.prototype.defaults = {
          "selected": false
        };
      
        CoreModel.prototype.initialize = function(row, widget) {
          this.widget = widget;
          return this.validate(row);
        };
      
        CoreModel.prototype.validate = function(row) {
          return this.widget.validateType(row, this.spec);
        };
      
        CoreModel.prototype.toggleSelected = function() {
          return this.set({
            selected: !this.get("selected")
          });
        };
      
        return CoreModel;
      
      })(Backbone.Model);
      
      CoreCollection = (function(_super) {
        __extends(CoreCollection, _super);
      
        function CoreCollection() {
          _ref2 = CoreCollection.__super__.constructor.apply(this, arguments);
          return _ref2;
        }
      
        CoreCollection.prototype.model = CoreModel;
      
        CoreCollection.prototype.selected = function() {
          return this.filter(function(row) {
            return row.get("selected");
          });
        };
      
        CoreCollection.prototype.toggleSelected = function() {
          var model, _i, _j, _len, _len1, _ref3, _ref4, _results, _results1;
          if (this.models.length - this.selected().length) {
            _ref3 = this.models;
            _results = [];
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              model = _ref3[_i];
              _results.push(model.set({
                "selected": true
              }, {
                'silent': true
              }));
            }
            return _results;
          } else {
            _ref4 = this.models;
            _results1 = [];
            for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
              model = _ref4[_j];
              _results1.push(model.set({
                "selected": false
              }, {
                'silent': true
              }));
            }
            return _results1;
          }
        };
      
        return CoreCollection;
      
      })(Backbone.Collection);
      
      /* Models underpinning Enrichment Widget results.*/
      
      
      EnrichmentRow = (function(_super) {
        __extends(EnrichmentRow, _super);
      
        function EnrichmentRow() {
          _ref3 = EnrichmentRow.__super__.constructor.apply(this, arguments);
          return _ref3;
        }
      
        EnrichmentRow.prototype.spec = {
          "description": type.isString,
          "identifier": type.isString,
          "matches": type.isInteger,
          "p-value": type.isInteger,
          "selected": type.isBoolean,
          "externalLink": type.isString
        };
      
        EnrichmentRow.prototype.toJSON = function() {
          var attributes;
          attributes = _.clone(this.attributes);
          if (attributes['p-value'] < 0.001) {
            attributes['p-value'] = attributes['p-value'].toExponential(6);
          } else {
            attributes['p-value'] = attributes['p-value'].toFixed(6);
          }
          return attributes;
        };
      
        return EnrichmentRow;
      
      })(CoreModel);
      
      EnrichmentResults = (function(_super) {
        __extends(EnrichmentResults, _super);
      
        function EnrichmentResults() {
          _ref4 = EnrichmentResults.__super__.constructor.apply(this, arguments);
          return _ref4;
        }
      
        EnrichmentResults.prototype.model = EnrichmentRow;
      
        return EnrichmentResults;
      
      })(CoreCollection);
      
      /* Models underpinning Table Widget results.*/
      
      
      TableRow = (function(_super) {
        __extends(TableRow, _super);
      
        function TableRow() {
          _ref5 = TableRow.__super__.constructor.apply(this, arguments);
          return _ref5;
        }
      
        TableRow.prototype.spec = {
          "matches": type.isInteger,
          "identifier": type.isInteger,
          "descriptions": type.isArray,
          "selected": type.isBoolean
        };
      
        return TableRow;
      
      })(CoreModel);
      
      TableResults = (function(_super) {
        __extends(TableResults, _super);
      
        function TableResults() {
          _ref6 = TableResults.__super__.constructor.apply(this, arguments);
          return _ref6;
        }
      
        TableResults.prototype.model = TableRow;
      
        return TableResults;
      
      })(CoreCollection);
      
      module.exports = {
        EnrichmentRow: EnrichmentRow,
        EnrichmentResults: EnrichmentResults,
        TableRow: TableRow,
        TableResults: TableResults
      };
      
    });

    
    // ChartPopoverView.coffee
    root.require.register('list-widgets/src/class/views/ChartPopoverView.js', function(exports, require, module) {
    
      var $, Backbone, ChartPopoverView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      /* Chart Widget bar onclick box.*/
      
      
      ChartPopoverView = (function(_super) {
        __extends(ChartPopoverView, _super);
      
        function ChartPopoverView() {
          this.close = __bind(this.close, this);
          this.listAction = __bind(this.listAction, this);
          this.resultsAction = __bind(this.resultsAction, this);
          this.matchAction = __bind(this.matchAction, this);
          this.renderValues = __bind(this.renderValues, this);
          this.render = __bind(this.render, this);
          _ref1 = ChartPopoverView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        ChartPopoverView.prototype.descriptionLimit = 50;
      
        ChartPopoverView.prototype.valuesLimit = 5;
      
        ChartPopoverView.prototype.events = {
          "click a.match": "matchAction",
          "click a.results": "resultsAction",
          "click a.list": "listAction",
          "click a.close": "close"
        };
      
        ChartPopoverView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          return this.render();
        };
      
        ChartPopoverView.prototype.render = function() {
          $(this.el).html(require('../../templates/popover/popover')({
            "description": this.description,
            "descriptionLimit": this.descriptionLimit,
            "style": 'width:300px',
            'can': {
              'list': this.widget.token && this.listCb,
              'results': this.resultsCb
            }
          }));
          this.widget.queryRows(this.quickPq, this.renderValues);
          return this;
        };
      
        ChartPopoverView.prototype.renderValues = function(response) {
          var object, values, _i, _len;
          values = [];
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            object = response[_i];
            values.push((function(object) {
              var column, _j, _len1;
              for (_j = 0, _len1 = object.length; _j < _len1; _j++) {
                column = object[_j];
                if (column && column.length > 0) {
                  return column;
                }
              }
            })(object));
          }
          return $(this.el).find('div.values').html(require('../../templates/popover/popover.values')({
            'values': values,
            'type': this.type,
            'valuesLimit': this.valuesLimit,
            'size': values.length,
            'can': {
              'match': this.matchCb
            }
          }));
        };
      
        ChartPopoverView.prototype.matchAction = function(e) {
          this.matchCb($(e.target).text(), this.type);
          return e.preventDefault();
        };
      
        ChartPopoverView.prototype.resultsAction = function() {
          return this.resultsCb(this.resultsPq);
        };
      
        ChartPopoverView.prototype.listAction = function() {
          return this.listCb(this.resultsPq);
        };
      
        ChartPopoverView.prototype.close = function() {
          return $(this.el).remove();
        };
      
        return ChartPopoverView;
      
      })(Backbone.View);
      
      module.exports = ChartPopoverView;
      
    });

    
    // ChartView.coffee
    root.require.register('list-widgets/src/class/views/ChartView.js', function(exports, require, module) {
    
      var $, Backbone, ChartPopoverView, ChartView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      ChartPopoverView = require('./ChartPopoverView');
      
      ChartView = (function(_super) {
        __extends(ChartView, _super);
      
        function ChartView() {
          this.formAction = __bind(this.formAction, this);
          this.viewSeriesAction = __bind(this.viewSeriesAction, this);
          this.viewAllAction = __bind(this.viewAllAction, this);
          this.viewBarsAction = __bind(this.viewBarsAction, this);
          this.viewBarAction = __bind(this.viewBarAction, this);
          this.keypressAction = __bind(this.keypressAction, this);
          this.renderToolbar = __bind(this.renderToolbar, this);
          _ref1 = ChartView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        ChartView.prototype.chartOptions = {
          fontName: "Sans-Serif",
          fontSize: 11,
          colors: ["#2F72FF", "#9FC0FF"],
          legend: {
            position: "top"
          },
          chartArea: {
            top: 30,
            bottom: 80,
            left: 50
          },
          hAxis: {
            titleTextStyle: {
              fontName: "Sans-Serif"
            }
          },
          vAxis: {
            titleTextStyle: {
              fontName: "Sans-Serif"
            }
          }
        };
      
        ChartView.prototype.brewer = {
          '3': ["rgb(189,215,231)", "rgb(107,174,214)", "rgb(33,113,181)"],
          '4': ["rgb(189,215,231)", "rgb(107,174,214)", "rgb(49,130,189)", "rgb(8,81,156)"],
          '5': ["rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(49,130,189)", "rgb(8,81,156)"],
          '6': ["rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,69,148)"],
          '7': ["rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,69,148)"],
          '8': ["rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)"]
        };
      
        ChartView.prototype.multiselect = false;
      
        ChartView.prototype.events = {
          "change div.form select": "formAction",
          "click div.actions a.view-all": "viewAllAction"
        };
      
        ChartView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          $(document).on('keyup keydown', this.keypressAction);
          return this.render();
        };
      
        ChartView.prototype.render = function() {
          var chart, height, ln, options, width,
            _this = this;
          $(this.el).html(require('../../templates/chart/chart')({
            "title": this.options.title ? this.response.title : "",
            "description": this.options.description ? this.response.description : "",
            "notAnalysed": this.response.notAnalysed,
            "type": this.response.type
          }));
          if (this.response.filterLabel != null) {
            $(this.el).find('div.form form').append(require('../../templates/extra')({
              "label": this.response.filterLabel,
              "possible": this.response.filters.split(','),
              "selected": this.response.filterSelectedValue
            }));
          }
          if (this.response.results.length > 1) {
            if (this.response.chartType in google.visualization) {
              this.renderToolbar();
              width = $(this.el).width();
              height = $(this.el).height() - $(this.el).find('div.header').height();
              this.chartOptions.width = width;
              this.chartOptions.chartArea.width = width - this.chartOptions.chartArea.left;
              this.chartOptions.height = height;
              this.chartOptions.chartArea.height = height - this.chartOptions.chartArea.top - this.chartOptions.chartArea.bottom;
              this.chartOptions.hAxis = {
                'title': this.response.chartType === 'BarChart' ? this.response.rangeLabel : this.response.domainLabel
              };
              this.chartOptions.vAxis = {
                'title': this.response.chartType === 'BarChart' ? this.response.domainLabel : this.response.rangeLabel
              };
              chart = new google.visualization[this.response.chartType]($(this.el).find("div.content")[0]);
              google.visualization.events.addListener(chart, 'click', function() {
                var input;
                $(_this.el).find('.content').prepend(input = $('<input/>', {
                  'class': 'focus',
                  'type': 'text'
                }));
                return input.focus().remove();
              });
              if (this.response.pathQuery != null) {
                google.visualization.events.addListener(chart, "select", function() {
                  return _this.viewBarAction(chart);
                });
              }
              if (this.response.results[0].length === 1) {
                this.response.results[0] = [this.response.domainLabel, this.response.results[0][0]];
              }
              options = JSON.parse(JSON.stringify(this.chartOptions));
              if (this.response.chartType === 'PieChart' && (ln = this.response.results.length - 1) >= 3) {
                if (ln > 8) {
                  ln = 8;
                }
                options.colors = this.brewer[ln].reverse();
              }
              chart.draw(google.visualization.arrayToDataTable(this.response.results, false), options);
            } else {
              this.error({
                'title': this.response.chartType,
                'text': "This chart type does not exist in Google Visualization API"
              });
            }
          } else {
            $(this.el).find("div.content").html($(require('../../templates/noresults')({
              'text': "No \"" + this.response.title + "\" with your list."
            })));
          }
          this.widget.fireEvent({
            'class': 'ChartView',
            'event': 'rendered'
          });
          return this;
        };
      
        ChartView.prototype.renderToolbar = function() {
          return $(this.el).find("div.actions").html(require('../../templates/chart/chart.actions')({
            'can': {
              'results': this.resultsCb
            }
          }));
        };
      
        ChartView.prototype.translate = function(response, series) {
          if (response.seriesValues != null) {
            return response.seriesValues.split(',')[response.seriesLabels.split(',').indexOf(series)];
          }
        };
      
        ChartView.prototype.keypressAction = function(e) {
          if (e.type === 'keydown') {
            if (e.keyCode >= 16 && e.keyCode <= 18) {
              return this.multiselect = true;
            }
          } else {
            if (e.keyCode >= 16 && e.keyCode <= 18) {
              this.multiselect = false;
              if ((this.selection != null) && this.selection.length !== 0) {
                this.viewBarsAction(this.selection);
                return this.selection = null;
              }
            }
          }
        };
      
        ChartView.prototype.viewBarAction = function(chart) {
          var column, description, quickPq, resultsPq, row, selection;
          if (this.barView != null) {
            this.barView.close();
          }
          selection = chart.getSelection()[0];
          if (this.multiselect) {
            if (this.selection == null) {
              this.selection = [];
            }
            return this.selection.push(selection);
          } else {
            if (selection) {
              description = '';
              resultsPq = this.response.pathQuery;
              quickPq = this.response.simplePathQuery;
              if (selection.row != null) {
                row = this.response.results[selection.row + 1][0];
                description += row;
                resultsPq = resultsPq.replace("%category", row);
                quickPq = quickPq.replace("%category", row);
                if (selection.column != null) {
                  if (this.response.seriesPath === 'ActualExpectedCriteria' && selection.column === 2) {
                    return false;
                  }
                  column = this.response.results[0][selection.column];
                  description += ' ' + column;
                  resultsPq = resultsPq.replace("%series", this.translate(this.response, column));
                  quickPq = resultsPq.replace("%series", this.translate(this.response, column));
                }
              } else {
                if (selection.column != null) {
                  return this.viewSeriesAction(resultsPq.replace("%series", this.translate(this.response, this.response.results[0][selection.column])));
                }
              }
              resultsPq = JSON.parse(resultsPq);
              quickPq = JSON.parse(quickPq);
              if (description) {
                return $(this.el).find('div.content').append((this.barView = new ChartPopoverView({
                  "description": description,
                  "resultsPq": resultsPq,
                  "resultsCb": this.options.resultsCb,
                  "listCb": this.options.listCb,
                  "matchCb": this.options.matchCb,
                  "quickPq": quickPq,
                  "widget": this.widget,
                  "type": this.response.type
                })).el);
              }
            }
          }
        };
      
        ChartView.prototype.viewBarsAction = function(selections) {
          var a, b, bag, category, code, constraint, constraints, field, getConstraint, i, orLogic, pq, selection, series, _i, _len, _ref2;
          pq = JSON.parse(this.response.pathQuery);
          _ref2 = pq.where;
          for (i in _ref2) {
            field = _ref2[i];
            switch (field.value) {
              case '%category':
                category = field;
                break;
              case '%series':
                series = field;
                break;
              default:
                field.code = 'A';
                bag = field;
            }
          }
          pq.where = [bag, category, series];
          pq.constraintLogic = '';
          orLogic = [];
          code = 66;
          constraints = [bag];
          getConstraint = function(newConstraint) {
            var constraint, _i, _len;
            for (_i = 0, _len = constraints.length; _i < _len; _i++) {
              constraint = constraints[_i];
              if (constraint.path === newConstraint.path && constraint.value === newConstraint.value) {
                return constraint.code;
              }
            }
          };
          for (_i = 0, _len = selections.length; _i < _len; _i++) {
            selection = selections[_i];
            if ((selection != null) && (category != null)) {
              constraint = $.extend(true, {}, category, {
                'value': this.response.results[selection.row + 1][0]
              });
              a = getConstraint(constraint);
              if (a == null) {
                constraint.code = a = String.fromCharCode(code++).toUpperCase();
                constraints.push(constraint);
              }
              if ((selection.column != null) && (series != null)) {
                constraint = $.extend(true, {}, series, {
                  'value': this.translate(this.response, this.response.results[0][selection.column])
                });
                b = getConstraint(constraint);
                if (b == null) {
                  constraint.code = b = String.fromCharCode(code++).toUpperCase();
                  constraints.push(constraint);
                }
                orLogic.push('(' + [a, b].join(' AND ') + ')');
              } else {
                orLogic.push(a);
              }
            }
          }
          if (code > 90) {
            throw 'Too many constraints';
          }
          pq.constraintLogic = ['A', '(' + orLogic.join(' OR ') + ')'].join(' AND ');
          pq.where = constraints;
          if (code > 66 && this.options.resultsCb) {
            return this.options.resultsCb(pq);
          }
        };
      
        ChartView.prototype.viewAllAction = function() {
          var field, i, pq, rem, _i, _len, _ref2, _ref3;
          pq = JSON.parse(this.response.pathQuery);
          _ref2 = ['%category', '%series'];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            rem = _ref2[_i];
            _ref3 = pq.where;
            for (i in _ref3) {
              field = _ref3[i];
              if ((field != null ? field.value : void 0) === rem) {
                pq.where.splice(i, 1);
                break;
              }
            }
          }
          return this.options.resultsCb(pq);
        };
      
        ChartView.prototype.viewSeriesAction = function(pathQuery) {
          var field, i, pq, _ref2;
          if (!this.options.resultsCb) {
            return;
          }
          pq = JSON.parse(pathQuery);
          _ref2 = pq.where;
          for (i in _ref2) {
            field = _ref2[i];
            if ((field != null ? field.value : void 0) === '%category') {
              pq.where.splice(i, 1);
              break;
            }
          }
          return this.options.resultsCb(pq);
        };
      
        ChartView.prototype.formAction = function(e) {
          this.widget.formOptions[$(e.target).attr("name")] = $(e.target[e.target.selectedIndex]).attr("value");
          return this.widget.render();
        };
      
        return ChartView;
      
      })(Backbone.View);
      
      module.exports = ChartView;
      
    });

    
    // EnrichmentLengthCorrectionView.coffee
    root.require.register('list-widgets/src/class/views/EnrichmentLengthCorrectionView.js', function(exports, require, module) {
    
      var $, Backbone, EnrichmentLengthCorrectionView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      /* Enrichment Widget gene length correction.*/
      
      
      EnrichmentLengthCorrectionView = (function(_super) {
        __extends(EnrichmentLengthCorrectionView, _super);
      
        function EnrichmentLengthCorrectionView() {
          this.seeWhich = __bind(this.seeWhich, this);
          this.toggleCull = __bind(this.toggleCull, this);
          this.hideHelp = __bind(this.hideHelp, this);
          this.showHelp = __bind(this.showHelp, this);
          this.render = __bind(this.render, this);
          _ref1 = EnrichmentLengthCorrectionView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        EnrichmentLengthCorrectionView.prototype.help = "Depending on the type of experiment your data comes from, it is sometimes \nnecessary to normalize by gene length in order to get the correct p-values. \nIf your data comes from a genome-wide binding experiment such as ChIP-seq \nor DamID, binding intervals are more likely to be associated with longer \ngenes than shorter ones, and you should therefore normalize by gene length. \nThis is not the case for experiments such as gene expression studies, where \ngene length does not play a role in the likelihood that a particular set of \ngenes will be overrepresented in the list.";
      
        EnrichmentLengthCorrectionView.prototype.events = {
          'click .correction a.correction': 'toggleCull',
          'click .correction a.which': 'seeWhich',
          'mouseover .correction label .badge': 'showHelp',
          'click .correction a.close': 'hideHelp'
        };
      
        EnrichmentLengthCorrectionView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          if (this.gene_length_correction != null) {
            return this.render();
          }
        };
      
        EnrichmentLengthCorrectionView.prototype.render = function() {
          $(this.el).append(require('../../templates/enrichment/enrichment.correction')(this));
          return this;
        };
      
        EnrichmentLengthCorrectionView.prototype.showHelp = function() {
          return $(this.el).find('.hjalp').html(require('../../templates/popover/popover.help')({
            "title": 'What does "Normalise by length" mean?',
            "text": this.help
          }));
        };
      
        EnrichmentLengthCorrectionView.prototype.hideHelp = function() {
          return $(this.el).find('.hjalp').empty();
        };
      
        EnrichmentLengthCorrectionView.prototype.toggleCull = function(e) {
          var el;
          (el = $(e.target)).toggleClass('active');
          this.widget.widget.formOptions['gene_length_correction'] = el.hasClass('active');
          return this.widget.widget.render();
        };
      
        EnrichmentLengthCorrectionView.prototype.seeWhich = function(e) {
          var pq;
          pq = JSON.parse(this.pathQueryGeneLengthNull);
          this.cb(pq);
          return e.preventDefault();
        };
      
        return EnrichmentLengthCorrectionView;
      
      })(Backbone.View);
      
      module.exports = EnrichmentLengthCorrectionView;
      
    });

    
    // EnrichmentPopoverView.coffee
    root.require.register('list-widgets/src/class/views/EnrichmentPopoverView.js', function(exports, require, module) {
    
      var $, Backbone, EnrichmentPopoverView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      /* Enrichment Widget table row matches box.*/
      
      
      EnrichmentPopoverView = (function(_super) {
        __extends(EnrichmentPopoverView, _super);
      
        function EnrichmentPopoverView() {
          this.listAction = __bind(this.listAction, this);
          this.resultsAction = __bind(this.resultsAction, this);
          this.matchAction = __bind(this.matchAction, this);
          this.getPq = __bind(this.getPq, this);
          this.toggle = __bind(this.toggle, this);
          this.adjustPopover = __bind(this.adjustPopover, this);
          this.renderValues = __bind(this.renderValues, this);
          this.render = __bind(this.render, this);
          _ref1 = EnrichmentPopoverView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        EnrichmentPopoverView.prototype.descriptionLimit = 50;
      
        EnrichmentPopoverView.prototype.valuesLimit = 5;
      
        EnrichmentPopoverView.prototype.events = {
          "click a.match": "matchAction",
          "click a.results": "resultsAction",
          "click a.list": "listAction",
          "click a.close": "toggle"
        };
      
        EnrichmentPopoverView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          return this.render();
        };
      
        EnrichmentPopoverView.prototype.render = function() {
          var pq;
          $(this.el).css({
            'position': 'relative'
          });
          $(this.el).html(require('../../templates/popover/popover')({
            "description": this.description,
            "descriptionLimit": this.descriptionLimit,
            "style": this.style || "width:300px;margin-left:-300px",
            'can': {
              'list': this.widget.token && this.listCb,
              'results': this.resultsCb
            }
          }));
          pq = JSON.parse(this.response['pathQueryForMatches']);
          pq.where.push({
            "path": this.response.pathConstraint,
            "op": "ONE OF",
            "values": this.identifiers
          });
          this.widget.queryRows(pq, this.renderValues);
          return this;
        };
      
        EnrichmentPopoverView.prototype.renderValues = function(response) {
          var object, value, values, _i, _len;
          values = [];
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            object = response[_i];
            value = (function(object) {
              var column, _j, _len1, _ref2;
              _ref2 = object.reverse();
              for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                column = _ref2[_j];
                if (column && column.length > 0) {
                  return column;
                }
              }
            })(object);
            if (__indexOf.call(values, value) < 0) {
              values.push(value);
            }
          }
          $(this.el).find('div.values').html(require('../../templates/popover/popover.values')({
            'values': values,
            'type': this.response.type,
            'valuesLimit': this.valuesLimit,
            'size': this.size,
            'can': {
              'match': this.matchCb
            }
          }));
          return this.adjustPopover();
        };
      
        EnrichmentPopoverView.prototype.adjustPopover = function() {
          var _this = this;
          return window.setTimeout((function() {
            var diff, head, header, parent, popover, table, widget;
            table = $(_this.el).closest('div.wrapper');
            popover = $(_this.el).find('.popover');
            parent = popover.closest('td.matches');
            if (!parent.length) {
              return;
            }
            widget = parent.closest('div.inner');
            header = widget.find('div.header');
            head = widget.find('div.content div.head');
            diff = ((parent.position().top - header.height() + head.height()) + popover.outerHeight()) - table.height();
            if (diff > 0) {
              return popover.css('top', -diff);
            }
          }), 0);
        };
      
        EnrichmentPopoverView.prototype.toggle = function() {
          $(this.el).toggle();
          return this.adjustPopover();
        };
      
        EnrichmentPopoverView.prototype.getPq = function() {
          var pq;
          pq = this.response.pathQuery;
          this.pq = JSON.parse(pq);
          return this.pq.where.push({
            "path": this.response.pathConstraint,
            "op": "ONE OF",
            "values": this.identifiers
          });
        };
      
        EnrichmentPopoverView.prototype.matchAction = function(e) {
          this.matchCb($(e.target).text(), this.response.type);
          return e.preventDefault();
        };
      
        EnrichmentPopoverView.prototype.resultsAction = function() {
          if (this.pq == null) {
            this.getPq();
          }
          return this.resultsCb(this.pq);
        };
      
        EnrichmentPopoverView.prototype.listAction = function() {
          if (this.pq == null) {
            this.getPq();
          }
          return this.listCb(this.pq);
        };
      
        return EnrichmentPopoverView;
      
      })(Backbone.View);
      
      module.exports = EnrichmentPopoverView;
      
    });

    
    // EnrichmentPopulationView.coffee
    root.require.register('list-widgets/src/class/views/EnrichmentPopulationView.js', function(exports, require, module) {
    
      var $, Backbone, EnrichmentPopulationView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      /* Enrichment Widget background population selection box.*/
      
      
      EnrichmentPopulationView = (function(_super) {
        __extends(EnrichmentPopulationView, _super);
      
        function EnrichmentPopulationView() {
          this.selectListAction = __bind(this.selectListAction, this);
          this.filterAction = __bind(this.filterAction, this);
          this.toggleAction = __bind(this.toggleAction, this);
          this.renderLists = __bind(this.renderLists, this);
          this.render = __bind(this.render, this);
          _ref1 = EnrichmentPopulationView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        EnrichmentPopulationView.prototype.events = {
          "click .background a.change": "toggleAction",
          "click .background a.close": "toggleAction",
          "keyup .background input.filter": "filterAction",
          "click .background table a": "selectListAction"
        };
      
        EnrichmentPopulationView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          return this.render();
        };
      
        EnrichmentPopulationView.prototype.render = function() {
          $(this.el).append(require('../../templates/enrichment/enrichment.population')({
            'current': this.current != null ? this.current : 'Default',
            'loggedIn': this.loggedIn
          }));
          this.renderLists(this.lists);
          return this;
        };
      
        EnrichmentPopulationView.prototype.renderLists = function(lists) {
          return $(this.el).find('div.values').html(require('../../templates/enrichment/enrichment.populationlist')({
            'lists': lists,
            'current': this.current
          }));
        };
      
        EnrichmentPopulationView.prototype.toggleAction = function() {
          return $(this.el).find('div.popover').toggle();
        };
      
        EnrichmentPopulationView.prototype.filterAction = function(e) {
          var _this = this;
          if (this.timeout != null) {
            clearTimeout(this.timeout);
          }
          return this.timeout = setTimeout((function() {
            var l, query, re;
            query = $(e.target).val();
            if (query !== _this.query) {
              _this.query = query;
              re = new RegExp("" + query + ".*", 'i');
              return _this.renderLists((function() {
                var _i, _len, _ref2, _results;
                _ref2 = this.lists;
                _results = [];
                for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                  l = _ref2[_i];
                  if (l.name.match(re)) {
                    _results.push(l);
                  }
                }
                return _results;
              }).call(_this));
            }
          }), 500);
        };
      
        EnrichmentPopulationView.prototype.selectListAction = function(e) {
          var list;
          list = $(e.target).text();
          e.preventDefault();
          this.toggleAction();
          return this.widget.selectBackgroundList(list, $(this.el).find('input.save:checked').length === 1);
        };
      
        return EnrichmentPopulationView;
      
      })(Backbone.View);
      
      module.exports = EnrichmentPopulationView;
      
    });

    
    // EnrichmentRowView.coffee
    root.require.register('list-widgets/src/class/views/EnrichmentRowView.js', function(exports, require, module) {
    
      var $, Backbone, EnrichmentPopoverView, EnrichmentRowView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      EnrichmentPopoverView = require('./EnrichmentPopoverView');
      
      EnrichmentRowView = (function(_super) {
        __extends(EnrichmentRowView, _super);
      
        function EnrichmentRowView() {
          this.toggleMatchesAction = __bind(this.toggleMatchesAction, this);
          this.selectAction = __bind(this.selectAction, this);
          this.render = __bind(this.render, this);
          _ref1 = EnrichmentRowView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        EnrichmentRowView.prototype.tagName = "tr";
      
        EnrichmentRowView.prototype.events = {
          "click td.check input": "selectAction",
          "click td.matches a.count": "toggleMatchesAction"
        };
      
        EnrichmentRowView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          this.model.bind('change', this.render);
          return this.render();
        };
      
        EnrichmentRowView.prototype.render = function() {
          $(this.el).html(require('../../templates/enrichment/enrichment.row')({
            "row": this.model.toJSON()
          }));
          return this;
        };
      
        EnrichmentRowView.prototype.selectAction = function() {
          this.model.toggleSelected();
          if (this.popoverView != null) {
            $(this.el).find('td.matches a.count').after(this.popoverView.el);
            return this.popoverView.delegateEvents();
          }
        };
      
        EnrichmentRowView.prototype.toggleMatchesAction = function(e) {
          if (this.popoverView == null) {
            return $(this.el).find('td.matches a.count').after((this.popoverView = new EnrichmentPopoverView({
              "matches": this.model.get("matches"),
              "identifiers": [this.model.get("identifier")],
              "description": this.model.get("description"),
              "matchCb": this.callbacks.matchCb,
              "resultsCb": this.callbacks.resultsCb,
              "listCb": this.callbacks.listCb,
              "response": this.response,
              "widget": this.widget,
              "size": $(e.target).text()
            })).el);
          } else {
            return this.popoverView.toggle();
          }
        };
      
        return EnrichmentRowView;
      
      })(Backbone.View);
      
      module.exports = EnrichmentRowView;
      
    });

    
    // EnrichmentView.coffee
    root.require.register('list-widgets/src/class/views/EnrichmentView.js', function(exports, require, module) {
    
      var $, Backbone, EnrichmentLengthCorrectionView, EnrichmentPopoverView, EnrichmentPopulationView, EnrichmentRowView, EnrichmentView, Models, exporter, _, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, _ = _ref._, Backbone = _ref.Backbone;
      
      Models = require('../models/CoreModel');
      
      EnrichmentRowView = require('./EnrichmentRowView');
      
      EnrichmentPopoverView = require('./EnrichmentPopoverView');
      
      EnrichmentPopulationView = require('./EnrichmentPopulationView');
      
      EnrichmentLengthCorrectionView = require('./EnrichmentLengthCorrectionView');
      
      exporter = require('../../utils/exporter');
      
      EnrichmentView = (function(_super) {
        __extends(EnrichmentView, _super);
      
        function EnrichmentView() {
          this.selectBackgroundList = __bind(this.selectBackgroundList, this);
          this.viewAction = __bind(this.viewAction, this);
          this.exportAction = __bind(this.exportAction, this);
          this.selectAllAction = __bind(this.selectAllAction, this);
          this.formAction = __bind(this.formAction, this);
          this.renderTableBody = __bind(this.renderTableBody, this);
          this.renderTable = __bind(this.renderTable, this);
          this.renderToolbar = __bind(this.renderToolbar, this);
          _ref1 = EnrichmentView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        EnrichmentView.prototype.events = {
          "click div.actions a.view": "viewAction",
          "click div.actions a.export": "exportAction",
          "change div.form select": "formAction",
          "click div.content input.check": "selectAllAction"
        };
      
        EnrichmentView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          this.collection = new Models.EnrichmentResults();
          this.collection.bind('change', this.renderToolbar);
          return this.render();
        };
      
        EnrichmentView.prototype.render = function() {
          var extraAttribute, opts;
          $(this.el).html(require('../../templates/enrichment/enrichment')({
            "title": this.options.title ? this.response.title : "",
            "description": this.options.description ? this.response.description : "",
            "notAnalysed": this.response.notAnalysed,
            "type": this.response.type
          }));
          $(this.el).find("div.form").html(require('../../templates/enrichment/enrichment.form')({
            "options": this.form.options,
            "pValues": this.form.pValues,
            "errorCorrections": this.form.errorCorrections
          }));
          if (this.response.filterLabel != null) {
            $(this.el).find('div.form form').append(require('../../templates/extra')({
              "label": this.response.filterLabel,
              "possible": this.response.filters.split(','),
              "selected": this.response.filterSelectedValue
            }));
          }
          new EnrichmentPopulationView({
            'el': $(this.el).find('div.form form'),
            'lists': this.lists,
            'current': this.response.current_population,
            'loggedIn': this.response.is_logged,
            'widget': this
          });
          if (this.response.extraAttribute) {
            extraAttribute = JSON.parse(this.response.extraAttribute);
            if (extraAttribute.gene_length) {
              opts = _.extend({}, extraAttribute.gene_length, {
                'el': $(this.el).find('div.form form'),
                'widget': this,
                'cb': this.options.resultsCb
              });
              new EnrichmentLengthCorrectionView(opts);
            }
          }
          if (this.response.current_list != null) {
            $(this.el).addClass('customBackgroundPopulation');
          } else {
            $(this.el).removeClass('customBackgroundPopulation');
          }
          if (this.response.results.length > 0 && (this.response.message == null)) {
            this.renderToolbar();
            this.renderTable();
          } else {
            $(this.el).find("div.content").html($(require('../../templates/noresults')({
              'text': this.response.message || 'No enrichment found.'
            })));
          }
          this.widget.fireEvent({
            'class': 'EnrichmentView',
            'event': 'rendered'
          });
          return this;
        };
      
        EnrichmentView.prototype.renderToolbar = function() {
          return $(this.el).find("div.actions").html(require('../../templates/actions')());
        };
      
        EnrichmentView.prototype.renderTable = function() {
          var height, i, table, _fn, _i, _ref2,
            _this = this;
          $(this.el).find("div.content").html(require('../../templates/enrichment/enrichment.table')({
            "label": this.response.label
          }));
          table = $(this.el).find("div.content table");
          _fn = function(i) {
            var data, row;
            data = _this.response.results[i];
            if (_this.response.externalLink) {
              data.externalLink = _this.response.externalLink + data.identifier;
            }
            row = new Models.EnrichmentRow(data, _this.widget);
            return _this.collection.add(row);
          };
          for (i = _i = 0, _ref2 = this.response.results.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
            _fn(i);
          }
          this.renderTableBody(table);
          height = $(this.el).height() - $(this.el).find('div.header').height() - $(this.el).find('div.content table thead').height();
          $(this.el).find("div.content div.wrapper").css('height', "" + height + "px");
          $(this.el).find("div.content div.head").css("width", $(this.el).find("div.content table").width() + "px");
          table.find('thead th').each(function(i, th) {
            return $(_this.el).find("div.content div.head div:eq(" + i + ")").width($(th).width());
          });
          return table.css({
            'margin-top': '-' + table.find('thead').height() + 'px'
          });
        };
      
        EnrichmentView.prototype.renderTableBody = function(table) {
          var fragment, row, _i, _len, _ref2;
          fragment = document.createDocumentFragment();
          _ref2 = this.collection.models;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            row = _ref2[_i];
            fragment.appendChild(new EnrichmentRowView({
              "model": row,
              "type": this.response.type,
              "callbacks": {
                "matchCb": this.options.matchCb,
                "resultsCb": this.options.resultsCb,
                "listCb": this.options.listCb
              },
              "response": this.response,
              "widget": this.widget
            }).el);
          }
          return table.find('tbody').html(fragment);
        };
      
        EnrichmentView.prototype.formAction = function(e) {
          this.widget.formOptions[$(e.target).attr("name")] = $(e.target[e.target.selectedIndex]).attr("value");
          return this.widget.render();
        };
      
        EnrichmentView.prototype.selectAllAction = function() {
          this.collection.toggleSelected();
          this.renderToolbar();
          return this.renderTableBody($(this.el).find("div.content table"));
        };
      
        EnrichmentView.prototype.exportAction = function(e) {
          var model, pq, rowIdentifiers, selected, _i, _len,
            _this = this;
          selected = this.collection.selected();
          if (!selected.length) {
            selected = this.collection.models;
          }
          rowIdentifiers = [];
          for (_i = 0, _len = selected.length; _i < _len; _i++) {
            model = selected[_i];
            rowIdentifiers.push(model.get('identifier'));
          }
          pq = JSON.parse(this.response['pathQueryForMatches']);
          pq.where.push({
            "path": this.response.pathConstraint,
            "op": "ONE OF",
            "values": rowIdentifiers
          });
          return this.widget.queryRows(pq, function(response) {
            var TypeError, dict, object, result, _j, _k, _len1, _len2;
            dict = {};
            for (_j = 0, _len1 = response.length; _j < _len1; _j++) {
              object = response[_j];
              if (dict[object[0]] == null) {
                dict[object[0]] = [];
              }
              dict[object[0]].push(object[1]);
            }
            result = [];
            for (_k = 0, _len2 = selected.length; _k < _len2; _k++) {
              model = selected[_k];
              result.push([model.get('description'), model.get('p-value')].join("\t") + "\t" + dict[model.get('identifier')].join(',') + "\t" + model.get('identifier'));
            }
            if (result.length) {
              try {
                return new exporter.Exporter(result.join("\n"), "" + _this.widget.bagName + " " + _this.widget.id + ".tsv");
              } catch (_error) {
                TypeError = _error;
                return new exporter.PlainExporter($(e.target), result.join("\n"));
              }
            }
          });
        };
      
        EnrichmentView.prototype.viewAction = function() {
          var descriptions, model, rowIdentifiers, selected, _i, _len, _ref2;
          selected = this.collection.selected();
          if (!selected.length) {
            selected = this.collection.models;
          }
          descriptions = [];
          rowIdentifiers = [];
          for (_i = 0, _len = selected.length; _i < _len; _i++) {
            model = selected[_i];
            descriptions.push(model.get('description'));
            rowIdentifiers.push(model.get('identifier'));
          }
          if (rowIdentifiers.length) {
            if ((_ref2 = this.popoverView) != null) {
              _ref2.remove();
            }
            return $(this.el).find('div.actions').after((this.popoverView = new EnrichmentPopoverView({
              "identifiers": rowIdentifiers,
              "description": descriptions.join(', '),
              "style": "width:300px",
              "matchCb": this.options.matchCb,
              "resultsCb": this.options.resultsCb,
              "listCb": this.options.listCb,
              "response": this.response,
              "widget": this.widget
            })).el);
          }
        };
      
        EnrichmentView.prototype.selectBackgroundList = function(list, save) {
          if (save == null) {
            save = false;
          }
          if (list === 'Default') {
            list = '';
          }
          this.widget.formOptions['current_population'] = list;
          this.widget.formOptions['remember_population'] = save;
          return this.widget.render();
        };
      
        return EnrichmentView;
      
      })(Backbone.View);
      
      module.exports = EnrichmentView;
      
    });

    
    // TablePopoverView.coffee
    root.require.register('list-widgets/src/class/views/TablePopoverView.js', function(exports, require, module) {
    
      var $, Backbone, TablePopoverView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      /* Table Widget table row matches box.*/
      
      
      TablePopoverView = (function(_super) {
        __extends(TablePopoverView, _super);
      
        function TablePopoverView() {
          this.toggle = __bind(this.toggle, this);
          this.adjustPopover = __bind(this.adjustPopover, this);
          this.listAction = __bind(this.listAction, this);
          this.resultsAction = __bind(this.resultsAction, this);
          this.matchAction = __bind(this.matchAction, this);
          this.renderValues = __bind(this.renderValues, this);
          this.render = __bind(this.render, this);
          _ref1 = TablePopoverView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        TablePopoverView.prototype.descriptionLimit = 50;
      
        TablePopoverView.prototype.valuesLimit = 5;
      
        TablePopoverView.prototype.events = {
          'click a.match': 'matchAction',
          'click a.results': 'resultsAction',
          'click a.list': 'listAction',
          'click a.close': 'toggle'
        };
      
        TablePopoverView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          return this.render();
        };
      
        TablePopoverView.prototype.render = function() {
          $(this.el).css({
            'position': 'relative'
          });
          $(this.el).html(require('../../templates/popover/popover')({
            'description': this.description,
            'descriptionLimit': this.descriptionLimit,
            'style': this.style || "width:300px;margin-left:-300px",
            'can': {
              'list': this.widget.token && this.listCb,
              'results': this.resultsCb
            }
          }));
          this.pathQuery = JSON.parse(this.pathQuery);
          this.pathQuery.where.push({
            'path': this.pathConstraint,
            'op': 'ONE OF',
            'values': this.identifiers
          });
          this.widget.queryRows(this.pathQuery, this.renderValues);
          return this;
        };
      
        TablePopoverView.prototype.renderValues = function(response) {
          var object, values, _i, _len;
          values = [];
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            object = response[_i];
            values.push((function(object) {
              var column, _j, _len1;
              for (_j = 0, _len1 = object.length; _j < _len1; _j++) {
                column = object[_j];
                if (column && column.length > 0) {
                  return column;
                }
              }
            })(object));
          }
          $(this.el).find('div.values').html(require('../../templates/popover/popover.values')({
            'values': values,
            'type': this.type,
            'valuesLimit': this.valuesLimit,
            'size': this.size,
            'can': {
              'match': this.matchCb
            }
          }));
          return this.adjustPopover();
        };
      
        TablePopoverView.prototype.matchAction = function(e) {
          this.matchCb($(e.target).text(), this.type);
          return e.preventDefault();
        };
      
        TablePopoverView.prototype.resultsAction = function() {
          return this.resultsCb(this.pathQuery);
        };
      
        TablePopoverView.prototype.listAction = function() {
          return this.listCb(this.pathQuery);
        };
      
        TablePopoverView.prototype.adjustPopover = function() {
          var _this = this;
          return window.setTimeout((function() {
            var diff, head, header, parent, popover, table, widget;
            table = $(_this.el).closest('div.wrapper');
            popover = $(_this.el).find('.popover');
            parent = popover.closest('td.matches');
            if (!parent.length) {
              return;
            }
            widget = parent.closest('div.inner');
            header = widget.find('div.header');
            head = widget.find('div.content div.head');
            diff = ((parent.position().top - header.height() + head.height()) + popover.outerHeight()) - table.height();
            if (diff > 0) {
              return popover.css('top', -diff);
            }
          }), 0);
        };
      
        TablePopoverView.prototype.toggle = function() {
          $(this.el).toggle();
          return this.adjustPopover();
        };
      
        return TablePopoverView;
      
      })(Backbone.View);
      
      module.exports = TablePopoverView;
      
    });

    
    // TableRowView.coffee
    root.require.register('list-widgets/src/class/views/TableRowView.js', function(exports, require, module) {
    
      var $, Backbone, TablePopoverView, TableRowView, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      TablePopoverView = require('./TablePopoverView');
      
      TableRowView = (function(_super) {
        __extends(TableRowView, _super);
      
        function TableRowView() {
          this.toggleMatchesAction = __bind(this.toggleMatchesAction, this);
          this.selectAction = __bind(this.selectAction, this);
          this.render = __bind(this.render, this);
          _ref1 = TableRowView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        TableRowView.prototype.tagName = "tr";
      
        TableRowView.prototype.events = {
          "click td.check input": "selectAction",
          "click td.matches a.count": "toggleMatchesAction"
        };
      
        TableRowView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          this.model.bind('change', this.render);
          return this.render();
        };
      
        TableRowView.prototype.render = function() {
          $(this.el).html(require('../../templates/table/table.row')({
            "row": this.model.toJSON()
          }));
          return this;
        };
      
        TableRowView.prototype.selectAction = function() {
          this.model.toggleSelected();
          if (this.popoverView != null) {
            $(this.el).find('td.matches a.count').after(this.popoverView.el);
            return this.popoverView.delegateEvents();
          }
        };
      
        TableRowView.prototype.toggleMatchesAction = function(e) {
          if (this.popoverView == null) {
            return $(this.el).find('td.matches a.count').after((this.popoverView = new TablePopoverView({
              "identifiers": [this.model.get("identifier")],
              "description": this.model.get("descriptions").join(', '),
              "matchCb": this.matchCb,
              "resultsCb": this.resultsCb,
              "listCb": this.listCb,
              "pathQuery": this.response.pathQuery,
              "pathConstraint": this.response.pathConstraint,
              "widget": this.widget,
              "type": this.response.type,
              "size": $(e.target).text()
            })).el);
          } else {
            return this.popoverView.toggle();
          }
        };
      
        return TableRowView;
      
      })(Backbone.View);
      
      module.exports = TableRowView;
      
    });

    
    // TableView.coffee
    root.require.register('list-widgets/src/class/views/TableView.js', function(exports, require, module) {
    
      var $, Backbone, Models, TablePopoverView, TableRowView, TableView, exporter, _ref, _ref1,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../../deps'), $ = _ref.$, Backbone = _ref.Backbone;
      
      Models = require('../models/CoreModel');
      
      TableRowView = require('./TableRowView');
      
      TablePopoverView = require('./TablePopoverView');
      
      exporter = require('../../utils/exporter');
      
      TableView = (function(_super) {
        __extends(TableView, _super);
      
        function TableView() {
          this.viewAction = __bind(this.viewAction, this);
          this.exportAction = __bind(this.exportAction, this);
          this.selectAllAction = __bind(this.selectAllAction, this);
          this.renderTableBody = __bind(this.renderTableBody, this);
          this.renderTable = __bind(this.renderTable, this);
          this.renderToolbar = __bind(this.renderToolbar, this);
          _ref1 = TableView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        TableView.prototype.events = {
          "click div.actions a.view": "viewAction",
          "click div.actions a.export": "exportAction",
          "click div.content input.check": "selectAllAction"
        };
      
        TableView.prototype.initialize = function(o) {
          var k, v;
          for (k in o) {
            v = o[k];
            this[k] = v;
          }
          this.collection = new Models.TableResults();
          this.collection.bind('change', this.renderToolbar);
          return this.render();
        };
      
        TableView.prototype.render = function() {
          $(this.el).html(require('../../templates/table/table')({
            "title": this.options.title ? this.response.title : "",
            "description": this.options.description ? this.response.description : "",
            "notAnalysed": this.response.notAnalysed,
            "type": this.response.type
          }));
          if (this.response.results.length > 0) {
            this.renderToolbar();
            this.renderTable();
          } else {
            $(this.el).find("div.content").html(require('../../templates/noresults')({
              'text': "No \"" + this.response.title + "\" with your list."
            }));
          }
          this.widget.fireEvent({
            'class': 'TableView',
            'event': 'rendered'
          });
          return this;
        };
      
        TableView.prototype.renderToolbar = function() {
          return $(this.el).find("div.actions").html(require('../../templates/actions')());
        };
      
        TableView.prototype.renderTable = function() {
          var height, i, table, _fn, _i, _ref2,
            _this = this;
          $(this.el).find("div.content").html(require('../../templates/table/table.table')({
            "columns": this.response.columns.split(',')
          }));
          table = $(this.el).find("div.content table");
          _fn = function(i) {
            var row;
            row = new Models.TableRow(_this.response.results[i], _this.widget);
            return _this.collection.add(row);
          };
          for (i = _i = 0, _ref2 = this.response.results.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
            _fn(i);
          }
          this.renderTableBody(table);
          height = $(this.el).height() - $(this.el).find('div.header').height() - $(this.el).find('div.content div.head').height();
          $(this.el).find("div.content div.wrapper").css('height', "" + height + "px");
          $(this.el).find("div.content div.head").css("width", $(this.el).find("div.content table").width() + "px");
          table.find('thead th').each(function(i, th) {
            return $(_this.el).find("div.content div.head div:eq(" + i + ")").width($(th).width());
          });
          return table.css({
            'margin-top': '-' + table.find('thead').height() + 'px'
          });
        };
      
        TableView.prototype.renderTableBody = function(table) {
          var fragment, row, _i, _len, _ref2;
          fragment = document.createDocumentFragment();
          _ref2 = this.collection.models;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            row = _ref2[_i];
            fragment.appendChild(new TableRowView({
              "model": row,
              "response": this.response,
              "matchCb": this.options.matchCb,
              "resultsCb": this.options.resultsCb,
              "listCb": this.options.listCb,
              "widget": this.widget
            }).el);
          }
          return table.find('tbody').html(fragment);
        };
      
        TableView.prototype.selectAllAction = function() {
          this.collection.toggleSelected();
          this.renderToolbar();
          return this.renderTableBody($(this.el).find("div.content table"));
        };
      
        TableView.prototype.exportAction = function(e) {
          var TypeError, model, result, selected, _i, _len;
          selected = this.collection.selected();
          if (!selected.length) {
            selected = this.collection.models;
          }
          result = [this.response.columns.replace(/,/g, "\t")];
          for (_i = 0, _len = selected.length; _i < _len; _i++) {
            model = selected[_i];
            result.push(model.get('descriptions').join("\t") + "\t" + model.get('matches'));
          }
          if (result.length) {
            try {
              return new exporter.Exporter(result.join("\n"), "" + this.widget.bagName + " " + this.widget.id + ".tsv");
            } catch (_error) {
              TypeError = _error;
              return new exporter.PlainExporter($(e.target), result.join("\n"));
            }
          }
        };
      
        TableView.prototype.viewAction = function() {
          var descriptions, model, rowIdentifiers, selected, _i, _len, _ref2;
          selected = this.collection.selected();
          if (!selected.length) {
            selected = this.collection.models;
          }
          descriptions = [];
          rowIdentifiers = [];
          for (_i = 0, _len = selected.length; _i < _len; _i++) {
            model = selected[_i];
            descriptions.push(model.get('descriptions')[0]);
            rowIdentifiers.push(model.get('identifier'));
          }
          if (rowIdentifiers.length) {
            if ((_ref2 = this.popoverView) != null) {
              _ref2.remove();
            }
            return $(this.el).find('div.actions').after((this.popoverView = new TablePopoverView({
              "identifiers": rowIdentifiers,
              "description": descriptions.join(', '),
              "matchCb": this.options.matchCb,
              "resultsCb": this.options.resultsCb,
              "listCb": this.options.listCb,
              "pathQuery": this.response.pathQuery,
              "pathConstraint": this.response.pathConstraint,
              "widget": this.widget,
              "type": this.response.type,
              "style": 'width:300px'
            })).el);
          }
        };
      
        return TableView;
      
      })(Backbone.View);
      
      module.exports = TableView;
      
    });

    
    // deps.coffee
    root.require.register('list-widgets/src/deps.js', function(exports, require, module) {
    
      var $;
      
      $ = window.jQuery || window.Zepto;
      
      module.exports = {
        $: $,
        _: _,
        Backbone: Backbone,
        saveAs: saveAs,
        google: google,
        intermine: intermine
      };
      
    });

    
    // actions.eco
    root.require.register('list-widgets/src/templates/actions.js', function(exports, require, module) {
    
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
            __out.push('<a class="btn btn-small view">View</a>\n<a class="btn btn-small export">Download</a>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // chart.actions.eco
    root.require.register('list-widgets/src/templates/chart/chart.actions.js', function(exports, require, module) {
    
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
            if (this.can.results) {
              __out.push('\n<a class="btn btn-small view-all">View in table</a>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // chart.eco
    root.require.register('list-widgets/src/templates/chart/chart.js', function(exports, require, module) {
    
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
            __out.push('<div class="header">\n    <h3>');
          
            if (this.title) {
              __out.push(__sanitize(this.title));
            }
          
            __out.push('</h3>\n    <p>');
          
            if (this.description) {
              __out.push(this.description);
            }
          
            __out.push('</p>\n    ');
          
            if (this.notAnalysed) {
              __out.push('\n        <p>Number of ');
              __out.push(__sanitize(this.type));
              __out.push('s in this list not analysed in this widget: <a>');
              __out.push(__sanitize(this.notAnalysed));
              __out.push('</a></p>\n    ');
            } else {
              __out.push('\n        <p>All items in your list have been analysed.</p>\n    ');
            }
          
            __out.push('\n\n    <div class="form">\n        <form style="margin:0">\n            <!-- extra.eco -->\n        </form>\n    </div>\n\n    <div class="actions" style="padding:10px 0">\n        <!-- chart.actions.eco -->\n    </div>\n</div>\n<div class="content"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.correction.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.correction.js', function(exports, require, module) {
    
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
            __out.push('<div class="group correction" style="display:inline-block;margin-right:10px;float:left;height:60px">\n    <label>Normalise by length <em class="badge badge-info" style="font-size:11px;font-family:serif;padding:1px 3px;border-radius:2px">i</em><div class="hjalp" style="padding:0"></div></label>\n\n    ');
          
            if (this.gene_length_correction) {
              __out.push('\n        <a class="btn btn-small active correction" style="float:right">Normalised</a>\n    ');
            } else {
              __out.push('\n        <a class="btn btn-small correction" style="float:right">Normalise</a>\n    ');
            }
          
            __out.push('\n\n    ');
          
            if (this.percentage_gene_length_not_null) {
              __out.push('\n    \t');
              __out.push(__sanitize(this.percentage_gene_length_not_null));
              __out.push(' of genes in your list do not have a length and will be discarded, <a class="which" style="cursor:pointer">see which</a>.\n    ');
            }
          
            __out.push('\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.js', function(exports, require, module) {
    
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
            __out.push('<div class="header">\n    <h3>');
          
            if (this.title) {
              __out.push(__sanitize(this.title));
            }
          
            __out.push('</h3>\n    <p>');
          
            if (this.description) {
              __out.push(this.description);
            }
          
            __out.push('</p>\n    ');
          
            if (this.notAnalysed) {
              __out.push('\n        <p>Number of ');
              __out.push(__sanitize(this.type));
              __out.push('s in this list not analysed in this widget: <a>');
              __out.push(__sanitize(this.notAnalysed));
              __out.push('</a></p>\n    ');
            } else {
              __out.push('\n        <p>All items in your list have been analysed.</p>\n    ');
            }
          
            __out.push('\n\n    <div class="form">\n        <!-- enrichment.form.eco -->\n    </div>\n\n    <div class="actions" style="padding:10px 0">\n        <!-- actions.eco -->\n    </div>\n</div>\n<div class="content">\n    <!-- enrichment.table.eco -->\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.form.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.form.js', function(exports, require, module) {
    
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
            var correction, p, _i, _j, _len, _len1, _ref, _ref1;
          
            __out.push('<form style="margin:0">\n    <div class="group" style="display:inline-block;margin-right:10px;float:left;height:60px">\n        <label>Test Correction</label>\n        <select name="errorCorrection" class="span2">\n            ');
          
            _ref = this.errorCorrections;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              correction = _ref[_i];
              __out.push('\n                <option value="');
              __out.push(__sanitize(correction));
              __out.push('" ');
              if (this.options.errorCorrection === correction) {
                __out.push(__sanitize('selected="selected"'));
              }
              __out.push('>\n                    ');
              __out.push(__sanitize(correction));
              __out.push('\n            </option>\n            ');
            }
          
            __out.push('\n        </select>\n    </div>\n\n    <div class="group" style="display:inline-block;margin-right:10px;float:left;height:60px">\n        <label>Max p-value</label>\n        <select name="pValue" class="span2">\n            ');
          
            _ref1 = this.pValues;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              p = _ref1[_j];
              __out.push('\n                <option value="');
              __out.push(__sanitize(p));
              __out.push('" ');
              if (parseFloat(this.options.pValue) === parseFloat(p)) {
                __out.push(__sanitize('selected="selected"'));
              }
              __out.push('>\n                    ');
              __out.push(__sanitize(p));
              __out.push('\n                </option>\n            ');
            }
          
            __out.push('\n        </select>\n    </div>\n</form>\n<div style="clear:both"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.population.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.population.js', function(exports, require, module) {
    
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
            __out.push('<div class="group background" style="display:inline-block;margin-right:10px;float:left;height:60px">\n    <label>Background population</label>\n    ');
          
            __out.push(__sanitize(this.current));
          
            __out.push(' <a class="btn btn-small change">Change</a>\n\n    <div class="popover" style="position:absolute;top:0;right:0;z-index:1;display:none">\n        <div class="popover-inner">\n            <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n            <h4 class="popover-title">Change background population</h4>\n            <div class="popover-content">\n                <p style="margin-bottom:5px">\n                    ');
          
            if (this.loggedIn) {
              __out.push('\n                        <input type="checkbox" class="save" style="vertical-align:top" /> Save your preference for next time\n                    ');
            } else {
              __out.push('\n                        Login to save your preference for next time\n                    ');
            }
          
            __out.push('\n                </p>\n\n                <input type="text" class="filter" style="width:96%" placeholder="Filter..." />\n                \n                <div class="values" style="max-height:300px;overflow-y:auto">\n                    <!-- enrichment.populationlist.eco -->\n                </div>\n            </div>\n        </div>\n    </div>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.populationlist.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.populationlist.js', function(exports, require, module) {
    
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
            var list, tag, _i, _j, _len, _len1, _ref, _ref1;
          
            __out.push('<table class="table table-striped">\n    <tbody>\n        <tr><td>\n            ');
          
            if (this.current == null) {
              __out.push('\n                <strong><a href="#">Default</a></strong>\n            ');
            } else {
              __out.push('\n                <a href="#">Default</a>\n            ');
            }
          
            __out.push('\n        </td></tr>\n        ');
          
            _ref = this.lists;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              list = _ref[_i];
              __out.push('\n            <tr><td>\n                ');
              if (list.name === this.current) {
                __out.push('\n                    <strong>\n                        <a ');
                if (list.description) {
                  __out.push('title="');
                  __out.push(__sanitize(list.description));
                  __out.push('"');
                }
                __out.push(' href="#">');
                __out.push(__sanitize(list.name));
                __out.push('</a> (');
                __out.push(__sanitize(list.size));
                __out.push(')\n                    </strong>\n                ');
              } else {
                __out.push('\n                    <a ');
                if (list.description) {
                  __out.push('title="');
                  __out.push(__sanitize(list.description));
                  __out.push('"');
                }
                __out.push(' href="#">');
                __out.push(__sanitize(list.name));
                __out.push('</a> (');
                __out.push(__sanitize(list.size));
                __out.push(')\n                ');
              }
              __out.push('\n                \n                ');
              _ref1 = list.tags;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                tag = _ref1[_j];
                __out.push('\n                    <span class="label" style="vertical-align:text-bottom">');
                __out.push(__sanitize(tag));
                __out.push('</span>\n                ');
              }
              __out.push('\n            </td></tr>\n        ');
            }
          
            __out.push('\n    </tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.row.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.row.js', function(exports, require, module) {
    
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
            __out.push('<td class="check"><input type="checkbox" ');
          
            if (this.row["selected"]) {
              __out.push('checked="checked"');
            }
          
            __out.push(' /></td>\n<td class="description">\n    ');
          
            __out.push(__sanitize(this.row["description"]));
          
            __out.push('\n    ');
          
            if (this.row["externalLink"]) {
              __out.push('\n        [<a href="');
              __out.push(this.row["externalLink"]);
              __out.push('" target="_blank">');
              __out.push(__sanitize(this.row["identifier"]));
              __out.push('</a>]\n    ');
            }
          
            __out.push('\n</td>\n<td class="pValue" style="white-space:nowrap">');
          
            __out.push(__sanitize(this.row["p-value"]));
          
            __out.push('</td>\n<td class="matches">\n    <a class="count" style="cursor:pointer">');
          
            __out.push(__sanitize(this.row["matches"]));
          
            __out.push('</a>\n</td>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // enrichment.table.eco
    root.require.register('list-widgets/src/templates/enrichment/enrichment.table.js', function(exports, require, module) {
    
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
            __out.push('<!-- actual fixed head -->\n<div class="head" style="display:table">\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;"><input type="checkbox" class="check" /></div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">');
          
            __out.push(__sanitize(this.label));
          
            __out.push('</div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;white-space:nowrap">p-Value <a href="http://intermine.readthedocs.org/en/latest/embedding/list-widgets/enrichment-widgets/" target="_blank" class="badge badge-info" style="font-size:11px;font-family:serif;padding:1px 3px;border-radius:2px;font-style:italic;color:#FFF!important">i</a></div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">Matches</div>\n    <div style="clear:both"></div>\n</div>\n<div class="wrapper" style="overflow:auto;overflow-x:hidden">\n    <table class="table table-striped">\n        <!-- head for proper cell width -->\n        <thead style="visibility:hidden">\n            <tr>\n                <th></th>\n                <th>');
          
            __out.push(__sanitize(this.label));
          
            __out.push('</th>\n                <th>p-Value</th>\n                <th>Matches</th>\n            </tr>\n        </thead>\n        <tbody>\n            <!-- loop enrichment.row.eco -->\n        </tbody>\n    </table>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // error.eco
    root.require.register('list-widgets/src/templates/error.js', function(exports, require, module) {
    
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
            __out.push('<div class="alert alert-block">\n    <h4 class="alert-heading">');
          
            __out.push(__sanitize(this.title));
          
            __out.push(' for ');
          
            __out.push(__sanitize(this.name));
          
            __out.push('</h4>\n    <p>');
          
            __out.push(this.text);
          
            __out.push('</p>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // extra.eco
    root.require.register('list-widgets/src/templates/extra.js', function(exports, require, module) {
    
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
            var v, _i, _len, _ref;
          
            __out.push('<div class="group" style="display:inline-block;margin-right:5px;float:left">\n    <label>');
          
            __out.push(__sanitize(this.label));
          
            __out.push('</label>\n    ');
          
            if (this.possible.length > 1) {
              __out.push('\n        <select name="');
              __out.push(__sanitize(this.label));
              __out.push('" class="span2">\n            ');
              _ref = this.possible;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                v = _ref[_i];
                __out.push('\n                <option value="');
                __out.push(__sanitize(v));
                __out.push('" ');
                if (this.selected === v) {
                  __out.push(__sanitize('selected="selected"'));
                }
                __out.push('>\n                    ');
                __out.push(__sanitize(v));
                __out.push('\n                </option>\n            ');
              }
              __out.push('\n        </select>\n    ');
            } else {
              __out.push('\n        ');
              __out.push(__sanitize(this.possible[0]));
              __out.push('\n    ');
            }
          
            __out.push('\n</div>\n<div style="clear:both"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // invalidjsonkey.eco
    root.require.register('list-widgets/src/templates/invalidjsonkey.js', function(exports, require, module) {
    
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
            __out.push('<li style="vertical-align:bottom">\n    <span style="display:inline-block" class="label label-important">');
          
            __out.push(__sanitize(this.key));
          
            __out.push('</span> is ');
          
            __out.push(__sanitize(this.actual));
          
            __out.push('; was expecting ');
          
            __out.push(__sanitize(this.expected));
          
            __out.push('\n</li>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // loading.eco
    root.require.register('list-widgets/src/templates/loading.js', function(exports, require, module) {
    
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
            __out.push('<div class="loading" style="background:rgba(255,255,255,0.9);position:absolute;top:0;left:0;height:100%;width:100%;text-align:center;">\n    <p style="padding-top:50%;font-weight:bold;">Loading &hellip;</p>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // noresults.eco
    root.require.register('list-widgets/src/templates/noresults.js', function(exports, require, module) {
    
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
            __out.push('<div class="alert alert-info">\n    <p>');
          
            __out.push(__sanitize(this.text || 'The Widget has no results.'));
          
            __out.push('</p>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // popover.eco
    root.require.register('list-widgets/src/templates/popover/popover.js', function(exports, require, module) {
    
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
            __out.push('<div class="popover" style="position:absolute;top:5px;right:0;z-index:1;display:block">\n    <div class="popover-inner" style="');
          
            __out.push(__sanitize(this.style));
          
            __out.push('">\n        <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n        <h3 class="popover-title">\n            ');
          
            __out.push(__sanitize(this.description.slice(0, +(this.descriptionLimit - 1) + 1 || 9e9)));
          
            __out.push('\n            ');
          
            if (this.description.length > this.descriptionLimit) {
              __out.push('&hellip;');
            }
          
            __out.push('\n        </h3>\n        <div class="popover-content">\n            <div class="values">\n                Loading &hellip;\n                <!-- popover.values.eco -->\n            </div>\n            <div style="margin-top:10px">\n                ');
          
            if (this.can.results) {
              __out.push('\n                <a class="btn btn-small btn-primary results">View results</a>\n                ');
            }
          
            __out.push('\n                ');
          
            if (this.can.list) {
              __out.push('\n                <a class="btn btn-small list">Create list</a>\n                ');
            }
          
            __out.push('\n            </div>\n        </div>\n    </div>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // popover.help.eco
    root.require.register('list-widgets/src/templates/popover/popover.help.js', function(exports, require, module) {
    
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
            __out.push('<div class="popover" style="position:absolute;top:5px;right:0;z-index:1;display: block;">\n    <div class="popover-inner">\n        <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n        <h3 class="popover-title">');
          
            __out.push(__sanitize(this.title));
          
            __out.push('</h3>\n        <div class="popover-content">\n            <p>');
          
            __out.push(__sanitize(this.text));
          
            __out.push('</p>\n        </div>\n    </div>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // popover.values.eco
    root.require.register('list-widgets/src/templates/popover/popover.values.js', function(exports, require, module) {
    
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
            var object, _i, _len, _ref;
          
            __out.push('<h4>');
          
            __out.push(__sanitize(this.size));
          
            __out.push(' ');
          
            __out.push(__sanitize(this.type));
          
            if (parseInt(this.size) !== 1) {
              __out.push(__sanitize('s'));
            }
          
            __out.push(':</h4>\n\n');
          
            _ref = this.values.slice(0, +(this.valuesLimit - 1) + 1 || 9e9);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              object = _ref[_i];
              __out.push('\n    ');
              if (this.can.match) {
                __out.push('\n        <a href="#" class="match">');
                __out.push(__sanitize(object));
                __out.push('</a>\n    ');
              } else {
                __out.push('\n        <span>');
                __out.push(__sanitize(object));
                __out.push('</span>\n    ');
              }
              __out.push('\n');
            }
          
            __out.push('\n');
          
            if (this.values.length > this.valuesLimit) {
              __out.push('&hellip;');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    root.require.register('list-widgets/src/templates/table/table.js', function(exports, require, module) {
    
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
            __out.push('<div class="header">\n    <h3>');
          
            if (this.title) {
              __out.push(__sanitize(this.title));
            }
          
            __out.push('</h3>\n    <p>');
          
            if (this.description) {
              __out.push(this.description);
            }
          
            __out.push('</p>\n    ');
          
            if (this.notAnalysed) {
              __out.push('\n        <p>Number of ');
              __out.push(__sanitize(this.type));
              __out.push('s in this list not analysed in this widget: <a>');
              __out.push(__sanitize(this.notAnalysed));
              __out.push('</a></p>\n    ');
            } else {
              __out.push('\n        <p>All items in your list have been analysed.</p>\n    ');
            }
          
            __out.push('\n\n    <div class="actions" style="padding:10px 0">\n        <!-- actions.eco -->\n    </div>\n</div>\n<div class="content">\n    <!-- table.table.eco -->\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.row.eco
    root.require.register('list-widgets/src/templates/table/table.row.js', function(exports, require, module) {
    
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
            var column, _i, _len, _ref;
          
            __out.push('<td class="check"><input type="checkbox" ');
          
            if (this.row["selected"]) {
              __out.push('checked="checked"');
            }
          
            __out.push(' /></td>\n');
          
            _ref = this.row["descriptions"];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              column = _ref[_i];
              __out.push('\n    <td>');
              __out.push(__sanitize(column));
              __out.push('</td>\n');
            }
          
            __out.push('\n<td class="matches">\n    <a class="count" style="cursor:pointer">');
          
            __out.push(__sanitize(this.row["matches"]));
          
            __out.push('</a>\n</td>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.table.eco
    root.require.register('list-widgets/src/templates/table/table.table.js', function(exports, require, module) {
    
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
            var column, _i, _j, _len, _len1, _ref, _ref1;
          
            __out.push('<!-- actual fixed head -->\n<div class="head" style="display:table">\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;"><input type="checkbox" class="check" /></div>\n    ');
          
            _ref = this.columns;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              column = _ref[_i];
              __out.push('\n        <div style="font-weight:bold;display:table-cell;padding:0 8px;">');
              __out.push(__sanitize(column));
              __out.push('</div>\n    ');
            }
          
            __out.push('\n    <div style="clear:both"></div>\n</div>\n<div class="wrapper" style="overflow:auto;overflow-x:hidden">\n    <table class="table table-striped">\n        <!-- head for proper cell width -->\n        <thead style="visibility:hidden">\n            <tr>\n                <th></th>\n                ');
          
            _ref1 = this.columns;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              column = _ref1[_j];
              __out.push('\n                    <th>');
              __out.push(__sanitize(column));
              __out.push('</th>\n                ');
            }
          
            __out.push('\n            </tr>\n        </thead>\n        <tbody>\n            <!-- loop table.row.eco -->\n        </tbody>\n    </table>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // exporter.coffee
    root.require.register('list-widgets/src/utils/exporter.js', function(exports, require, module) {
    
      var $, saveAs, _ref;
      
      _ref = require('../deps'), $ = _ref.$, saveAs = _ref.saveAs;
      
      /* Create file download with custom content.*/
      
      
      exports.Exporter = (function() {
        Exporter.prototype.mime = 'text/plain';
      
        Exporter.prototype.charset = 'utf-8';
      
        /*
        Use `BlobBuilder` and `URL` to force download dynamic string as a file.
        @param {object} a jQuery element
        @param {string} data string to download
        @param {string} filename to save under
        */
      
      
        function Exporter(data, filename) {
          var blob;
          if (filename == null) {
            filename = 'widget.tsv';
          }
          blob = new Blob([data], {
            'type': "" + this.mime + ";charset=" + this.charset
          });
          saveAs(blob, filename);
        }
      
        return Exporter;
      
      })();
      
      exports.PlainExporter = (function() {
        /*
        Create a new window with a formatted content.
        @param {object} a jQuery element
        @param {string} data string to download
        */
      
        function PlainExporter(a, data) {
          var destroy, w,
            _this = this;
          w = window.open();
          if ((w == null) || typeof w === "undefined") {
            a.after(this.msg = $('<span/>', {
              'style': 'margin-left:5px',
              'class': 'label label-inverse',
              'text': 'Please enable popups'
            }));
          } else {
            w.document.open();
            w.document.write("<pre>" + data + "</pre>");
            w.document.close();
          }
          destroy = function() {
            var _ref1;
            return (_ref1 = _this.msg) != null ? _ref1.fadeOut() : void 0;
          };
          setTimeout(destroy, 5000);
        }
      
        return PlainExporter;
      
      })();
      
    });

    
    // type.coffee
    root.require.register('list-widgets/src/utils/type.js', function(exports, require, module) {
    
      /* Types in JS.*/
      
      var type, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      module.exports = type = {};
      
      type.Root = (function() {
        function Root() {}
      
        Root.prototype.result = false;
      
        Root.prototype.is = function() {
          return this.result;
        };
      
        Root.prototype.toString = function() {
          return "" + this.expected + " but got " + this.actual;
        };
      
        return Root;
      
      })();
      
      type.isString = (function(_super) {
        __extends(isString, _super);
      
        isString.prototype.expected = "String";
      
        function isString(actual) {
          this.actual = actual;
          this.result = typeof actual === 'string';
        }
      
        return isString;
      
      })(type.Root);
      
      type.isStringOrNull = (function(_super) {
        __extends(isStringOrNull, _super);
      
        isStringOrNull.prototype.expected = "String or Null";
      
        function isStringOrNull(actual) {
          this.actual = actual;
          this.result = actual === null || typeof actual === 'string';
        }
      
        return isStringOrNull;
      
      })(type.Root);
      
      type.isInteger = (function(_super) {
        __extends(isInteger, _super);
      
        isInteger.prototype.expected = "Integer";
      
        function isInteger(actual) {
          this.actual = actual;
          this.result = typeof actual === 'number';
        }
      
        return isInteger;
      
      })(type.Root);
      
      type.isBoolean = (function(_super) {
        __extends(isBoolean, _super);
      
        isBoolean.prototype.expected = "Boolean true";
      
        function isBoolean(actual) {
          this.actual = actual;
          this.result = typeof actual === 'boolean';
        }
      
        return isBoolean;
      
      })(type.Root);
      
      type.isBooleanOrNull = (function(_super) {
        __extends(isBooleanOrNull, _super);
      
        isBooleanOrNull.prototype.expected = "Boolean or Null";
      
        function isBooleanOrNull(actual) {
          this.actual = actual;
          this.result = actual === null || typeof actual === 'boolean';
        }
      
        return isBooleanOrNull;
      
      })(type.Root);
      
      type.isNull = (function(_super) {
        __extends(isNull, _super);
      
        isNull.prototype.expected = "Null";
      
        function isNull(actual) {
          this.actual = actual;
          this.result = actual === null;
        }
      
        return isNull;
      
      })(type.Root);
      
      type.isArray = (function(_super) {
        __extends(isArray, _super);
      
        isArray.prototype.expected = "Array";
      
        function isArray(actual) {
          this.actual = actual;
          this.result = actual instanceof Array;
        }
      
        return isArray;
      
      })(type.Root);
      
      type.isHTTPSuccess = (function(_super) {
        __extends(isHTTPSuccess, _super);
      
        isHTTPSuccess.prototype.expected = "HTTP code 200";
      
        function isHTTPSuccess(actual) {
          this.actual = actual;
          this.result = actual === 200;
        }
      
        return isHTTPSuccess;
      
      })(type.Root);
      
      type.isJSON = (function(_super) {
        __extends(isJSON, _super);
      
        isJSON.prototype.expected = "JSON Object";
      
        function isJSON(actual) {
          var e;
          this.actual = actual;
          this.result = true;
          try {
            JSON.parse(actual);
          } catch (_error) {
            e = _error;
            this.result = false;
          }
        }
      
        return isJSON;
      
      })(type.Root);
      
      type.isUndefined = (function(_super) {
        __extends(isUndefined, _super);
      
        function isUndefined() {
          _ref = isUndefined.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        isUndefined.prototype.expected = "it to be undefined";
      
        return isUndefined;
      
      })(type.Root);
      
    });

    
    // widgets.coffee
    root.require.register('list-widgets/src/widgets.js', function(exports, require, module) {
    
      var $, ChartWidget, EnrichmentWidget, TableWidget, Widgets, google, _ref,
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
      
      _ref = require('./deps'), $ = _ref.$, google = _ref.google;
      
      ChartWidget = require('./class/ChartWidget');
      
      EnrichmentWidget = require('./class/EnrichmentWidget');
      
      TableWidget = require('./class/TableWidget');
      
      Widgets = (function() {
        /*
        New Widgets client.
        @param {string} service A string pointing to service endpoint e.g. http://aragorn:8080/flymine/service/
        @param {string} token A string for accessing user's lists.
        or
        @param {Object} opts Config just like imjs consumes e.g. `{ "root": "", "token": "" }`
        */
      
        function Widgets(arg0, arg1) {
          var serviceOpts, _ref1;
          if (typeof arg0 === 'string') {
            this.root = arg0;
            this.token = arg1;
            serviceOpts = {
              root: this.root,
              token: this.token
            };
          } else {
            _ref1 = serviceOpts = arg0, this.root = _ref1.root, this.token = _ref1.token;
            if (!this.root) {
              throw new Error('You need to set the `root` parameter pointing to the mine\'s service');
            }
          }
          this.imjs = new intermine.Service(serviceOpts);
          this.lists = this.imjs.fetchLists();
        }
      
        /*
        Chart Widget.
        @param {string} id Represents a widget identifier as represented in webconfig-model.xml
        @param {string} bagName List name to use with this Widget.
        @param {jQuery selector} el Where to render the Widget to.
        @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
        */
      
      
        Widgets.prototype.chart = function(id, bagName, el, widgetOptions) {
          var _this = this;
          return google.load('visualization', '1.0', {
            packages: ['corechart'],
            callback: function() {
              var bag, opts, _ref1;
              if (_.isObject(id)) {
                _ref1 = id, id = _ref1.id, bag = _ref1.bag, bagName = _ref1.bagName, el = _ref1.el, widgetOptions = _ref1.widgetOptions, opts = _ref1.opts;
              }
              if (opts) {
                widgetOptions = opts;
              }
              if (bag && _.isObject(bag)) {
                bagName = bag.name;
              }
              return new ChartWidget(_this.imjs, _this.root, _this.token, id, bagName, el, widgetOptions);
            }
          });
        };
      
        /*
        Enrichment Widget.
        @param {string} id Represents a widget identifier as represented in webconfig-model.xml
        @param {string} bagName List name to use with this Widget.
        @param {jQuery selector} el Where to render the Widget to.
        @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {}, "errorCorrection": "Holm-Bonferroni", "pValue": "0.05" }`
        */
      
      
        Widgets.prototype.enrichment = function(id, bagName, el, widgetOptions) {
          var _this = this;
          return this.lists.then(function(lists) {
            var bag, opts, _ref1;
            if (_.isObject(id)) {
              _ref1 = id, id = _ref1.id, bag = _ref1.bag, bagName = _ref1.bagName, el = _ref1.el, widgetOptions = _ref1.widgetOptions, opts = _ref1.opts;
            }
            if (opts) {
              widgetOptions = opts;
            }
            if (bag && _.isObject(bag)) {
              bagName = bag.name;
            }
            return new EnrichmentWidget(_this.imjs, _this.root, _this.token, lists, id, bagName, el, widgetOptions);
          }, function(err) {
            return $(opts[2]).html($('<div/>', {
              'class': "alert alert-error",
              'html': "" + errstatusText + " for <a href='" + _this.root + "widgets'>" + _this.root + "widgets</a>"
            }));
          });
        };
      
        /*
        Table Widget.
        @param {string} id Represents a widget identifier as represented in webconfig-model.xml
        @param {string} bagName List name to use with this Widget.
        @param {jQuery selector} el Where to render the Widget to.
        @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
        */
      
      
        Widgets.prototype.table = function(id, bagName, el, widgetOptions) {
          var bag, opts, _ref1;
          if (_.isObject(id)) {
            _ref1 = id, id = _ref1.id, bag = _ref1.bag, bagName = _ref1.bagName, el = _ref1.el, widgetOptions = _ref1.widgetOptions, opts = _ref1.opts;
          }
          if (opts) {
            widgetOptions = opts;
          }
          if (bag && _.isObject(bag)) {
            bagName = bag.name;
          }
          return new TableWidget(this.imjs, this.root, this.token, id, bagName, el, widgetOptions);
        };
      
        /*
        All available List Widgets.
        @param {string} type Class of objects e.g. Gene, Protein.
        @param {string} bagName List name to use with this Widget.
        @param {jQuery selector} el Where to render the Widget to.
        @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
        */
      
      
        Widgets.prototype.all = function(type, bagName, el, widgetOptions) {
          var bag, error, opts, show, _ref1,
            _this = this;
          if (type == null) {
            type = "Gene";
          }
          if (_.isObject(type)) {
            _ref1 = type, type = _ref1.type, bag = _ref1.bag, bagName = _ref1.bagName, el = _ref1.el, widgetOptions = _ref1.widgetOptions, opts = _ref1.opts;
          }
          if (opts) {
            widgetOptions = opts;
          }
          error = function(content) {
            return $(el).html($('<div/>', {
              'class': "alert alert-error",
              'html': "" + content + " for <a href='" + _this.root + "widgets'>" + _this.root + "widgets</a>"
            }));
          };
          show = function(widgets, type) {
            var target, w, widgetEl, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = widgets.length; _i < _len; _i++) {
              w = widgets[_i];
              if (!(__indexOf.call(w.targets, type) >= 0)) {
                continue;
              }
              widgetEl = w.name.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase();
              $(el).append(target = $('<div/>', {
                'id': widgetEl,
                'class': "widget span6"
              }));
              _results.push(_this[w.widgetType](w.name, bagName, target, widgetOptions));
            }
            return _results;
          };
          return $.ajax({
            'url': "" + this.root + "widgets",
            'dataType': 'jsonp',
            success: function(res) {
              if (!res.widgets) {
                return error('No widgets have been configured');
              }
              if (type) {
                return show(res.widgets, type);
              }
              if (bag && _.isObject(bag)) {
                return show(res.widgets, bag.type);
              }
              if (!type) {
                return _this.imjs.fetchList(bagName, function(err, bag) {
                  if (err) {
                    return error(err);
                  }
                  return show(res.widgets, bag.type);
                });
              }
            },
            error: function(xhr, opts, err) {
              return error(xhr.statusText);
            }
          });
        };
      
        return Widgets;
      
      })();
      
      module.exports = Widgets;
      
    });
  })();

  // Return the main app.
  var main = root.require("list-widgets/src/widgets.js");

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("list-widgets", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["list-widgets"] = main;
  
  }

  // Alias our app.
  
  root.require.alias("list-widgets/src/widgets.js", "list-widgets/index.js");
  
})();