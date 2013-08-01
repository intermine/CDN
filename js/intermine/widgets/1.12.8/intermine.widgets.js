(function() {
  var o = {};
  var JST = {};
  JST["extra.eco"]=function(e){e||(e={});var s,n=[],l=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?p(e):""},t=e.safe,p=e.escape;return s=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var s=new String(e);return s.ecoSafe=!0,s},p||(p=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,s,t,p;if(n.push('<div class="group" style="display:inline-block;margin-right:5px;float:left">\n    <label>'),n.push(l(this.label)),n.push("</label>\n    "),this.possible.length>1){for(n.push('\n        <select name="'),n.push(l(this.label)),n.push('" class="span2">\n            '),p=this.possible,s=0,t=p.length;t>s;s++)e=p[s],n.push('\n                <option value="'),n.push(l(e)),n.push('" '),this.selected===e&&n.push(l('selected="selected"')),n.push(">\n                    "),n.push(l(e)),n.push("\n                </option>\n            ");n.push("\n        </select>\n    ")}else n.push("\n        "),n.push(l(this.possible[0])),n.push("\n    ");n.push('\n</div>\n<div style="clear:both"></div>')}).call(this)}.call(e),e.safe=t,e.escape=p,n.join("")};
  JST["error.eco"]=function(e){e||(e={});var s,n=[],t=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?a(e):""},l=e.safe,a=e.escape;return s=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var s=new String(e);return s.ecoSafe=!0,s},a||(a=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){n.push('<div class="alert alert-block">\n    <h4 class="alert-heading">'),n.push(t(this.title)),n.push(" for "),n.push(t(this.name)),n.push("</h4>\n    <p>"),n.push(this.text),n.push("</p>\n</div>")}).call(this)}.call(e),e.safe=l,e.escape=a,n.join("")};
  JST["noresults.eco"]=function(e){e||(e={});var n,s=[],t=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?a(e):""},l=e.safe,a=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},a||(a=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){s.push('<div class="alert alert-info">\n    <p>'),s.push(t(this.text||"The Widget has no results.")),s.push("</p>\n</div>")}).call(this)}.call(e),e.safe=l,e.escape=a,s.join("")};
  JST["invalidjsonkey.eco"]=function(e){e||(e={});var n,s=[],t=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?l(e):""},a=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){s.push('<li style="vertical-align:bottom">\n    <span style="display:inline-block" class="label label-important">'),s.push(t(this.key)),s.push("</span> is "),s.push(t(this.actual)),s.push("; was expecting "),s.push(t(this.expected)),s.push("\n</li>")}).call(this)}.call(e),e.safe=a,e.escape=l,s.join("")};
  JST["loading.eco"]=function(e){e||(e={});var n,t=[],a=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="loading" style="background:rgba(255,255,255,0.9);position:absolute;top:0;left:0;height:100%;width:100%;text-align:center;">\n    <p style="padding-top:50%;font-weight:bold;">Loading &hellip;</p>\n</div>')}).call(this)}.call(e),e.safe=a,e.escape=l,t.join("")};
  JST["actions.eco"]=function(e){e||(e={});var n,t=[],a=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<a class="btn btn-small view">View</a>\n<a class="btn btn-small export">Download</a>')}).call(this)}.call(e),e.safe=a,e.escape=l,t.join("")};
  JST["popover.eco"]=function(e){e||(e={});var n,t=[],a=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?l(e):""},s=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="popover" style="position:absolute;top:5px;right:0;z-index:1;display:block">\n    <div class="popover-inner" style="'),t.push(a(this.style)),t.push('">\n        <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n        <h3 class="popover-title">\n            '),t.push(a(this.description.slice(0,+(this.descriptionLimit-1)+1||9e9))),t.push("\n            "),this.description.length>this.descriptionLimit&&t.push("&hellip;"),t.push('\n        </h3>\n        <div class="popover-content">\n            <div class="values">\n                <!-- popover.values.eco -->\n            </div>\n            <div style="margin-top:10px">\n                <a class="btn btn-small btn-primary results">View results</a>\n                <a class="btn btn-small list">Create list</a>\n            </div>\n        </div>\n    </div>\n</div>')}).call(this)}.call(e),e.safe=s,e.escape=l,t.join("")};
  JST["popover.help.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?l(e):""},a=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="popover" style="position:absolute;top:5px;right:0;z-index:1;display: block;">\n    <div class="popover-inner">\n        <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n        <h3 class="popover-title">'),t.push(s(this.title)),t.push('</h3>\n        <div class="popover-content">\n            <p>'),t.push(s(this.text)),t.push("</p>\n        </div>\n    </div>\n</div>")}).call(this)}.call(e),e.safe=a,e.escape=l,t.join("")};
  JST["chart.actions.eco"]=function(e){e||(e={});var n,t=[],a=e.safe,s=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},s||(s=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<a class="btn btn-small view-all">View in table</a>')}).call(this)}.call(e),e.safe=a,e.escape=s,t.join("")};
  JST["popover.values.eco"]=function(e){e||(e={});var n,t=[],a=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?l(e):""},s=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,n,s,l;for(t.push("<h4>"),t.push(a(this.size)),t.push(" "),t.push(a(this.type)),1!==parseInt(this.size)&&t.push(a("s")),t.push(":</h4>\n\n"),l=this.values.slice(0,+(this.valuesLimit-1)+1||9e9),n=0,s=l.length;s>n;n++)e=l[n],t.push('\n    <a href="#" class="match">'),t.push(a(e)),t.push("</a>\n");t.push("\n"),this.values.length>this.valuesLimit&&t.push("&hellip;"),t.push("\n")}).call(this)}.call(e),e.safe=s,e.escape=l,t.join("")};
  JST["enrichment.populationlist.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?l(e):""},a=e.safe,l=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},l||(l=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,n,a,l,i,c,r,p;for(t.push('<table class="table table-striped">\n    <tbody>\n        <tr><td>\n            '),null==this.current?t.push('\n                <strong><a href="#">Default</a></strong>\n            '):t.push('\n                <a href="#">Default</a>\n            '),t.push("\n        </td></tr>\n        "),r=this.lists,a=0,i=r.length;i>a;a++){for(e=r[a],t.push("\n            <tr><td>\n                "),e.name===this.current?(t.push("\n                    <strong>\n                        <a "),e.description&&(t.push('title="'),t.push(s(e.description)),t.push('"')),t.push(' href="#">'),t.push(s(e.name)),t.push("</a> ("),t.push(s(e.size)),t.push(")\n                    </strong>\n                ")):(t.push("\n                    <a "),e.description&&(t.push('title="'),t.push(s(e.description)),t.push('"')),t.push(' href="#">'),t.push(s(e.name)),t.push("</a> ("),t.push(s(e.size)),t.push(")\n                ")),t.push("\n                \n                "),p=e.tags,l=0,c=p.length;c>l;l++)n=p[l],t.push('\n                    <span class="label" style="vertical-align:text-bottom">'),t.push(s(n)),t.push("</span>\n                ");t.push("\n            </td></tr>\n        ")}t.push("\n    </tbody>\n</table>")}).call(this)}.call(e),e.safe=a,e.escape=l,t.join("")};
  JST["chart.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="header">\n    <h3>'),this.title&&t.push(s(this.title)),t.push("</h3>\n    <p>"),this.description&&t.push(this.description),t.push("</p>\n    "),this.notAnalysed?(t.push("\n        <p>Number of "),t.push(s(this.type)),t.push("s in this list not analysed in this widget: <a>"),t.push(s(this.notAnalysed)),t.push("</a></p>\n    ")):t.push("\n        <p>All items in your list have been analysed.</p>\n    "),t.push('\n\n    <div class="form">\n        <form style="margin:0">\n            <!-- extra.eco -->\n        </form>\n    </div>\n\n    <div class="actions" style="padding:10px 0">\n        <!-- chart.actions.eco -->\n    </div>\n</div>\n<div class="content"></div>')}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["enrichment.correction.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="group correction" style="display:inline-block;margin-right:10px;float:left;height:60px">\n    <label>Normalise by length <em class="badge badge-info" style="font-size:11px;font-family:serif;padding:1px 3px;border-radius:2px">i</em><div class="hjalp" style="padding:0"></div></label>\n\n    '),this.gene_length_correction?t.push('\n        <a class="btn btn-small active correction" style="float:right">Normalised</a>\n    '):t.push('\n        <a class="btn btn-small correction" style="float:right">Normalise</a>\n    '),t.push("\n\n    "),this.percentage_gene_length_not_null&&(t.push("\n    	"),t.push(s(this.percentage_gene_length_not_null)),t.push(' of genes in your list do not have a length and will be discarded, <a class="which" style="cursor:pointer">see which</a>.\n    ')),t.push("\n</div>")}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["enrichment.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="header">\n    <h3>'),this.title&&t.push(s(this.title)),t.push("</h3>\n    <p>"),this.description&&t.push(this.description),t.push("</p>\n    "),this.notAnalysed?(t.push("\n        <p>Number of "),t.push(s(this.type)),t.push("s in this list not analysed in this widget: <a>"),t.push(s(this.notAnalysed)),t.push("</a></p>\n    ")):t.push("\n        <p>All items in your list have been analysed.</p>\n    "),t.push('\n\n    <div class="form">\n        <!-- enrichment.form.eco -->\n    </div>\n\n    <div class="actions" style="padding:10px 0">\n        <!-- actions.eco -->\n    </div>\n</div>\n<div class="content">\n    <!-- enrichment.table.eco -->\n</div>')}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["enrichment.form.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,n,a,i,l,r,c,p;for(t.push('<form style="margin:0">\n    <div class="group" style="display:inline-block;margin-right:10px;float:left;height:60px">\n        <label>Test Correction</label>\n        <select name="errorCorrection" class="span2">\n            '),c=this.errorCorrections,a=0,l=c.length;l>a;a++)e=c[a],t.push('\n                <option value="'),t.push(s(e)),t.push('" '),this.options.errorCorrection===e&&t.push(s('selected="selected"')),t.push(">\n                    "),t.push(s(e)),t.push("\n            </option>\n            ");for(t.push('\n        </select>\n    </div>\n\n    <div class="group" style="display:inline-block;margin-right:10px;float:left;height:60px">\n        <label>Max p-value</label>\n        <select name="pValue" class="span2">\n            '),p=this.pValues,i=0,r=p.length;r>i;i++)n=p[i],t.push('\n                <option value="'),t.push(s(n)),t.push('" '),this.options.pValue===n&&t.push(s('selected="selected"')),t.push(">\n                    "),t.push(s(n)),t.push("\n                </option>\n            ");t.push('\n        </select>\n    </div>\n</form>\n<div style="clear:both"></div>')}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["enrichment.table.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<!-- actual fixed head -->\n<div class="head" style="display:table">\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;"><input type="checkbox" class="check" /></div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">'),t.push(s(this.label)),t.push('</div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;white-space:nowrap">p-Value <a href="http://intermine.readthedocs.org/en/latest/embedding/list-widgets/enrichment-widgets/" target="_blank" class="badge badge-info" style="font-size:11px;font-family:serif;padding:1px 3px;border-radius:2px;font-style:italic;color:#FFF!important">i</a></div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">Matches</div>\n    <div style="clear:both"></div>\n</div>\n<div class="wrapper" style="overflow:auto;overflow-x:hidden">\n    <table class="table table-striped">\n        <!-- head for proper cell width -->\n        <thead style="visibility:hidden">\n            <tr>\n                <th></th>\n                <th>'),t.push(s(this.label)),t.push("</th>\n                <th>p-Value</th>\n                <th>Matches</th>\n            </tr>\n        </thead>\n        <tbody>\n            <!-- loop enrichment.row.eco -->\n        </tbody>\n    </table>\n</div>")}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["enrichment.population.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="group background" style="display:inline-block;margin-right:10px;float:left;height:60px">\n    <label>Background population</label>\n    '),t.push(s(this.current)),t.push(' <a class="btn btn-small change">Change</a>\n\n    <div class="popover" style="position:absolute;top:0;right:0;z-index:1;display:none">\n        <div class="popover-inner">\n            <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n            <h4 class="popover-title">Change background population</h4>\n            <div class="popover-content">\n                <p style="margin-bottom:5px">\n                    '),this.loggedIn?t.push('\n                        <input type="checkbox" class="save" style="vertical-align:top" /> Save your preference for next time\n                    '):t.push("\n                        Login to save your preference for next time\n                    "),t.push('\n                </p>\n\n                <input type="text" class="filter" style="width:96%" placeholder="Filter..." />\n                \n                <div class="values" style="max-height:300px;overflow-y:auto">\n                    <!-- enrichment.populationlist.eco -->\n                </div>\n            </div>\n        </div>\n    </div>\n</div>')}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["enrichment.row.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<td class="check"><input type="checkbox" '),this.row.selected&&t.push('checked="checked"'),t.push(' /></td>\n<td class="description">\n    '),t.push(s(this.row.description)),t.push("\n    "),this.row.externalLink&&(t.push('\n        [<a href="'),t.push(this.row.externalLink),t.push('" target="_blank">'),t.push(s(this.row.identifier)),t.push("</a>]\n    ")),t.push('\n</td>\n<td class="pValue" style="white-space:nowrap">'),t.push(s(this.row["p-value"])),t.push('</td>\n<td class="matches">\n    <a class="count" style="cursor:pointer">'),t.push(s(this.row.matches)),t.push("</a>\n</td>")}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["table.table.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,n,a,i,l,c,r;for(t.push('<!-- actual fixed head -->\n<div class="head" style="display:table">\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;"><input type="checkbox" class="check" /></div>\n    '),c=this.columns,n=0,i=c.length;i>n;n++)e=c[n],t.push('\n        <div style="font-weight:bold;display:table-cell;padding:0 8px;">'),t.push(s(e)),t.push("</div>\n    ");for(t.push('\n    <div style="clear:both"></div>\n</div>\n<div class="wrapper" style="overflow:auto;overflow-x:hidden">\n    <table class="table table-striped">\n        <!-- head for proper cell width -->\n        <thead style="visibility:hidden">\n            <tr>\n                <th></th>\n                '),r=this.columns,a=0,l=r.length;l>a;a++)e=r[a],t.push("\n                    <th>"),t.push(s(e)),t.push("</th>\n                ");t.push("\n            </tr>\n        </thead>\n        <tbody>\n            <!-- loop table.row.eco -->\n        </tbody>\n    </table>\n</div>")}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["table.row.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,n,a,i;for(t.push('<td class="check"><input type="checkbox" '),this.row.selected&&t.push('checked="checked"'),t.push(" /></td>\n"),i=this.row.descriptions,n=0,a=i.length;a>n;n++)e=i[n],t.push("\n    <td>"),t.push(s(e)),t.push("</td>\n");t.push('\n<td class="matches">\n    <a class="count" style="cursor:pointer">'),t.push(s(this.row.matches)),t.push("</a>\n</td>")}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  JST["table.eco"]=function(e){e||(e={});var n,t=[],s=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},a=e.safe,i=e.escape;return n=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var n=new String(e);return n.ecoSafe=!0,n},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){t.push('<div class="header">\n    <h3>'),this.title&&t.push(s(this.title)),t.push("</h3>\n    <p>"),this.description&&t.push(this.description),t.push("</p>\n    "),this.notAnalysed?(t.push("\n        <p>Number of "),t.push(s(this.type)),t.push("s in this list not analysed in this widget: <a>"),t.push(s(this.notAnalysed)),t.push("</a></p>\n    ")):t.push("\n        <p>All items in your list have been analysed.</p>\n    "),t.push('\n\n    <div class="actions" style="padding:10px 0">\n        <!-- actions.eco -->\n    </div>\n</div>\n<div class="content">\n    <!-- table.table.eco -->\n</div>')}).call(this)}.call(e),e.safe=a,e.escape=i,t.join("")};
  /* Create file download with custom content.
  */
  
  var $, Exporter, PlainExporter, Widgets, factory, merge, type, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;
  
  Exporter = (function() {
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
  
  PlainExporter = (function() {
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
        var _ref;
  
        return (_ref = _this.msg) != null ? _ref.fadeOut() : void 0;
      };
      setTimeout(destroy, 5000);
    }
  
    return PlainExporter;
  
  })();
  
  /* Types in JS.
  */
  
  
  type = {};
  
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
  
  /* Merge properties of 2 dictionaries.
  */
  
  
  merge = function(child, parent) {
    var key;
  
    for (key in parent) {
      if (child[key] == null) {
        if (Object.prototype.hasOwnProperty.call(parent, key)) {
          child[key] = parent[key];
        }
      }
    }
    return child;
  };
  
  /* <IE9 does not have Array::indexOf, use MDC implementation.
  */
  
  
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
      var from, len;
  
      len = this.length >>> 0;
      from = Number(arguments[1]) || 0;
      from = (from < 0 ? Math.ceil(from) : Math.floor(from));
      if (from < 0) {
        from += len;
      }
      while (from < len) {
        if (from in this && this[from] === elt) {
          return from;
        }
        from++;
      }
      return -1;
    };
  }
  
  factory = function(Backbone) {
    /*
    InterMineWidget.coffee
    */
  
    /* Parent for all Widgets, handling templating, validation and errors.
    */
  
    var ChartPopoverView, ChartView, ChartWidget, CoreCollection, CoreModel, EnrichmentLengthCorrectionView, EnrichmentPopoverView, EnrichmentPopulationView, EnrichmentResults, EnrichmentRow, EnrichmentRowView, EnrichmentView, EnrichmentWidget, InterMineWidget, TablePopoverView, TableResults, TableRow, TableRowView, TableView, TableWidget, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
  
    InterMineWidget = (function() {
      function InterMineWidget() {
        this.queryRows = __bind(this.queryRows, this);
        this.error = __bind(this.error, this);
        this.validateType = __bind(this.validateType, this);
        this.template = __bind(this.template, this);
        var _this = this;
  
        this.log = this.log || [];
        this.log.push('Creating wrapping element');
        $(this.el).html($('<div/>', {
          'class': "inner",
          'style': "height:572px;overflow:hidden;position:relative"
        }));
        this.el = "" + this.el + " div.inner";
        this.log.push('Initializing InterMine Service');
        this._service = new intermine.Service({
          'root': this.service,
          'token': this.token
        });
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
  
      InterMineWidget.prototype.template = function(name, context) {
        var _name;
  
        if (context == null) {
          context = {};
        }
        this.log.push("Get eco template `" + name + "`");
        return typeof JST[_name = "" + name + ".eco"] === "function" ? JST[_name](context) : void 0;
      };
  
      InterMineWidget.prototype.validateType = function(object, spec) {
        var fails, key, r, value;
  
        this.log.push('Validating ' + JSON.stringify(object));
        fails = [];
        for (key in object) {
          value = object[key];
          r = typeof spec[key] === "function" ? new spec[key](value) : void 0;
          if (r && !r.is()) {
            fails.push(this.template("invalidjsonkey", {
              key: key,
              actual: r.is(),
              expected: new String(r)
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
        $(this.el).html(this.template("error", opts));
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
        var service;
  
        this.log.push('Querying for rows');
        service = this._service;
        return async.waterfall([
          function(cb) {
            return service.query(query, function(q) {
              return cb(null, q);
            });
          }, function(q, cb) {
            return q.rows(function(response) {
              return cb(null, response);
            });
          }
        ], function(err, response) {
          return cb(response);
        });
      };
  
      return InterMineWidget;
  
    })();
    /*
    ChartWidget.coffee
    */
  
    /* Chart Widget main class.
    */
  
    ChartWidget = (function(_super) {
      __extends(ChartWidget, _super);
  
      ChartWidget.prototype.widgetOptions = {
        "title": true,
        "description": true,
        matchCb: function(id, type) {
          return typeof console !== "undefined" && console !== null ? console.log(id, type) : void 0;
        },
        resultsCb: function(pq) {
          return typeof console !== "undefined" && console !== null ? console.log(pq) : void 0;
        },
        listCb: function(pq) {
          return typeof console !== "undefined" && console !== null ? console.log(pq) : void 0;
        }
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
  
      function ChartWidget(service, token, id, bagName, el, widgetOptions) {
        this.service = service;
        this.token = token;
        this.id = id;
        this.bagName = bagName;
        this.el = el;
        if (widgetOptions == null) {
          widgetOptions = {};
        }
        this.render = __bind(this.render, this);
        this.widgetOptions = merge(widgetOptions, this.widgetOptions);
        this.log = [];
        ChartWidget.__super__.constructor.call(this);
        this.render();
      }
  
      ChartWidget.prototype.render = function() {
        var data, key, timeout, value, _ref1, _ref2,
          _this = this;
  
        timeout = window.setTimeout((function() {
          return $(_this.el).append(_this.loading = $(_this.template('loading')));
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
                "template": _this.template,
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
    /*
    EnrichmentWidget.coffee
    */
  
    /* Enrichment Widget main class.
    */
  
    EnrichmentWidget = (function(_super) {
      __extends(EnrichmentWidget, _super);
  
      EnrichmentWidget.prototype.widgetOptions = {
        "title": true,
        "description": true,
        matchCb: function(id, type) {
          return typeof console !== "undefined" && console !== null ? console.log(id, type) : void 0;
        },
        resultsCb: function(pq) {
          return typeof console !== "undefined" && console !== null ? console.log(pq) : void 0;
        },
        listCb: function(pq) {
          return typeof console !== "undefined" && console !== null ? console.log(pq) : void 0;
        }
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
      @param {string} service http://aragorn.flymine.org:8080/flymine/service/
      @param {string} token Token for accessing user's lists
      @param {Array} lists All lists that we have access to
      @param {string} id widgetId
      @param {string} bagName myBag
      @param {string} el #target
      @param {object} widgetOptions { "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} } }
      */
  
  
      function EnrichmentWidget(service, token, lists, id, bagName, el, widgetOptions) {
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
        this.widgetOptions = merge(widgetOptions, this.widgetOptions);
        this.formOptions = {
          errorCorrection: "Holm-Bonferroni",
          pValue: "0.05"
        };
        this.log = [];
        EnrichmentWidget.__super__.constructor.call(this);
        this.render();
      }
  
      EnrichmentWidget.prototype.render = function() {
        var data, key, timeout, value, _ref1, _ref2,
          _this = this;
  
        timeout = window.setTimeout((function() {
          return $(_this.el).append(_this.loading = $(_this.template('loading')));
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
    /*
    TableWidget.coffee
    */
  
    /* Table Widget main class.
    */
  
    TableWidget = (function(_super) {
      __extends(TableWidget, _super);
  
      TableWidget.prototype.widgetOptions = {
        "title": true,
        "description": true,
        matchCb: function(id, type) {
          return typeof console !== "undefined" && console !== null ? console.log(id, type) : void 0;
        },
        resultsCb: function(pq) {
          return typeof console !== "undefined" && console !== null ? console.log(pq) : void 0;
        },
        listCb: function(pq) {
          return typeof console !== "undefined" && console !== null ? console.log(pq) : void 0;
        }
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
  
      function TableWidget(service, token, id, bagName, el, widgetOptions) {
        this.service = service;
        this.token = token;
        this.id = id;
        this.bagName = bagName;
        this.el = el;
        if (widgetOptions == null) {
          widgetOptions = {};
        }
        this.render = __bind(this.render, this);
        this.widgetOptions = merge(widgetOptions, this.widgetOptions);
        this.log = [];
        TableWidget.__super__.constructor.call(this);
        this.render();
      }
  
      TableWidget.prototype.render = function() {
        var data, timeout, _ref1,
          _this = this;
  
        timeout = window.setTimeout((function() {
          return $(_this.el).append(_this.loading = $(_this.template('loading')));
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
                "template": _this.template,
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
    /*
    views/EnrichmentPopoverView.coffee
    */
  
    /* Enrichment Widget table row matches box.
    */
  
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
        this.render = __bind(this.render, this);      _ref1 = EnrichmentPopoverView.__super__.constructor.apply(this, arguments);
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
        $(this.el).html(this.template("popover", {
          "description": this.description,
          "descriptionLimit": this.descriptionLimit,
          "style": this.style || "width:300px;margin-left:-300px"
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
        $(this.el).find('div.values').html(this.template('popover.values', {
          'values': values,
          'type': this.response.type,
          'valuesLimit': this.valuesLimit,
          'size': this.size
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
    /*
    views/EnrichmentView.coffee
    */
  
    /* View maintaining Enrichment Widget.
    */
  
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
        this.renderToolbar = __bind(this.renderToolbar, this);      _ref2 = EnrichmentView.__super__.constructor.apply(this, arguments);
        return _ref2;
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
        this.collection = new EnrichmentResults();
        this.collection.bind('change', this.renderToolbar);
        return this.render();
      };
  
      EnrichmentView.prototype.render = function() {
        var extraAttribute, opts;
  
        $(this.el).html(this.template("enrichment", {
          "title": this.options.title ? this.response.title : "",
          "description": this.options.description ? this.response.description : "",
          "notAnalysed": this.response.notAnalysed,
          "type": this.response.type
        }));
        $(this.el).find("div.form").html(this.template("enrichment.form", {
          "options": this.form.options,
          "pValues": this.form.pValues,
          "errorCorrections": this.form.errorCorrections
        }));
        if (this.response.filterLabel != null) {
          $(this.el).find('div.form form').append(this.template("extra", {
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
            opts = merge(extraAttribute.gene_length, {
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
          $(this.el).find("div.content").html($(this.template("noresults", {
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
        return $(this.el).find("div.actions").html($(this.template("actions")));
      };
  
      EnrichmentView.prototype.renderTable = function() {
        var height, i, table, _fn, _i, _ref3,
          _this = this;
  
        $(this.el).find("div.content").html($(this.template("enrichment.table", {
          "label": this.response.label
        })));
        table = $(this.el).find("div.content table");
        _fn = function(i) {
          var data, row;
  
          data = _this.response.results[i];
          if (_this.response.externalLink) {
            data.externalLink = _this.response.externalLink + data.identifier;
          }
          row = new EnrichmentRow(data, _this.widget);
          return _this.collection.add(row);
        };
        for (i = _i = 0, _ref3 = this.response.results.length; 0 <= _ref3 ? _i < _ref3 : _i > _ref3; i = 0 <= _ref3 ? ++_i : --_i) {
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
        var fragment, row, _i, _len, _ref3;
  
        fragment = document.createDocumentFragment();
        _ref3 = this.collection.models;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          row = _ref3[_i];
          fragment.appendChild(new EnrichmentRowView({
            "model": row,
            "template": this.template,
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
            result.push([model.get('description'), model.get('p-value')].join("\t") + "\t" + dict[model.get('identifier')].join(','));
          }
          if (result.length) {
            try {
              return new Exporter(result.join("\n"), "" + _this.widget.bagName + " " + _this.widget.id + ".tsv");
            } catch (_error) {
              TypeError = _error;
              return new PlainExporter($(e.target), result.join("\n"));
            }
          }
        });
      };
  
      EnrichmentView.prototype.viewAction = function() {
        var descriptions, model, rowIdentifiers, selected, _i, _len, _ref3;
  
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
          if ((_ref3 = this.popoverView) != null) {
            _ref3.remove();
          }
          return $(this.el).find('div.actions').after((this.popoverView = new EnrichmentPopoverView({
            "identifiers": rowIdentifiers,
            "description": descriptions.join(', '),
            "template": this.template,
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
    /*
    views/EnrichmentLengthCorrectionView.coffee
    */
  
    /* Enrichment Widget gene length correction.
    */
  
    EnrichmentLengthCorrectionView = (function(_super) {
      __extends(EnrichmentLengthCorrectionView, _super);
  
      function EnrichmentLengthCorrectionView() {
        this.seeWhich = __bind(this.seeWhich, this);
        this.toggleCull = __bind(this.toggleCull, this);
        this.hideHelp = __bind(this.hideHelp, this);
        this.showHelp = __bind(this.showHelp, this);
        this.render = __bind(this.render, this);      _ref3 = EnrichmentLengthCorrectionView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }
  
      EnrichmentLengthCorrectionView.prototype.help = "Depending on the type of experiment your data comes from, it is sometimes \nnecessary to normalize by gene length in order to get the correct p-values. \nIf your data comes from a genome-wide binding experiment such as ChIP-seq \nor DamID, binding intervals are more likely to be associated with longer \ngenes than shorter ones, and you should therefore normalize by gene length. \nThis is not the case for experiments such as gene expression studies, where \ngene length does not play a role in the likelihood that a particular set of \ngenes will be overrepresented in the list.";
  
      EnrichmentLengthCorrectionView.prototype.events = {
        'click .correction a.correction': 'toggleCull',
        'click .correction a.which': 'seeWhich',
        'hover .correction label .badge': 'showHelp',
        'click .correction a.close': 'hideHelp'
      };
  
      EnrichmentLengthCorrectionView.prototype.initialize = function(o) {
        var k, v;
  
        for (k in o) {
          v = o[k];
          this[k] = v;
        }
        if (this.gene_length_correction !== null) {
          return this.render();
        }
      };
  
      EnrichmentLengthCorrectionView.prototype.render = function() {
        $(this.el).append(this.widget.template("enrichment.correction", this));
        return this;
      };
  
      EnrichmentLengthCorrectionView.prototype.showHelp = function() {
        return $(this.el).find('.hjalp').html(this.widget.template("popover.help", {
          "title": 'What does "Normalise by length" mean?',
          "text": this.help
        }));
      };
  
      EnrichmentLengthCorrectionView.prototype.hideHelp = function() {
        return $(this.el).find('.hjalp').empty();
      };
  
      EnrichmentLengthCorrectionView.prototype.toggleCull = function(e) {
        var el;
  
        (el = $(e.target)).toggleClass('active').text(function() {
          if (el.hasClass('active')) {
            return 'Normalised';
          } else {
            return 'Normalise';
          }
        });
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
    /*
    views/ChartView.coffee
    */
  
    /* View maintaining Chart Widget.
    */
  
    ChartView = (function(_super) {
      __extends(ChartView, _super);
  
      function ChartView() {
        this.formAction = __bind(this.formAction, this);
        this.viewSeriesAction = __bind(this.viewSeriesAction, this);
        this.viewAllAction = __bind(this.viewAllAction, this);
        this.viewBarsAction = __bind(this.viewBarsAction, this);
        this.viewBarAction = __bind(this.viewBarAction, this);
        this.keypressAction = __bind(this.keypressAction, this);
        this.renderToolbar = __bind(this.renderToolbar, this);      _ref4 = ChartView.__super__.constructor.apply(this, arguments);
        return _ref4;
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
  
        $(this.el).html(this.template("chart", {
          "title": this.options.title ? this.response.title : "",
          "description": this.options.description ? this.response.description : "",
          "notAnalysed": this.response.notAnalysed,
          "type": this.response.type
        }));
        if (this.response.filterLabel != null) {
          $(this.el).find('div.form form').append(this.template("extra", {
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
          $(this.el).find("div.content").html($(this.template("noresults", {
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
        return $(this.el).find("div.actions").html($(this.template("chart.actions")));
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
        var column, description, quickPq, resultsPq, row, selection, _ref5;
  
        if (this.barView != null) {
          this.barView.close();
        }
        selection = chart.getSelection()[0];
        if (this.multiselect) {
          if ((_ref5 = this.selection) == null) {
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
                "template": this.template,
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
        var a, b, bag, category, code, constraint, constraints, field, getConstraint, i, orLogic, pq, selection, series, _i, _len, _ref5;
  
        pq = JSON.parse(this.response.pathQuery);
        _ref5 = pq.where;
        for (i in _ref5) {
          field = _ref5[i];
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
        if (code > 66) {
          return this.options.resultsCb(pq);
        }
      };
  
      ChartView.prototype.viewAllAction = function() {
        var field, i, pq, rem, _i, _len, _ref5, _ref6;
  
        pq = JSON.parse(this.response.pathQuery);
        _ref5 = ['%category', '%series'];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          rem = _ref5[_i];
          _ref6 = pq.where;
          for (i in _ref6) {
            field = _ref6[i];
            if ((field != null ? field.value : void 0) === rem) {
              pq.where.splice(i, 1);
              break;
            }
          }
        }
        return this.options.resultsCb(pq);
      };
  
      ChartView.prototype.viewSeriesAction = function(pathQuery) {
        var field, i, pq, _ref5;
  
        pq = JSON.parse(pathQuery);
        _ref5 = pq.where;
        for (i in _ref5) {
          field = _ref5[i];
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
    /*
    views/TableRowView.coffee
    */
  
    /* Table Widget table row.
    */
  
    TableRowView = (function(_super) {
      __extends(TableRowView, _super);
  
      function TableRowView() {
        this.toggleMatchesAction = __bind(this.toggleMatchesAction, this);
        this.selectAction = __bind(this.selectAction, this);
        this.render = __bind(this.render, this);      _ref5 = TableRowView.__super__.constructor.apply(this, arguments);
        return _ref5;
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
        $(this.el).html(this.template("table.row", {
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
            "template": this.template,
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
    /*
    views/ChartPopoverView.coffee
    */
  
    /* Chart Widget bar onclick box.
    */
  
    ChartPopoverView = (function(_super) {
      __extends(ChartPopoverView, _super);
  
      function ChartPopoverView() {
        this.close = __bind(this.close, this);
        this.listAction = __bind(this.listAction, this);
        this.resultsAction = __bind(this.resultsAction, this);
        this.matchAction = __bind(this.matchAction, this);
        this.renderValues = __bind(this.renderValues, this);
        this.render = __bind(this.render, this);      _ref6 = ChartPopoverView.__super__.constructor.apply(this, arguments);
        return _ref6;
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
        $(this.el).html(this.template("popover", {
          "description": this.description,
          "descriptionLimit": this.descriptionLimit,
          "style": 'width:300px'
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
        return $(this.el).find('div.values').html(this.template('popover.values', {
          'values': values,
          'type': this.type,
          'valuesLimit': this.valuesLimit,
          'size': values.length
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
    /*
    views/TableView.coffee
    */
  
    /* View maintaining Table Widget.
    */
  
    TableView = (function(_super) {
      __extends(TableView, _super);
  
      function TableView() {
        this.viewAction = __bind(this.viewAction, this);
        this.exportAction = __bind(this.exportAction, this);
        this.selectAllAction = __bind(this.selectAllAction, this);
        this.renderTableBody = __bind(this.renderTableBody, this);
        this.renderTable = __bind(this.renderTable, this);
        this.renderToolbar = __bind(this.renderToolbar, this);      _ref7 = TableView.__super__.constructor.apply(this, arguments);
        return _ref7;
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
        this.collection = new TableResults();
        this.collection.bind('change', this.renderToolbar);
        return this.render();
      };
  
      TableView.prototype.render = function() {
        $(this.el).html(this.template("table", {
          "title": this.options.title ? this.response.title : "",
          "description": this.options.description ? this.response.description : "",
          "notAnalysed": this.response.notAnalysed,
          "type": this.response.type
        }));
        if (this.response.results.length > 0) {
          this.renderToolbar();
          this.renderTable();
        } else {
          $(this.el).find("div.content").html($(this.template("noresults", {
            'text': "No \"" + this.response.title + "\" with your list."
          })));
        }
        this.widget.fireEvent({
          'class': 'TableView',
          'event': 'rendered'
        });
        return this;
      };
  
      TableView.prototype.renderToolbar = function() {
        return $(this.el).find("div.actions").html($(this.template("actions")));
      };
  
      TableView.prototype.renderTable = function() {
        var height, i, table, _fn, _i, _ref8,
          _this = this;
  
        $(this.el).find("div.content").html($(this.template("table.table", {
          "columns": this.response.columns.split(',')
        })));
        table = $(this.el).find("div.content table");
        _fn = function(i) {
          var row;
  
          row = new TableRow(_this.response.results[i], _this.widget);
          return _this.collection.add(row);
        };
        for (i = _i = 0, _ref8 = this.response.results.length; 0 <= _ref8 ? _i < _ref8 : _i > _ref8; i = 0 <= _ref8 ? ++_i : --_i) {
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
        var fragment, row, _i, _len, _ref8;
  
        fragment = document.createDocumentFragment();
        _ref8 = this.collection.models;
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          row = _ref8[_i];
          fragment.appendChild(new TableRowView({
            "model": row,
            "template": this.template,
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
            return new Exporter(result.join("\n"), "" + this.widget.bagName + " " + this.widget.id + ".tsv");
          } catch (_error) {
            TypeError = _error;
            return new PlainExporter($(e.target), result.join("\n"));
          }
        }
      };
  
      TableView.prototype.viewAction = function() {
        var descriptions, model, rowIdentifiers, selected, _i, _len, _ref8;
  
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
          if ((_ref8 = this.popoverView) != null) {
            _ref8.remove();
          }
          return $(this.el).find('div.actions').after((this.popoverView = new TablePopoverView({
            "identifiers": rowIdentifiers,
            "description": descriptions.join(', '),
            "template": this.template,
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
    /*
    views/TablePopoverView.coffee
    */
  
    /* Table Widget table row matches box.
    */
  
    TablePopoverView = (function(_super) {
      __extends(TablePopoverView, _super);
  
      function TablePopoverView() {
        this.toggle = __bind(this.toggle, this);
        this.adjustPopover = __bind(this.adjustPopover, this);
        this.listAction = __bind(this.listAction, this);
        this.resultsAction = __bind(this.resultsAction, this);
        this.matchAction = __bind(this.matchAction, this);
        this.renderValues = __bind(this.renderValues, this);
        this.render = __bind(this.render, this);      _ref8 = TablePopoverView.__super__.constructor.apply(this, arguments);
        return _ref8;
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
        $(this.el).html(this.template('popover', {
          'description': this.description,
          'descriptionLimit': this.descriptionLimit,
          'style': this.style || "width:300px;margin-left:-300px"
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
        $(this.el).find('div.values').html(this.template('popover.values', {
          'values': values,
          'type': this.type,
          'valuesLimit': this.valuesLimit,
          'size': this.size
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
    /*
    views/EnrichmentRowView.coffee
    */
  
    /* Enrichment Widget table row.
    */
  
    EnrichmentRowView = (function(_super) {
      __extends(EnrichmentRowView, _super);
  
      function EnrichmentRowView() {
        this.toggleMatchesAction = __bind(this.toggleMatchesAction, this);
        this.selectAction = __bind(this.selectAction, this);
        this.render = __bind(this.render, this);      _ref9 = EnrichmentRowView.__super__.constructor.apply(this, arguments);
        return _ref9;
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
        $(this.el).html(this.template("enrichment.row", {
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
            "template": this.template,
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
    /*
    models/CoreModel.coffee
    */
  
    /* Core Model for Enrichment and Table Models.
    */
  
    CoreModel = (function(_super) {
      __extends(CoreModel, _super);
  
      function CoreModel() {
        this.toggleSelected = __bind(this.toggleSelected, this);
        this.validate = __bind(this.validate, this);      _ref10 = CoreModel.__super__.constructor.apply(this, arguments);
        return _ref10;
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
        _ref11 = CoreCollection.__super__.constructor.apply(this, arguments);
        return _ref11;
      }
  
      CoreCollection.prototype.model = CoreModel;
  
      CoreCollection.prototype.selected = function() {
        return this.filter(function(row) {
          return row.get("selected");
        });
      };
  
      CoreCollection.prototype.toggleSelected = function() {
        var model, _i, _j, _len, _len1, _ref12, _ref13, _results, _results1;
  
        if (this.models.length - this.selected().length) {
          _ref12 = this.models;
          _results = [];
          for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
            model = _ref12[_i];
            _results.push(model.set({
              "selected": true
            }, {
              'silent': true
            }));
          }
          return _results;
        } else {
          _ref13 = this.models;
          _results1 = [];
          for (_j = 0, _len1 = _ref13.length; _j < _len1; _j++) {
            model = _ref13[_j];
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
    /* Models underpinning Enrichment Widget results.
    */
  
    EnrichmentRow = (function(_super) {
      __extends(EnrichmentRow, _super);
  
      function EnrichmentRow() {
        _ref12 = EnrichmentRow.__super__.constructor.apply(this, arguments);
        return _ref12;
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
        _ref13 = EnrichmentResults.__super__.constructor.apply(this, arguments);
        return _ref13;
      }
  
      EnrichmentResults.prototype.model = EnrichmentRow;
  
      return EnrichmentResults;
  
    })(CoreCollection);
    /* Models underpinning Table Widget results.
    */
  
    TableRow = (function(_super) {
      __extends(TableRow, _super);
  
      function TableRow() {
        _ref14 = TableRow.__super__.constructor.apply(this, arguments);
        return _ref14;
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
        _ref15 = TableResults.__super__.constructor.apply(this, arguments);
        return _ref15;
      }
  
      TableResults.prototype.model = TableRow;
  
      return TableResults;
  
    })(CoreCollection);
    /*
    views/EnrichmentPopulationView.coffee
    */
  
    /* Enrichment Widget background population selection box.
    */
  
    EnrichmentPopulationView = (function(_super) {
      __extends(EnrichmentPopulationView, _super);
  
      function EnrichmentPopulationView() {
        this.selectListAction = __bind(this.selectListAction, this);
        this.filterAction = __bind(this.filterAction, this);
        this.toggleAction = __bind(this.toggleAction, this);
        this.renderLists = __bind(this.renderLists, this);
        this.render = __bind(this.render, this);      _ref16 = EnrichmentPopulationView.__super__.constructor.apply(this, arguments);
        return _ref16;
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
        $(this.el).append(this.widget.template("enrichment.population", {
          'current': this.current != null ? this.current : 'Default',
          'loggedIn': this.loggedIn
        }));
        this.renderLists(this.lists);
        return this;
      };
  
      EnrichmentPopulationView.prototype.renderLists = function(lists) {
        return $(this.el).find('div.values').html(this.widget.template("enrichment.populationlist", {
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
              var _i, _len, _ref17, _results;
  
              _ref17 = this.lists;
              _results = [];
              for (_i = 0, _len = _ref17.length; _i < _len; _i++) {
                l = _ref17[_i];
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
    return {
      'ChartWidget': ChartWidget,
      'EnrichmentWidget': EnrichmentWidget,
      'InterMineWidget': InterMineWidget,
      'TableWidget': TableWidget,
      'EnrichmentPopoverView': EnrichmentPopoverView,
      'EnrichmentView': EnrichmentView,
      'EnrichmentLengthCorrectionView': EnrichmentLengthCorrectionView,
      'ChartView': ChartView,
      'TableRowView': TableRowView,
      'ChartPopoverView': ChartPopoverView,
      'TableView': TableView,
      'TablePopoverView': TablePopoverView,
      'EnrichmentRowView': EnrichmentRowView,
      'CoreModel': CoreModel,
      'EnrichmentPopulationView': EnrichmentPopulationView
    };
  };
  
  /* Interface to InterMine Widgets.
  */
  
  
  $ = window.jQuery || window.Zepto;
  
  Widgets = (function() {
    Widgets.prototype.VERSION = '1.12.8';
  
    Widgets.prototype.wait = true;
  
    Widgets.prototype.resources = {
      'css': {
        'Bootstrap': {
          'path': 'http://cdn.intermine.org/css/bootstrap/2.0.4-prefixed-no-icons/css/bootstrap.min.css'
        }
      },
      'js': {
        'JSON': {
          'path': 'http://cdn.intermine.org/js/json3/3.2.2/json3.min.js'
        },
        'setImmediate': {
          'path': 'http://cdn.intermine.org/js/setImmediate/1.0.1/setImmediate.min.js'
        },
        'async': {
          'path': 'http://cdn.intermine.org/js/async/0.2.6/async.min.js',
          'depends': ['setImmediate']
        },
        'jQuery': {
          'path': 'http://cdn.intermine.org/js/jquery/1.9.1/jquery-1.9.1.min.js'
        },
        '_': {
          'path': 'http://cdn.intermine.org/js/underscore.js/1.3.3/underscore-min.js'
        },
        'Backbone': {
          'path': 'http://cdn.intermine.org/js/backbone.js/1.0.0/backbone-min.js',
          'depends': ['jQuery', '_']
        },
        'google': {
          'path': 'https://www.google.com/jsapi'
        },
        'intermine.imjs': {
          'path': 'http://cdn.intermine.org/js/intermine/imjs/2.6.0/im.js',
          'depends': ['jQuery', '_']
        },
        'FileSaver': {
          'path': 'http://cdn.intermine.org/js/filesaver.js/FileSaver.min.js'
        }
      }
    };
  
    /*
    New Widgets client.
    @param {string} service A string pointing to service endpoint e.g. http://aragorn:8080/flymine/service/
    @param {string} token A string for accessing user's lists.
    or
    @param {Object} opts Config just like imjs consumes e.g. `{ "root": "", "token": "" }`
    */
  
  
    function Widgets() {
      var done, opts,
        _this = this;
  
      opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (typeof opts[0] === 'string') {
        this.service = opts[0];
        this.token = opts[1] || '';
      } else {
        if (opts[0].root != null) {
          this.service = opts[0].root;
        } else {
          throw Error('You need to set the `root` parameter pointing to the mine\'s service');
        }
        this.token = opts[0].token || '';
      }
      done = function(err) {
        if (err) {
          throw err;
        }
        $ = window.jQuery;
        __extends(o, factory(window.Backbone));
        return _this.wait = false;
      };
      if (opts[0].skipDeps) {
        done();
      } else {
        intermine.load(this.resources, done);
      }
    }
  
    /*
    Chart Widget.
    @param {string} id Represents a widget identifier as represented in webconfig-model.xml
    @param {string} bagName List name to use with this Widget.
    @param {jQuery selector} el Where to render the Widget to.
    @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
    */
  
  
    Widgets.prototype.chart = function() {
      var opts, wait,
        _this = this;
  
      opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (wait = function() {
        if (_this.wait) {
          return setTimeout(wait, 20);
        }
        return google.load('visualization', '1.0', {
          packages: ['corechart'],
          callback: function() {
            return (function(func, args, ctor) {
              ctor.prototype = func.prototype;
              var child = new ctor, result = func.apply(child, args);
              return Object(result) === result ? result : child;
            })(o.ChartWidget, [_this.service, _this.token].concat(__slice.call(opts)), function(){});
          }
        });
      })();
    };
  
    /*
    Enrichment Widget.
    @param {string} id Represents a widget identifier as represented in webconfig-model.xml
    @param {string} bagName List name to use with this Widget.
    @param {jQuery selector} el Where to render the Widget to.
    @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
    */
  
  
    Widgets.prototype.enrichment = function() {
      var opts, wait,
        _this = this;
  
      opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (wait = function() {
        if (_this.wait) {
          return setTimeout(wait, 20);
        }
        if (_this.lists != null) {
          return (function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(o.EnrichmentWidget, [_this.service, _this.token, _this.lists].concat(__slice.call(opts)), function(){});
        } else {
          _this.wait = true;
          return $.ajax({
            'url': "" + _this.service + "lists?token=" + _this.token + "&format=json",
            'dataType': 'jsonp',
            success: function(data) {
              if (data.statusCode !== 200 && (data.lists == null)) {
                return $(opts[2]).html($('<div/>', {
                  'class': "alert alert-error",
                  'html': "Problem fetching lists we have access to <a href='" + _this.service + "lists'>" + _this.service + "lists</a>"
                }));
              } else {
                _this.lists = data.lists;
                _this.wait = false;
                return (function(func, args, ctor) {
                  ctor.prototype = func.prototype;
                  var child = new ctor, result = func.apply(child, args);
                  return Object(result) === result ? result : child;
                })(o.EnrichmentWidget, [_this.service, _this.token, _this.lists].concat(__slice.call(opts)), function(){});
              }
            },
            error: function(xhr, opts, err) {
              return $(opts[2]).html($('<div/>', {
                'class': "alert alert-error",
                'html': "" + xhr.statusText + " for <a href='" + _this.service + "widgets'>" + _this.service + "widgets</a>"
              }));
            }
          });
        }
      })();
    };
  
    /*
    Table Widget.
    @param {string} id Represents a widget identifier as represented in webconfig-model.xml
    @param {string} bagName List name to use with this Widget.
    @param {jQuery selector} el Where to render the Widget to.
    @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
    */
  
  
    Widgets.prototype.table = function() {
      var opts, wait,
        _this = this;
  
      opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (wait = function() {
        if (_this.wait) {
          return setTimeout(wait, 20);
        }
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(o.TableWidget, [_this.service, _this.token].concat(__slice.call(opts)), function(){});
      })();
    };
  
    /*
    All available List Widgets.
    @param {string} type Class of objects e.g. Gene, Protein.
    @param {string} bagName List name to use with this Widget.
    @param {jQuery selector} el Where to render the Widget to.
    @param {Object} widgetOptions `{ "title": true/false, "description": true/false, "matchCb": function(id, type) {}, "resultsCb": function(pq) {}, "listCb": function(pq) {} }`
    */
  
  
    Widgets.prototype.all = function(type, bagName, el, widgetOptions) {
      var wait,
        _this = this;
  
      if (type == null) {
        type = "Gene";
      }
      return (wait = function() {
        if (_this.wait) {
          return setTimeout(wait, 20);
        }
        return $.ajax({
          'url': "" + _this.service + "widgets",
          'dataType': 'jsonp',
          success: function(response) {
            var widget, widgetEl, _i, _len, _ref1, _results;
  
            if (response.widgets) {
              _ref1 = response.widgets;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                widget = _ref1[_i];
                if (!(__indexOf.call(widget.targets, type) >= 0)) {
                  continue;
                }
                widgetEl = widget.name.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase();
                $(el).append($('<div/>', {
                  'id': widgetEl,
                  'class': "widget span6"
                }));
                switch (widget.widgetType) {
                  case "chart":
                    _results.push(_this.chart(widget.name, bagName, "" + el + " #" + widgetEl, widgetOptions));
                    break;
                  case "enrichment":
                    _results.push(_this.enrichment(widget.name, bagName, "" + el + " #" + widgetEl, widgetOptions));
                    break;
                  case "table":
                    _results.push(_this.table(widget.name, bagName, "" + el + " #" + widgetEl, widgetOptions));
                    break;
                  default:
                    _results.push(void 0);
                }
              }
              return _results;
            }
          },
          error: function(xhr, opts, err) {
            return $(el).html($('<div/>', {
              'class': "alert alert-error",
              'html': "" + xhr.statusText + " for <a href='" + _this.service + "widgets'>" + _this.service + "widgets</a>"
            }));
          }
        });
      })();
    };
  
    return Widgets;
  
  })();
  
  if (!window.intermine && window.intermine.load) {
    throw 'You need to include the InterMine API Loader first!';
  } else {
    window.intermine.widgets = Widgets;
  }
  
}).call(this);