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
    
    
    // main.js
    root.require.register('PathwaysDisplayer/src/main.js', function(exports, require, module) {
    
      var AppView = require('./views/appview');
      var Helper = require('./modules/helper');
      var $ = require('./modules/dependencies').$;
      
      module.exports = function(params) {
      
      	var view = new AppView(params);
      	if ($(params.target).length != 1) throw "Not found";
      	view.setElement($(params.target));
      	view.render();
      	view.showLoading();
      
      /*
      	setTimeout(function() {
      		view.updateTableColors();
      
      	}, 5000);*/
      
      
      
      
      
      
      	//console.log(view.re);
      
      	//$(params.target).html(view.render().el);
      
      
      }
      
    });

    
    // pathwaycollection.js
    root.require.register('PathwaysDisplayer/src/models/pathwaycollection.js', function(exports, require, module) {
    
      var PathwayModel = require('./pathwaymodel');
      
        var PathwayCollection = Backbone.Collection.extend({
      
          model: PathwayModel,
      
          add: function(models) {
      
      
            if (!_.isArray(models)) {
              models = [models];
            }
      
            // Step through the models and look for a duplicates by slug.
            _.each(models, function(model) {
      
            	//console.log("Next model: " + JSON.stringify(model, null, 2));
      
              //model.url = aUrl;
      
      
              var returned = this.findWhere({slug: this.toSlug(model.name)});
      
      
         
      
              if (returned) {
              //console.log("found");
                //returned.updateData(model); 
                //console.log('returned, ' + model.url);      
              } else {
              	//console.log(model.name);
                Backbone.Collection.prototype.add.call(this, model);
              }
      
            },this);
          },
      
          comparator: function(pway) {
              return pway.get('name');
            },
      
         toSlug: function(text) {
          return text.toString().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        }
      
        });
      
      module.exports = new PathwayCollection();
    });

    
    // pathwaymodel.js
    root.require.register('PathwaysDisplayer/src/models/pathwaymodel.js', function(exports, require, module) {
    
      var mediator = require('../modules/mediator');
      
      var PathwayModel = Backbone.Model.extend({
      
          initialize: function() {
            //console.log("pathway model created");
            this.shiftPathwayIdentifier();
            this.set( {slug: this.toSlug(this.get('name')) });
            this.shiftData();
          },
      
          defaults: function() {
            return {organisms: []};
          },
      
          toSlug: function(text) {
            return text.toString().toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
          },
      
          shiftPathwayIdentifier: function() {
            var pwayId = this.get('identifier');
            var pwayObjId = this.get('objectId');
            _.each(this.attributes.genes, function(o) {
              o.pwayId = pwayId;
              o.pathwayId = pwayObjId;
            });
          },
      
          shiftData: function() {
            currentOrganisms = this.get("organisms");
      
            that = this;
            _.each(this.get('genes'), function(o) {
      
               mediator.trigger('column:add', {taxonId: o.organism.taxonId, sName: o.organism.shortName});
      
              var found = _.findWhere(currentOrganisms, {taxonId: o.organism.taxonId});
              // Did we find the organism in the pathway by taxonId?
              if (!found) {
                // push ourself onto the organism as an attribute
                var geneData = _.omit(o, 'organism');
                _.extend(geneData, {url: that.attributes.url});
                geneArray = [geneData]
                o.organism.genes = geneArray;
                currentOrganisms.push(o.organism);
              } else {
                var geneData = _.omit(o, 'organism');
                _.extend(geneData, {url: that.attributes.url});
                found.genes.push(geneData);
              }
      
            });
            this.set({organisms: currentOrganisms});
            this.unset('genes');
          },
      
          updateData: function(jsonData) {
      
            currentOrganisms = this.get("organisms");
      
            _.each(jsonData.genes, function(o) {
      
              mediator.trigger('column:add', {taxonId: o.organism.taxonId, sName: o.organism.shortName});
      
              var found = _.findWhere(currentOrganisms, {taxonId: o.organism.taxonId});
              // Did we find the organism in the pathway by taxonId?
              if (!found) {
                // copy our gene data to the organism
                var geneData = _.omit(o, 'organism');
                _.extend(geneData, {url: jsonData.url, pathwayId: jsonData.objectId});
                geneArray = [geneData]
                o.organism.genes = geneArray;
                currentOrganisms.push(o.organism);
              } else {
                var geneData = _.omit(o, 'organism');
                _.extend(geneData, {url: jsonData.url});
                found.genes.push(geneData);
              }
      
            });
            this.set({organisms: currentOrganisms});
            this.unset('genes');
      
          },
      
        });
      
      module.exports = PathwayModel;
      
      
    });

    
    // dependencies.js
    root.require.register('PathwaysDisplayer/src/modules/dependencies.js', function(exports, require, module) {
    
      var $;
            
      $ = window.jQuery
            
      module.exports = {
              $: $,
              _: _,
              Backbone: Backbone,
      
      };
    });

    
    // globals.js
    root.require.register('PathwaysDisplayer/src/modules/globals.js', function(exports, require, module) {
    
      var columns = [];
      exports.columns = columns;
    });

    
    // helper.js
    root.require.register('PathwaysDisplayer/src/modules/helper.js', function(exports, require, module) {
    
      var $ = require('./dependencies').$;
      var pwayCollection = require('../models/pathwaycollection.js');
      var mediator = require('./mediator');
      
      
       var launchAll = function(gene, url) {
      
      
        //console.log("launchAll has been called");
      
          /** Return a promise **/
          //return function (genes) {
      
            /// Array to store our pathway
            death = function(err) {
              //console.log("death: " + err);
            }
      
            var promiseArray = [];
      
            // Step through or mines
            for (mine in url) {
              promiseArray.push(runOne(gene, url[mine], mine));
            }
      
            // Return when all results have finished.
      
            return Q.all(promiseArray).fail(death);
      
          //}
        }
      
        var runOne = function(gene, location, mine) {
      
      
      
          return Q.when(getHomologues([gene], location)).then(
            function(returned) {
              return getPathwaysByGene(location, returned, "collection");
            },
            function(e) {
      
              mediator.trigger('notify:minefail', {mine: mine, err: e});
              throw e;
            }
          ).fail(error);
      
          function error (err) {
      
          }
      
      /*
           return Q.when(getHomologues([gene], location))
          .then(function(returned) {
            return getPathwaysByGene(location, returned, "collection")
          }).fail(error);
      */
      
        }
      
        // :: (string, string) -> (Array<Gene>) -> Promise<Array<Record>>
        var getPathwaysByGene = function(url, genes, pathwayCollection) {
      
            var query, printRecords, getService, getData, error, fin, luString;
      
            // Build a lookup string from our array of genes:
            luString = genes.map(function(gene) {return "\"" + gene.primaryIdentifier + "\""}).join(',');
      
            //console.log("luString: ", luString);
      
            // Build our query using our lookup string.
            query = {"select":["Pathway.genes.primaryIdentifier","Pathway.genes.symbol","Pathway.id","Pathway.dataSets.name","Pathway.name","Pathway.identifier","Pathway.genes.organism.shortName","Pathway.genes.organism.taxonId"],"orderBy":[{"Pathway.name":"ASC"}],"where":{"Pathway.genes": {LOOKUP: luString}}};
      
            // Build a query that gets us a list of gene for a given pathway
           // geneQuery = {"select":["Pathway.genes.primaryIdentifier","Pathway.id","Pathway.name","Pathway.identifier","Pathway.genes.organism.shortName","Pathway.genes.organism.taxonId"],"orderBy":[{"Pathway.name":"ASC"}],"where":{"Pathway.genes": {LOOKUP: luString}}};
      
            /** Return an IMJS service. **/
            getService = function (aUrl) {
              //console.log("getService has been called in getPathwaysByGene");
              return new IM.Service({root: aUrl});
            };
      
            /** Return query results **/
            getData = function (aService) {
                //console.log("------------------------getData has also been called");
                return aService.records(query);
            };
      
            /** Manipulate our results and add them to our collection. **/
            makeModels = function () {
      
      
              return function(pways) {
      
                _.map(pways, function(pathway) {
                  pathway.url = url;
      
                })
      
                 pwayCollection.add(pways);
      
                return pways;
      
              }
      
      
            } // End makeModels
      
            // Return our error
            error = function(err) {
              console.warn("I have failed in getPathways, ", err);
              throw new Error(err);
            };
      
            // Wait for our results and then return them.
            return Q(getService(url)).then(getData).then(makeModels()).fail(error);
      
          } // End function getPathwaysByGene
      
       // }
      
        /**
        * Get a list of homologues for a given gene from a given mine.
        **/
        // :: (string, string) -> Promise<Array<Gene>>
      var getHomologues = function(pIdentifier, url) {
      
          IM = intermine;
      
          var query, getService, getData, error, fin;
      
          // Build our query:
          //var query = {"select":["Homologue.homologue.primaryIdentifier", "Homologue.homologue.symbol"],"orderBy":[{"Homologue.homologue.primaryIdentifier":"ASC"}],"where":[{"path":"Homologue.gene","op":"LOOKUP","value":pIdentifier}]};
          // var query = {"select":["Homologue.homologue.primaryIdentifier", "Homologue.homologue.symbol"],"orderBy":[{"Homologue.homologue.primaryIdentifier":"ASC"}],"where":[{"path":"Homologue.gene","op":"LOOKUP","value":pIdentifier}]};
          //var query = {"select":["Gene.homologues.homologue.primaryIdentifier","Gene.homologues.homologue.symbol"],"constraintLogic":"A and B","orderBy":[{"Gene.homologues.homologue.primaryIdentifier":"ASC"}],"where":[{"path":"Gene","op":"LOOKUP","code":"A","value":"eyeless"},{"path":"Gene.homologues.type","op":"=","code":"B","value":"orthologue"}]};
          // Get our service.
          // var query = {"select":["Gene.homologues.homologue.primaryIdentifier"],"constraintLogic":"A and B","orderBy":[{"Gene.homologues.homologue.primaryIdentifier":"ASC"}],"where":[{"path":"Gene","op":"LOOKUP","code":"A","value":"FBgn0005558","extraValue":""},{"path":"Gene.homologues.type","op":"=","code":"B","value":"orthologue"}]};
          var query = {"select":["Gene.homologues.homologue.primaryIdentifier","Gene.homologues.homologue.symbol"],"constraintLogic":"A and B and C","orderBy":[{"Gene.homologues.homologue.primaryIdentifier":"ASC"}],"where":[{"path":"Gene","op":"LOOKUP","code":"A","value":pIdentifier,"extraValue":""},{"path":"Gene.homologues.type","op":"!=","code":"B","value":"paralogue"},{"path":"Gene.homologues.type","op":"!=","code":"C","value":"paralog"}]};
          getService = function (aUrl) {
      
            //console.log("building service");
            return new IM.Service({root: aUrl});
      
      
          };
      
          // Run our query.
          getData = function (aService) {
      
            var myModel = aService.fetchModel().then(function(model) {
              //console.log("MY MODEL: ", model);
            });
      
              var aValue = aService.records(query);
      
              return aValue;
          };
      
          // Deal with our results.
          returnResults = function () {
      
      
            return function (orgs) {
      
              if (orgs.length < 1) {
                // no results, return
                return [];
              }
      
              // Return the homologue attribute of our results.
            //var values = orgs.map(function(o) {
              var values = orgs[0].homologues.map(function(o) {
                return o.homologue
                //return o.homologues.homologue
              });
      
      
      
      
              // Create a 'fake' gene that represents the primary identifier and add it to our results
              var selfObject = new Object();
              selfObject.primaryIdentifier = pIdentifier;
              values.push(selfObject);
      
      
              luString = values.map(function(gene) {return gene.primaryIdentifier}).join(',');
              /*_.each(values, function(gene) {
                 //console.log("primary identifier: " + gene.primaryIdentifier);
              });*/
      
      
              return values;
            }
          }
          function error (err) {
                console.warn("I have failed in getHomologues.", err);
                throw new Error(err);
          }
          // Return our results when finished
          return Q(getService(url)).then(getData).then(returnResults()).fail(error);
          //return Q(getService(url)).fail(error);
        } // End getHomologues
      
        function dynamicSort(property) {
          var sortOrder = 1;
          if(property[0] === "-") {
              sortOrder = -1;
              property = property.substr(1);
          }
          return function (a,b) {
              var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
              return result * sortOrder;
          }
        }
      
      /*
        var d = Q.defer();
        doSth.then(d.resolve, d.reject);
        setTimeout(d.reject.bind(d, new Error("TIMEOUT")), 2000);
        return d.promise;
        */
      
      exports.getHomologues = getHomologues;
      exports.launchAll = launchAll;
      exports.dynamicSort = dynamicSort;
      
    });

    
    // mediator.js
    root.require.register('PathwaysDisplayer/src/modules/mediator.js', function(exports, require, module) {
    
        var mediator = _.extend({}, Backbone.Events);
        module.exports = mediator;
    });

    
    // celltitle.js
    root.require.register('PathwaysDisplayer/src/templates/celltitle.js', function(exports, require, module) {
    
      module.exports = '<%= name %>';
    });

    
    // details.js
    root.require.register('PathwaysDisplayer/src/templates/details.js', function(exports, require, module) {
    
      //module.exports = '<h4>test</h4>';
      
      module.exports = '<div class="innerDetailsContainer"> \
      	<div class="close clickable">◀ Close</div> \
      	<h4>Pathway Name</h4> \
      	<%= "<a href=" + pway.organism[0].genes[0].url + "/report.do?id=" + pway.organism[0].genes[0].pathwayId + ">" %> \
      	<%= pway.name %> \
      	</a> \
      	<h4>Organism</h4> \
      	<%= "<a href=" + pway.organism[0].genes[0].url + "/report.do?id=" + pway.organism[0].objectId + ">" %> \
      	<%= pway.organism[0].shortName %> \
      	</a> \
      	<h4>Homologous Genes</h4> \
      	<ul class="genes"> \
      		<% _.each(pway.organism[0].genes, function(gene) { %> \
      			<li> \
      			<%= "<a href=" + gene.url + "/report.do?id=" + gene.objectId + ">" %> \
      				<%= gene.symbol %> \
      			</a> \
      			</li> \
      		<% }) %> \
      	</ul> \
      	<h4>Data Set(s)</h4> \
      	<ul> \
      		<% _.each(pway.datasets, function(dataset) { %> \
      			<li> \
      				<%= "<a href=" + pway.organism[0].genes[0].url + "/report.do?id=" + dataset.objectId + ">" %> \
      				<%= dataset.name %> \
      				</a> \
      			</li> \
      		<% }); %> \
      	</ul></div> ';
    });

    
    // failurestatus.js
    root.require.register('PathwaysDisplayer/src/templates/failurestatus.js', function(exports, require, module) {
    
      module.exports = '<span>WARNING! The following mines were unreachable: </span> \
      				<ul class="inline"> \
      				<% _.each(failedMines, function(mine) { %> \
      					<li> \
      					<%= mine %> \
      					</li> \
      				<% }) %> \
      				</ul>';
    });

    
    // loading.js
    root.require.register('PathwaysDisplayer/src/templates/loading.js', function(exports, require, module) {
    
      module.exports = '<table id="pathways-displayer-loading"><tr><td><div style="float: left;" class="loading-spinner"></div><div style="float: left; padding-left: 5px">Querying mines...</div></td></tr></table>';
    });

    
    // noresults.js
    root.require.register('PathwaysDisplayer/src/templates/noresults.js', function(exports, require, module) {
    
      module.exports = "<table><tr><td>No pathways found.</td></tr></table>";
    });

    
    // pathwaycell.js
    root.require.register('PathwaysDisplayer/src/templates/pathwaycell.js', function(exports, require, module) {
    
      module.exports = '<div class="circle"></div>';
    });

    
    // results.js
    root.require.register('PathwaysDisplayer/src/templates/results.js', function(exports, require, module) {
    
      module.exports = '<table id="myTableResults"></table>';
    });

    
    // shell.js
    root.require.register('PathwaysDisplayer/src/templates/shell.js', function(exports, require, module) {
    
      module.exports = '\
      	<div class="pwayWrapper"> \
      		<div class="pwayMain"> \
      			<div id="pwayHeadersContainer"></div> \
      			<div id="pwayResultsContainer"> \
      				<div class="dataPane"></div> \
      			</div> \
      			<div id="statusBar" class="hidden"> \
      		</div> \
      	</div>';
    });

    
    // status.js
    root.require.register('PathwaysDisplayer/src/templates/status.js', function(exports, require, module) {
    
      module.exports = '<span>Querying <% console.log("FML: " + friendlyMines.length) %> mines.';
    });

    
    // successstatus.js
    root.require.register('PathwaysDisplayer/src/templates/successstatus.js', function(exports, require, module) {
    
      module.exports = '<span>All mines queried successfully.</span>';
    });

    
    // tableheaders.js
    root.require.register('PathwaysDisplayer/src/templates/tableheaders.js', function(exports, require, module) {
    
      module.exports = '<thead>\
      		<tr>\
      		<th>Pathway Name</th>\
      	<% _.each(columns, function(col) { %>\
      		<th><%= col.sName %></th>\
      	<% }) %>\
      	</tr>\
      	</thead>';
    });

    
    // tableheaderssanstable.js
    root.require.register('PathwaysDisplayer/src/templates/tableheaderssanstable.js', function(exports, require, module) {
    
      module.exports = '<thead>\
      		<tr>\
      		<th>Pathway Name</th>\
      	<% _.each(columns, function(col) { %>\
      		<th><%= col.sName %></th>\
      	<% }) %>\
      	</tr>\
      	</thead>';
    });

    
    // appview.js
    root.require.register('PathwaysDisplayer/src/views/appview.js', function(exports, require, module) {
    
        // Include helper functions:
        var mediator = require("../modules/mediator");
        var Helper = require('../modules/helper');
        var pwayCollection = require('../models/pathwaycollection');
        var TableView = require("./tableview");
        var TableViewHeaders = require("./tableviewheaders");
      
      
        var DataPaneView = require("./datapaneview");
        var Globals = require('../modules/globals');
        var $ = require('../modules/dependencies').$;
      
        var failures = new Array();
        // The Application
        // --------------
        var AppView = Backbone.View.extend({
      
          // Stores the final value of our columns
          columns: [],
      
          // Get the HTML template shell for our application
      
          //templateApp: _.template($('#tmplPwayApp').html()),
          templateShell: require('../templates/shell'),
          myFriendlyMines: null,
      
      
          initialize: function(params) {
      
      
      
            $(window).on("resize",this.resizeContext)
      
            var friendlyMines = params.friendlyMines;
      
            this.myFriendlyMines = friendlyMines;
      
      
            var shellTemplate = require('../templates/shell');
            var shellTemplater = _.template(shellTemplate);
            var shellHTML = shellTemplater({"myFriendlyMines": friendlyMines});
      
      
           this.$el.html(this.templateShell);
      
            // Listen to our mediator for events
            mediator.on('column:add', this.addColumn, this);
            mediator.on('stats:show', this.showStats, this);
            mediator.on('table:show', this.showTable, this);
            mediator.on('stats:hide', this.hideStats, this);
            mediator.on('table:color', this.updateTableColors, this);
            mediator.on('notify:minefail', this.notifyFail, this);
      
            mediator.on('stats:clearselected', this.clearSelected, this);
            mediator.on('notify:loading', this.showLoading, this);
      
      
           Q.when(Helper.launchAll(params.gene, friendlyMines))
            .then(function() { mediator.trigger('table:show', {backgroundColor: params.themeColor});})
            .then(function() { mediator.trigger('table:color', {})});
      
      
          },
      
          showLoading: function() {
      
            var loadingTemplate = require('../templates/loading');
            this.$("#pwayResultsContainer").append(loadingTemplate);
          },
      
      
          resizeContext: function() {
             this.$("#pwayResultsId th").each(function(i, val) {
                  $(".pwayHeaders th:eq(" + i + ")").width($(this).width());
              });
             this.$(".pwayHeaders").width($("#pwayResultsId").width());
      
             // Moves our table header over the copy:
             this.$("#pwayResultsId").css("margin-top", this.$("#pwayResultsId thead").height() * -1);
            this.$(".dataPane").css("top", $("#pwayHeadersContainer").height());
             this.$(".dataPane").css("height", $("#pwayResultsContainer").height());
      
      
      
          },
      
      
      
          render: function() {
            var template = _.template(this.templateShell);
            var output = template({myFriendlyMines: this.myFriendlyMines});
            this.$el.html(output);
            this.updateTableColors();
            return this;
          },
      
          // Show our data table:
          showTable: function(args) {
            if (pwayCollection.length < 1) {
              var noResultsTemplate = require('../templates/noresults');
              this.$("#pwayResultsContainer").html(noResultsTemplate);
            } else {
      
              var atableView = new TableView({collection: pwayCollection});
              var atableViewHeaders = new TableViewHeaders({collection: pwayCollection});
      
      
             this.$("#pathways-displayer-loading").remove();
      
             // Get the color of our previous parent container
             var parentColor = this.$el.prev('div').css('background-color');
      
      
      
             try {
               this.$("#pwayHeadersContainer").append(atableViewHeaders.render().el);
               this.$("#pwayResultsContainer").append(atableView.render().el);
              } catch (e) {
                console.error('Render Error: ',e);
              }
      
              this.$( ".circle" ).css( "background-color", args.backgroundColor );
      
      
            }
      
      
            // Build our table view.
      
            this.resizeContext();
      
      
            $(document).keyup(function(e) {
              if (e.keyCode == 27) {
                mediator.trigger('stats:hide', null);
                }   // esc
            });
      
            mediator.trigger('notify:queryprogress', this.myFriendlyMines);
      
            // We have failures, let the user know
      
            var output;
      
            if (failures.length > 0) {
              var failureTemplate = require('../templates/failurestatus');
              this.$el.find("#statusBar").removeClass("hidden");
              this.$el.find("#statusBar").addClass("warning");
              var template = _.template(failureTemplate);
              output = template({failedMines: failures});
              this.$el.find("#statusBar").html(output);
            }
      
      
          },
      
          updateTableColors:function() {
      
            var pColor = this.$('.pwayHeaders thead tr th').css("background-color");
            this.$("#pwayHeadersContainer").css("background-color", pColor);
      
          },
      
          // Show our stats pane with information
          showStats:function(pway) {
      
            var organism = _.where(pway.aModel.get("organisms"), {taxonId: pway.taxonId});
            var dataSets = pway.aModel.get("dataSets");
      
      
            var object = {
              name: pway.aModel.get("name"),
              organism: organism,
              datasets: pway.aModel.get("dataSets")
            }
      
            var detailsTemplate = require('../templates/details');
            var template = _.template(detailsTemplate);
            var detailsHtml = template({pway: object});
      
            this.$el.find(".dataPane").addClass("active");
      
            var testModel = new Backbone.Model(object);
      
      
            var dataView = new DataPaneView({model: testModel});
      
          },
      
          addColumn: function(colName) {
            var index = _.where(Globals.columns, {taxonId: colName.taxonId});
            if (index.length < 1) {
              Globals.columns.push(colName);
              Globals.columns.sort(Helper.dynamicSort("sName"));
            }
            //console.log(Globals.columns);
          },
      
          hideStats: function() {
      
            this.$(".dataPane").removeClass("active");
            $("tr.highlighted").removeClass("highlighted");
      
      
          },
      
          notifyFail: function(value) {
      
           failures.push(value.mine);
          },
      
          clearSelected: function() {
      
            this.$("tr.highlighted").removeClass("highlighted");
          }
      
        });
      
      
        module.exports = AppView;
      
    });

    
    // celltitleview.js
    root.require.register('PathwaysDisplayer/src/views/celltitleview.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var mediator = require('../modules/mediator');
      
        var CellTitleTemplate = require('../templates/celltitle.js');
      
        var PathwayCellTitleView = Backbone.View.extend({
      
            tagName: "td",
      
            events: {
              'click': 'openMe'
            },
      
            initialize: function(options) {
      
              this.options = options || {};
      
            },
      
            openMe: function() {
      
              mediator.trigger('stats:hide', {taxonId: this.options.taxonId, aModel: this.model});
              //this.options.parent.$el.css("background-color", "black");
      
            },
      
            render: function() {
      
             var template = _.template(CellTitleTemplate);
             var compiledTemplate = template( {name: this.model.get("name")});
             this.$el.append(compiledTemplate);
      
              return this.$el;
            }
      
      
        });
      
        module.exports = PathwayCellTitleView;
      
    });

    
    // datapaneview.js
    root.require.register('PathwaysDisplayer/src/views/datapaneview.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var mediator = require('../modules/mediator');
      
      
      var DataPaneView = Backbone.View.extend({
      
            el: '.dataPane',
      
            events: {
              'click .close': 'close'
            },
      
            initialize: function(options) {
      
              console.log("Data Pane Created with model " + this.model);
      
              this.options = options || {};
              console.log("name: " + this.model.get("name"));
              this.render();
              //this.render();
      
            },
      
            close: function() {
             // console.log("I am closing.");
              this.$el.removeClass("active");
              mediator.trigger('stats:clearselected', {});
            },
      
            openMe: function() {
      
              //this.options.parent.$el.css("background-color", "#252525");
               this.options.parent.$el.addClass("highlighted");
              mediator.trigger('stats:show', {taxonId: this.options.taxonId, aModel: this.model});
              //console.log("Cell Click Detected");
      
            },
      
            render: function() {
      
              var detailsTemplate = require('../templates/details');
              var template =_.template(detailsTemplate);
              var detailsHtml = template( {pway: this.model.toJSON()});
      
             this.$el.html(detailsHtml);
            // console.log("final html: " + detailsHtml);
      
              return this.$el;
            },
      
        });
      
      module.exports = DataPaneView;
      
    });

    
    // pathwaycellview.js
    root.require.register('PathwaysDisplayer/src/views/pathwaycellview.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var mediator = require('../modules/mediator');
      
      var CellTemplate = require('../templates/pathwaycell');
      
      var PathwayCellView = Backbone.View.extend({
      
            tagName: "td",
            className: "clickable",
      
            events: {
              'click': 'openMe'
            },
      
            initialize: function(options) {
      
              this.options = options || {};
      
            },
      
            openMe: function() {
      
              //this.options.parent.$el.css("background-color", "#252525");
               this.options.parent.$el.addClass("highlighted");
              mediator.trigger('stats:show', {taxonId: this.options.taxonId, aModel: this.model});
              //console.log("Cell Click Detected");
      
            },
      
            render: function() {
      
              var template=_.template(CellTemplate);
              var cellTemplate = template({});
             //console.log("cellTemplate: ", cellTemplate);
      
             this.$el.html(cellTemplate);
      
              return this.$el;
            },
      
            showMessage: function() {
      
              this.$el.html("<div>Test</div>");
            }
      
      
        });
      
      module.exports = PathwayCellView;
      
    });

    
    // pathwayview.js
    root.require.register('PathwaysDisplayer/src/views/pathwayview.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var PathwayCellView = require('./pathwaycellview');
      var PathwayCellTitleView = require('./celltitleview');
      var Globals = require('../modules/globals');
      
      var PathwayView = Backbone.View.extend({
      
          tagName: "tr",
      
          initialize: function (){
            
          },
      
          events: {
      
            "click": "open"
      
          },
      
          open: function() {
      
            //console.log("Row Click Detected");    
            
          },
      
          render: function() {
      
            // Get the models from our organisms:
            var modelOrganisms = this.model.get("organisms");
            var foundOrganism;
      
      
            var cellTitleView = new PathwayCellTitleView({
                 model: this.model,
                 parent: this
            });
      
            this.$el.append(cellTitleView.render());
      
      
            _.each(Globals.columns, function(col) {
      
                foundOrganism = _.where(modelOrganisms, {taxonId: col.taxonId});
      
      
                if (foundOrganism != null && foundOrganism != "" && foundOrganism.length > 0) {
                  var cellView = new PathwayCellView({
                    model: this.model,
                    taxonId: col.taxonId,
                    parent: this
                  });
                  this.$el.append(cellView.render());
      
                } else {
      
                  this.$el.append("<td></td>");
      
                }
      
            }, this);
      
             return this;
          },
      
       
      
      
        });
      
      module.exports = PathwayView;
    });

    
    // statusview.js
    root.require.register('PathwaysDisplayer/src/views/statusview.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var mediator = require('../modules/mediator');
      
        var mineStatusTemplate = require('../templates/mineStatus');
      
        var MineStatusView = Backbone.View.extend({
      
            initialize: function(options) {
      
              console.log("MineStatusView has been created with options: " + options.name);
              this.options = options || {};
              this.render();
      
            },
      
            success: function() {
      
              mediator.trigger('stats:hide', {taxonId: this.options.taxonId, aModel: this.model});
      
            },
      
            render: function() {
            var template = _.template(mineStatusTemplate);
             var compiledTemplate = template( {name: this.options.name});
             this.$el.append(compiledTemplate);
             //console.log("compiledTemplate " + compiledTemplate);
              return this.$el;
            }
      
      
        });
      
        module.exports = MineStatusView;
      
    });

    
    // tableview.js
    root.require.register('PathwaysDisplayer/src/views/tableview.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var mediator = require("../modules/mediator");
      var pwayCollection = require('../models/pathwaycollection.js');
      var templateTableHeaders = require('../templates/tableheaders');
      var templateTableHeadersSansTable = require('../templates/tableheaderssanstable');
      var PathwayView = require('./pathwayview');
      var Globals = require('../modules/globals');
      
      var TableView = Backbone.View.extend({
      
        //tagName: 'pathwaysappcontainer',
        tagName: "table",
        className: "pwayResults",
        id: "pwayResultsId",
      
      
        initialize: function() {
      
      
          _.bindAll(this,'render','renderOne');
          //console.log('table view initialized');
      
      
        },
        render: function() {
          var template = _.template(templateTableHeadersSansTable);
          var compiledTemplate = template({columns: Globals.columns});
          //console.log("compiledTemplate: " + compiledTemplate);
      
          this.$el.append(compiledTemplate);
          this.collection.each(this.renderOne);
          //console.log("from table view: " + this.$el.html());
          //this.$el.append("TESTING");
          //return this;
      
          return this;
        },
        renderOne: function(model) {
      
          var row=new PathwayView({model: model});
      
          this.$el.append(row.render().$el);
          return this;
        }
      });
      
      module.exports = TableView;
      
    });

    
    // tableviewheaders.js
    root.require.register('PathwaysDisplayer/src/views/tableviewheaders.js', function(exports, require, module) {
    
      var $ = require('../modules/dependencies').$;
      var mediator = require("../modules/mediator");
      var pwayCollection = require('../models/pathwaycollection.js');
      var templateTableHeaders = require('../templates/tableheaders');
      var PathwayView = require('./pathwayview');
      var Globals = require('../modules/globals');
      //var TableBody = require('../templates/results');
      
      var TableView = Backbone.View.extend({
      
        //tagName: 'pathwaysappcontainer',
        tagName: "table",
        className: "pwayHeaders",
      
        initialize: function() {
      
      
      
          //console.log('table view initialized');
        },
        render: function() {
          Globals.test = Globals.test ? Globals.test++ : 1;
          var template = _.template(templateTableHeaders);
          var compiledTemplate = template({columns: Globals.columns});
          //console.log("compiledTemplate: " + compiledTemplate);
          this.$el.append(compiledTemplate);
          //this.collection.each(this.renderOne);
          return this;
        },
      
      });
      
      module.exports = TableView;
      
    });
  })();

  // Return the main app.
  var main = root.require("PathwaysDisplayer/src/main.js");

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("PathwaysDisplayer", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["PathwaysDisplayer"] = main;
  
  }

  // Alias our app.
  
  root.require.alias("PathwaysDisplayer/src/main.js", "PathwaysDisplayer/index.js");
  
})();