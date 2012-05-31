(function() {
var o = {};

var JST = {};
JST["error.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="alert alert-block">\n    <h4 class="alert-heading">'),b.push(d(this.title)),b.push(" for "),b.push(d(this.name)),b.push("</h4>\n    <p>"),b.push(this.text),b.push("</p>\n</div>")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["actions.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<a class="btn btn-small '),this.disabled&&b.push("disabled"),b.push(' view">View</a>\n<a class="btn btn-small '),this.disabled&&b.push("disabled"),b.push(' export">Download</a>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["extra.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var a,c,e,f;b.push('<div class="group" style="display:inline-block;margin:0 5px 10px 0;float:left">\n    <label>'),b.push(d(this.label)),b.push("</label>\n    ");if(this.possible.length>1){b.push('\n        <select name="'),b.push(d(this.label)),b.push('" class="span2">\n            '),f=this.possible;for(c=0,e=f.length;c<e;c++)a=f[c],b.push('\n                <option value="'),b.push(d(a)),b.push('" '),this.selected===a&&b.push(d('selected="selected"')),b.push(">\n                    "),b.push(d(a)),b.push("\n                </option>\n            ");b.push("\n        </select>\n    ")}else b.push("\n        "),b.push(d(this.possible[0])),b.push("\n    ");b.push('\n</div>\n<div style="clear:both"></div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["noresults.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="alert alert-info">\n    <p>The Widget has no results.</p>\n</div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["loading.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="loading" style="background:rgba(255,255,255,0.9);position:absolute;top:0;left:0;height:100%;width:100%;text-align:center;">\n    <p style="padding-top:50%;font-weight:bold;">Loading &hellip;</p>\n</div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["invalidjsonkey.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<li style="vertical-align:bottom">\n    <span style="display:inline-block" class="label label-important">'),b.push(d(this.key)),b.push("</span> is "),b.push(d(this.actual)),b.push("; was expecting "),b.push(d(this.expected)),b.push("\n</li>")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["popover.values.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var a,c,e,f;b.push("<h4>"),b.push(d(this.values.length)),b.push(" "),b.push(d(this.type)),this.values.length!==1&&b.push(d("s")),b.push(":</h4>\n\n"),f=this.values.slice(0,this.valuesLimit-1+1||9e9);for(c=0,e=f.length;c<e;c++)a=f[c],b.push('\n    <a href="#" class="match">'),b.push(d(a)),b.push("</a>\n");b.push("\n"),this.values.length>this.valuesLimit&&b.push("&hellip;")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["popover.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="popover" style="position:absolute;top:5px;right:0;z-index:1;display:block">\n    <div class="popover-inner" style="'),b.push(d(this.style)),b.push('">\n        <a style="cursor:pointer;margin:2px 5px 0 0" class="close">×</a>\n        <h3 class="popover-title">\n            '),b.push(d(this.description.slice(0,this.descriptionLimit-1+1||9e9))),b.push("\n            "),this.description.length>this.descriptionLimit&&b.push("&hellip;"),b.push('\n        </h3>\n        <div class="popover-content">\n            <div class="values">\n                <!-- popover.values.eco -->\n            </div>\n            <div style="margin-top:10px">\n                <a class="btn btn-small btn-primary results">View results</a>\n                <a class="btn btn-small list disabled">Create list</a>\n            </div>\n        </div>\n    </div>\n</div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["chart.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="header">\n    <h3>'),this.title&&b.push(d(this.title)),b.push('</h3>\n    <p style="margin:0">'),this.description&&b.push(this.description),b.push("</p>\n    "),this.notAnalysed&&(b.push('\n        <p style="margin:10px 0 0 0">Number of Genes in this list not analysed in this widget: <a>'),b.push(d(this.notAnalysed)),b.push("</a></p>\n    ")),b.push('\n\n    <div class="form">\n        <form style="margin:0;padding:10px 0 0 0">\n            <!-- extra.eco -->\n        </form>\n    </div>\n</div>\n<div class="content">\n    <div class="settings"></div>\n    <div class="legend"></div>\n    <div class="chart"></div>\n</div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["enrichment.row.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<td class="check"><input type="checkbox" '),this.row.selected&&b.push('checked="checked"'),b.push(' /></td>\n<td class="description">\n    '),b.push(d(this.row.description)),b.push("\n    "),this.row.externalLink&&(b.push('\n        [<a href="'),b.push(this.row.externalLink),b.push('" target="_blank">Link</a>]\n    ')),b.push('\n</td>\n<td class="pValue">'),b.push(d(this.row["p-value"].toPrecision(5))),b.push('</td>\n<td class="matches">\n    <a class="count" style="cursor:pointer">'),b.push(d(this.row.matches)),b.push("</a>\n</td>")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["enrichment.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="header">\n    <h3>'),this.title&&b.push(d(this.title)),b.push("</h3>\n    <p>"),this.description&&b.push(this.description),b.push("</p>\n    "),this.notAnalysed&&(b.push("\n        <p>Number of Genes in this list not analysed in this widget: <a>"),b.push(d(this.notAnalysed)),b.push("</a></p>\n    ")),b.push('\n\n    <div class="form">\n        <!-- enrichment.form.eco -->\n    </div>\n\n    <div class="actions" style="padding:10px 0">\n        <!-- actions.eco -->\n    </div>\n</div>\n<div class="content">\n    <!-- enrichment.table.eco -->\n</div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["enrichment.table.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<!-- actual fixed head -->\n<div class="head" style="display:table">\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;"><input type="checkbox" class="check" /></div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">'),b.push(d(this.label)),b.push('</div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">p-Value</div>\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;">Matches</div>\n    <div style="clear:both"></div>\n</div>\n<div class="wrapper" style="overflow:auto;overflow-x:hidden">\n    <table class="table table-striped">\n        <!-- head for proper cell width -->\n        <thead style="visibility:hidden">\n            <tr>\n                <th></th>\n                <th>'),b.push(d(this.label)),b.push("</th>\n                <th>p-Value</th>\n                <th>Matches</th>\n            </tr>\n        </thead>\n        <tbody>\n            <!-- loop enrichment.row.eco -->\n        </tbody>\n    </table>\n</div>")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["enrichment.form.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var a,c,e,f,g,h,i,j;b.push('<form style="margin:0">\n    <div class="group" style="display:inline-block;margin-right:5px;float:left">\n        <label>Test Correction</label>\n        <select name="errorCorrection" class="span2">\n            '),i=this.errorCorrections;for(e=0,g=i.length;e<g;e++)a=i[e],b.push('\n                <option value="'),b.push(d(a)),b.push('" '),this.options.errorCorrection===a&&b.push(d('selected="selected"')),b.push(">\n                    "),b.push(d(a)),b.push("\n            </option>\n            ");b.push('\n        </select>\n    </div>\n\n    <div class="group" style="display:inline-block;margin-right:5px;float:left">\n        <label>Max p-value</label>\n        <select name="pValue" class="span2">\n            '),j=this.pValues;for(f=0,h=j.length;f<h;f++)c=j[f],b.push('\n                <option value="'),b.push(d(c)),b.push('" '),this.options.pValue===c&&b.push(d('selected="selected"')),b.push(">\n                    "),b.push(d(c)),b.push("\n                </option>\n            ");b.push('\n        </select>\n    </div>\n</form>\n<div style="clear:both"></div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["table.row.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var a,c,e,f;b.push('<td class="check"><input type="checkbox" '),this.row.selected&&b.push('checked="checked"'),b.push(" /></td>\n"),f=this.row.descriptions;for(c=0,e=f.length;c<e;c++)a=f[c],b.push("\n    <td>"),b.push(d(a)),b.push("</td>\n");b.push("\n<td>"),b.push(d(this.row.matches)),b.push("</td>")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["table.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){b.push('<div class="header">\n    <h3>'),this.title&&b.push(d(this.title)),b.push("</h3>\n    <p>"),this.description&&b.push(this.description),b.push("</p>\n    "),this.notAnalysed&&(b.push("\n        <p>Number of Genes in this list not analysed in this widget: <a>"),b.push(d(this.notAnalysed)),b.push("</a></p>\n    ")),b.push('\n\n    <div class="actions" style="padding:10px 0">\n        <!-- actions.eco -->\n    </div>\n</div>\n<div class="content">\n    <!-- table.table.eco -->\n</div>')}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
JST["table.table.eco"]=function(a){a||(a={});var b=[],c=function(a){var c=b,d;return b=[],a.call(this),d=b.join(""),b=c,e(d)},d=function(a){return a&&a.ecoSafe?a:typeof a!="undefined"&&a!=null?g(a):""},e,f=a.safe,g=a.escape;return e=a.safe=function(a){if(a&&a.ecoSafe)return a;if(typeof a=="undefined"||a==null)a="";var b=new String(a);return b.ecoSafe=!0,b},g||(g=a.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var a,c,e,f,g,h,i;b.push('<!-- actual fixed head -->\n<div class="head" style="display:table">\n    <div style="font-weight:bold;display:table-cell;padding:0 8px;"><input type="checkbox" class="check" /></div>\n    '),h=this.columns;for(c=0,f=h.length;c<f;c++)a=h[c],b.push('\n        <div style="font-weight:bold;display:table-cell;padding:0 8px;">'),b.push(d(a)),b.push("</div>\n    ");b.push('\n    <div style="clear:both"></div>\n</div>\n<div class="wrapper" style="overflow:auto;overflow-x:hidden">\n    <table class="table table-striped">\n        <!-- head for proper cell width -->\n        <thead style="visibility:hidden">\n            <tr>\n                <th></th>\n                '),i=this.columns;for(e=0,g=i.length;e<g;e++)a=i[e],b.push("\n                    <th>"),b.push(d(a)),b.push("</th>\n                ");b.push("\n            </tr>\n        </thead>\n        <tbody>\n            <!-- loop table.row.eco -->\n        </tbody>\n    </table>\n</div>")}).call(this)}.call(a),a.safe=f,a.escape=g,b.join("")}
/* Types in JS.
*/

var type,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

type = {};

type.Root = (function() {

  Root.name = 'Root';

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

  isString.name = 'isString';

  isString.prototype.expected = "String";

  function isString(actual) {
    this.actual = actual;
    this.result = typeof actual === 'string';
  }

  return isString;

})(type.Root);

type.isInteger = (function(_super) {

  __extends(isInteger, _super);

  isInteger.name = 'isInteger';

  isInteger.prototype.expected = "Integer";

  function isInteger(actual) {
    this.actual = actual;
    this.result = typeof actual === 'number';
  }

  return isInteger;

})(type.Root);

type.isBoolean = (function(_super) {

  __extends(isBoolean, _super);

  isBoolean.name = 'isBoolean';

  isBoolean.prototype.expected = "Boolean true";

  function isBoolean(actual) {
    this.actual = actual;
    this.result = typeof actual === 'boolean';
  }

  return isBoolean;

})(type.Root);

type.isNull = (function(_super) {

  __extends(isNull, _super);

  isNull.name = 'isNull';

  isNull.prototype.expected = "Null";

  function isNull(actual) {
    this.actual = actual;
    this.result = actual === null;
  }

  return isNull;

})(type.Root);

type.isArray = (function(_super) {

  __extends(isArray, _super);

  isArray.name = 'isArray';

  isArray.prototype.expected = "Array";

  function isArray(actual) {
    this.actual = actual;
    this.result = actual instanceof Array;
  }

  return isArray;

})(type.Root);

type.isHTTPSuccess = (function(_super) {

  __extends(isHTTPSuccess, _super);

  isHTTPSuccess.name = 'isHTTPSuccess';

  isHTTPSuccess.prototype.expected = "HTTP code 200";

  function isHTTPSuccess(actual) {
    this.actual = actual;
    this.result = actual === 200;
  }

  return isHTTPSuccess;

})(type.Root);

type.isJSON = (function(_super) {

  __extends(isJSON, _super);

  isJSON.name = 'isJSON';

  isJSON.prototype.expected = "JSON Object";

  function isJSON(actual) {
    this.actual = actual;
    this.result = true;
    try {
      if (typeof JSON !== "undefined" && JSON !== null) {
        JSON.parse(actual);
      }
    } catch (e) {
      this.result = false;
    }
  }

  return isJSON;

})(type.Root);

type.isUndefined = (function(_super) {

  __extends(isUndefined, _super);

  isUndefined.name = 'isUndefined';

  function isUndefined() {
    return isUndefined.__super__.constructor.apply(this, arguments);
  }

  isUndefined.prototype.expected = "it to be undefined";

  return isUndefined;

})(type.Root);

/* Merge properties of 2 dictionaries.
*/

var merge;

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

var Chart;

Chart = {
  expliticize: function(e) {
    var properties, property, _i, _len, _results;
    switch (e.node().nodeName) {
      case 'rect':
        properties = ['fill', 'stroke'];
        break;
      case 'text':
        properties = ['fill', 'font-family', 'font-size'];
        break;
      case 'line':
        properties = ['stroke'];
    }
    _results = [];
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      property = properties[_i];
      _results.push(e.attr(property, window.getComputedStyle(e.node(), null).getPropertyValue(property)));
    }
    return _results;
  },
  toPNG: function(svgEl, width, height) {
    var canvas;
    canvas = $('<canvas/>', {
      'style': 'image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast'
    }).attr('width', width).attr('height', height);
    canvg(canvas[0], $(svgEl).html());
    return canvas[0].toDataURL("image/png");
  }
};

Chart.Column = (function() {

  Column.name = 'Column';

  Column.prototype.isStacked = false;

  Column.prototype.colorbrewer = 4;

  Column.prototype.padding = {
    'barValue': 2,
    'axisLabels': 5,
    'barPadding': 0.05
  };

  Column.prototype.ticks = {
    'count': 10
  };

  Column.prototype.description = {
    'triangle': {
      'degrees': 30,
      'sideA': 0.5,
      'sideB': 0.866025
    }
  };

  Column.prototype.series = {};

  function Column(o) {
    var k, v;
    for (k in o) {
      v = o[k];
      this[k] = v;
    }
    $(this.el).css('height', this.height);
  }

  Column.prototype.render = function() {
    var bar, barHeight, barValueHeight, barWidth, bars, canvas, chart, color, desc, descG, descriptionTextHeight, descriptions, domain, g, grid, group, groupValue, height, index, key, labels, line, series, t, text, textWidth, tick, ty, value, values, verticalAxisLabelHeight, w, width, x, y, _i, _j, _k, _len, _len1, _ref, _ref1, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results,
      _this = this;
    height = this.height;
    width = this.width;
    $(this.el).empty();
    canvas = Mynd.select(this.el[0]).append('svg:svg').attr('class', 'canvas');
    this.useWholeNumbers = true;
    this.maxValue = -Infinity;
    if (this.isStacked) {
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        group = _ref[_i];
        groupValue = 0;
        _ref1 = group.data;
        for (key in _ref1) {
          value = _ref1[key];
          if (parseInt(value) !== value) {
            this.useWholeNumbers = false;
          }
          groupValue = groupValue + value;
        }
        if (groupValue > this.maxValue) {
          this.maxValue = groupValue;
        }
      }
    } else {
      _ref2 = this.data;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        group = _ref2[_j];
        _ref3 = group.data;
        for (key in _ref3) {
          value = _ref3[key];
          if (parseInt(value) !== value) {
            this.useWholeNumbers = false;
          }
          if (value > this.maxValue) {
            this.maxValue = value;
          }
        }
      }
    }
    if (this.axis != null) {
      labels = canvas.append('svg:g').attr('class', 'labels');
      if (this.axis.horizontal != null) {
        text = labels.append("svg:text").attr("class", "horizontal").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height - this.padding.axisLabels).text(this.axis.horizontal);
        height = height - text.node().getBBox().height - this.padding.axisLabels;
        Chart.expliticize(text);
      }
      if (this.axis.vertical != null) {
        text = labels.append("svg:text").attr("class", "vertical").attr("text-anchor", "middle").attr("x", 0).attr("y", height / 2).text(this.axis.vertical);
        verticalAxisLabelHeight = text.node().getBBox().height;
        text.attr("transform", "rotate(-90 " + verticalAxisLabelHeight + " " + (height / 2) + ")");
        width = width - verticalAxisLabelHeight - this.padding.axisLabels;
        Chart.expliticize(text);
      }
    }
    descriptions = canvas.append('svg:g').attr('class', 'descriptions');
    this.description.maxWidth = -Infinity;
    this.description.totalWidth = 0;
    descriptionTextHeight = 0;
    _ref4 = this.data;
    for (index in _ref4) {
      group = _ref4[index];
      g = descriptions.append("svg:g").attr("class", "g" + index);
      text = g.append("svg:text").attr("class", "text").attr("text-anchor", "end").text(group.description);
      textWidth = text.node().getComputedTextLength();
      if (textWidth > this.description.maxWidth) {
        this.description.maxWidth = textWidth;
      }
      this.description.totalWidth = this.description.totalWidth + textWidth;
      Chart.expliticize(text);
      g.append("svg:title").text(group.description);
      if (descriptionTextHeight === 0) {
        descriptionTextHeight = text.node().getBBox().height;
      }
    }
    height = height - descriptionTextHeight;
    grid = canvas.append("svg:g").attr("class", "grid");
    domain = {};
    domain.ticks = (function() {
      var t, _k, _len2, _ref5, _results;
      _ref5 = Mynd.Scale.linear().setDomain([0, _this.maxValue]).getTicks(_this.ticks.count);
      _results = [];
      for (_k = 0, _len2 = _ref5.length; _k < _len2; _k++) {
        t = _ref5[_k];
        if ((parseInt(t) === t) || !_this.useWholeNumbers) {
          _results.push(t);
        }
      }
      return _results;
    })();
    this.ticks.maxWidth = -Infinity;
    _ref5 = domain.ticks;
    for (index in _ref5) {
      tick = _ref5[index];
      t = grid.append("svg:g").attr('class', "t" + index);
      text = t.append("svg:text").attr("class", "tick").attr("text-anchor", "begin").attr("x", 0).text(tick);
      textWidth = text.node().getComputedTextLength();
      if (textWidth > this.ticks.maxWidth) {
        this.ticks.maxWidth = textWidth;
      }
      Chart.expliticize(text);
    }
    width = width - this.ticks.maxWidth;
    domain.x = Mynd.Scale.ordinal().setDomain((function() {
      _results = [];
      for (var _k = 0, _ref6 = this.data.length; 0 <= _ref6 ? _k < _ref6 : _k > _ref6; 0 <= _ref6 ? _k++ : _k--){ _results.push(_k); }
      return _results;
    }).apply(this)).setRangeBands([0, width], this.padding.barPadding);
    if (this.description.maxWidth > domain['x'].getRangeBand()) {
      height = height - (this.description.maxWidth * this.description.triangle.sideA);
    }
    domain.y = Mynd.Scale.linear().setDomain([0, this.maxValue]).setRange([0, height]);
    domain.color = Mynd.Scale.linear().setDomain([0, this.maxValue]).setRange([0, this.colorbrewer - 1], true);
    _ref7 = domain.ticks;
    for (index in _ref7) {
      tick = _ref7[index];
      t = grid.select(".t" + index);
      line = t.append("svg:line").attr("class", "line").attr("x1", this.ticks.maxWidth).attr("x2", width + this.ticks.maxWidth);
      Chart.expliticize(line);
      t.attr('transform', "translate(0," + (height - domain['y'](tick)) + ")");
    }
    chart = canvas.append("svg:g").attr("class", "chart");
    bars = chart.append("svg:g").attr("class", "bars");
    values = chart.append("svg:g").attr("class", "values");
    _ref8 = this.data;
    for (index in _ref8) {
      group = _ref8[index];
      g = bars.append("svg:g").attr("class", "g" + index);
      barWidth = domain['x'].getRangeBand();
      if (!this.isStacked) {
        barWidth = barWidth / group['data'].length;
      }
      if (!this.isStacked && group['data'].length === 2) {
        (function() {
          var x;
          x = _this.ticks.maxWidth + domain['x'](index) + barWidth;
          return line = g.append("svg:line").attr("class", "line dashed").attr("style", "stroke-dasharray: 10, 5;").attr("x1", x).attr("x2", x).attr("y1", 0).attr("y2", height);
        })();
      }
      y = height;
      _ref9 = group.data;
      for (series in _ref9) {
        value = _ref9[series];
        barHeight = domain['y'](value);
        if (!barHeight && this.isStacked) {
          continue;
        }
        x = domain['x'](index) + this.ticks.maxWidth;
        if (!this.isStacked) {
          x = x + (series * barWidth);
        }
        if (!this.isStacked) {
          y = height;
        }
        y = y - barHeight;
        color = domain['color'](value).toFixed(0);
        bar = g.append("svg:rect").attr("class", "bar s" + series + " q" + color + "-" + this.colorbrewer).attr('x', x).attr('y', y).attr('width', barWidth).attr('height', barHeight);
        bar.attr('opacity', 1);
        Chart.expliticize(bar);
        w = values.append("svg:g").attr('class', "g" + index + " s" + series + " q" + color + "-" + this.colorbrewer);
        text = w.append("svg:text").attr('x', x + (barWidth / 2)).attr("text-anchor", "middle").text(value);
        if (this.isStacked) {
          ty = y + text.node().getBBox().height + this.padding.barValue;
          text.attr('y', ty);
          if (text.node().getComputedTextLength() > barWidth) {
            text.attr("class", "value on beyond");
          } else {
            text.attr("class", "value on");
          }
        } else {
          ty = y - this.padding.barValue;
          barValueHeight = text.node().getBBox().height;
          if (ty < barValueHeight) {
            text.attr('y', ty + barValueHeight);
            if (text.node().getComputedTextLength() > barWidth) {
              text.attr("class", "value on beyond");
            } else {
              text.attr("class", "value on");
            }
          } else {
            text.attr('y', ty);
            text.attr("class", "value above");
          }
        }
        Chart.expliticize(text);
        w.append("svg:title").text(value);
        if (this.onclick != null) {
          (function(bar, group, series, value) {
            return bar.on('click', function() {
              return _this.onclick(group.description, series, value);
            });
          })(bar, group, series, value);
        }
      }
      g.append("svg:title").text(group.description);
      descG = descriptions.select(".g" + index);
      desc = descG.select("text");
      if (this.description.maxWidth > barWidth) {
        desc.attr("transform", "rotate(-" + this.description.triangle.degrees + " 0 0)");
        x = x + barWidth;
        while ((desc.node().getComputedTextLength() * this.description.triangle.sideB) > x) {
          desc.text(desc.text().replace('...', '').split('').reverse().slice(1).reverse().join('') + '...');
        }
      } else {
        x = (x + barWidth) - 0.5 * (barWidth * group.data.length);
        desc.attr("text-anchor", "middle");
      }
      descG.attr('transform', "translate(" + x + "," + (height + descriptionTextHeight) + ")");
    }
    if (((_ref10 = this.axis) != null ? _ref10.vertical : void 0) != null) {
      labels.select('.vertical').attr("transform", "rotate(-90 " + verticalAxisLabelHeight + " " + (height / 2) + ")").attr("y", height / 2);
      grid.attr('transform', "translate(" + (verticalAxisLabelHeight + this.padding.axisLabels) + ", 0)");
      chart.attr('transform', "translate(" + (verticalAxisLabelHeight + this.padding.axisLabels) + ", 0)");
      return descriptions.attr('transform', "translate(" + (verticalAxisLabelHeight + this.padding.axisLabels) + ", 0)");
    }
  };

  Column.prototype.hideSeries = function(series) {
    return Mynd.select(this.el[0]).selectAll(".s" + series).attr('fill-opacity', 0.1);
  };

  Column.prototype.showSeries = function(series) {
    return Mynd.select(this.el[0]).selectAll(".s" + series).attr('fill-opacity', 1);
  };

  Column.prototype.toPNG = function() {
    return Chart.toPNG(this.el, this.width, this.height);
  };

  return Column;

})();

Chart.Legend = (function() {

  Legend.name = 'Legend';

  function Legend(o) {
    var k, v;
    for (k in o) {
      v = o[k];
      this[k] = v;
    }
  }

  Legend.prototype.render = function() {
    var index, name, ul, _ref, _results,
      _this = this;
    $(this.el).empty();
    $(this.el).append(ul = $('<ul/>'));
    _ref = this.series;
    _results = [];
    for (index in _ref) {
      name = _ref[index];
      _results.push((function(index, name) {
        return ul.append($('<li/>', {
          'class': 's' + index,
          'html': name,
          'click': function(e) {
            return _this.clickAction(e.target, index);
          }
        }));
      })(index, name));
    }
    return _results;
  };

  Legend.prototype.clickAction = function(el, series) {
    $(el).toggleClass('disabled');
    if ($(el).hasClass('disabled')) {
      return this.chart.hideSeries(series);
    } else {
      return this.chart.showSeries(series);
    }
  };

  return Legend;

})();

Chart.Settings = (function() {

  Settings.name = 'Settings';

  function Settings(o) {
    var k, v;
    for (k in o) {
      v = o[k];
      this[k] = v;
    }
  }

  Settings.prototype.render = function() {
    var stacked,
      _this = this;
    $(this.el).empty();
    stacked = $(this.el).append($('<a/>', {
      'class': "btn btn-mini stacked " + (this.isStacked ? 'active' : ''),
      'text': this.isStacked ? 'Unstack' : 'Stack',
      'click': function(e) {
        $(e.target).toggleClass('active');
        if ($(e.target).hasClass('active')) {
          _this.chart.isStacked = true;
          $(e.target).text('Unstack');
        } else {
          _this.chart.isStacked = false;
          $(e.target).text('Stack');
        }
        _this.legend.render();
        return _this.chart.render();
      }
    }));
    return $(this.el).append($('<a/>', {
      'class': "btn btn-mini png",
      'text': 'Save as a PNG',
      'click': function(e) {
        return PlainExporter(e.target, '<img src="' + _this.chart.toPNG() + '"/>');
      }
    }));
  };

  return Settings;

})();

/* <IE9 does not have a whole lot of JS functions.
*/

if (!("bind" in Function.prototype)) {
  Function.prototype.bind = function(owner) {
    var args, that;
    that = this;
    if (arguments.length <= 1) {
      return function() {
        return that.apply(owner, arguments);
      };
    } else {
      args = Array.prototype.slice.call(arguments, 1);
      return function() {
        return that.apply(owner, (arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments))));
      };
    }
  };
}

if (!("trim" in String.prototype)) {
  String.prototype.trim = function() {
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
  };
}

if (!("indexOf" in Array.prototype)) {
  Array.prototype.indexOf = function(find, i) {
    var n;
    if (i === undefined) {
      i = 0;
    }
    if (i < 0) {
      i += this.length;
    }
    if (i < 0) {
      i = 0;
    }
    n = this.length;
    while (i < n) {
      if (i in this && this[i] === find) {
        return i;
      }
      i++;
    }
    return -1;
  };
}

if (!("lastIndexOf" in Array.prototype)) {
  Array.prototype.lastIndexOf = function(find, i) {
    if (i === undefined) {
      i = this.length - 1;
    }
    if (i < 0) {
      i += this.length;
    }
    if (i > this.length - 1) {
      i = this.length - 1;
    }
    i++;
    while (i-- > 0) {
      if (i in this && this[i] === find) {
        return i;
      }
    }
    return -1;
  };
}

if (!("forEach" in Array.prototype)) {
  Array.prototype.forEach = function(action, that) {
    var i, n, _results;
    i = 0;
    n = this.length;
    _results = [];
    while (i < n) {
      if (i in this) {
        action.call(that, this[i], i, this);
      }
      _results.push(i++);
    }
    return _results;
  };
}

if (!("map" in Array.prototype)) {
  Array.prototype.map = function(mapper, that) {
    var i, n, other;
    other = new Array(this.length);
    i = 0;
    n = this.length;
    while (i < n) {
      if (i in this) {
        other[i] = mapper.call(that, this[i], i, this);
      }
      i++;
    }
    return other;
  };
}

if (!("filter" in Array.prototype)) {
  Array.prototype.filter = function(filter, that) {
    var i, n, other, v;
    other = [];
    v = void 0;
    i = 0;
    n = this.length;
    while (i < n) {
      if (i in this && filter.call(that, v = this[i], i, this)) {
        other.push(v);
      }
      i++;
    }
    return other;
  };
}

if (!("every" in Array.prototype)) {
  Array.prototype.every = function(tester, that) {
    var i, n;
    i = 0;
    n = this.length;
    while (i < n) {
      if (i in this && !tester.call(that, this[i], i, this)) {
        return false;
      }
      i++;
    }
    return true;
  };
}

if (!("some" in Array.prototype)) {
  Array.prototype.some = function(tester, that) {
    var i, n;
    i = 0;
    n = this.length;
    while (i < n) {
      if (i in this && tester.call(that, this[i], i, this)) {
        return true;
      }
      i++;
    }
    return false;
  };
}

var Mynd, temp, temp_array, temp_arrayCopy, temp_arraySlice, temp_dispatch, temp_dispatch_event, temp_eventCancel, temp_eventDispatch, temp_eventSource, temp_nsPrefix, temp_select, temp_selectAll, temp_selectRoot, temp_selection, temp_selectionPrototype, temp_selectionRoot, temp_selection_selector, temp_selection_selectorAll;

Mynd = {};

Mynd.Scale = {};

temp = {};

temp_selectionPrototype = [];

temp.selection = function() {
  return temp_selectionRoot;
};

temp.selection.prototype = temp_selectionPrototype;

temp_select = function(s, n) {
  return n.querySelector(s);
};

temp_selectAll = function(s, n) {
  return n.querySelectorAll(s);
};

temp_selection_selector = function(selector) {
  return function() {
    return temp_select(selector, this);
  };
};

temp_selection_selectorAll = function(selector) {
  return function() {
    return temp_selectAll(selector, this);
  };
};

temp_selectionPrototype.select = function(selector) {
  var group, i, j, m, n, node, subgroup, subgroups, subnode;
  subgroups = [];
  subgroup = void 0;
  subnode = void 0;
  group = void 0;
  node = void 0;
  if (typeof selector !== "function") {
    selector = temp_selection_selector(selector);
  }
  j = -1;
  m = this.length;
  while (++j < m) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    i = -1;
    n = group.length;
    while (++i < n) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i));
        if (subnode && "__data__" in node) {
          subnode.__data__ = node.__data__;
        }
      } else {
        subgroup.push(null);
      }
    }
  }
  return temp_selection(subgroups);
};

temp_selectionPrototype.selectAll = function(selector) {
  var group, i, j, m, n, node, subgroup, subgroups;
  subgroups = [];
  subgroup = void 0;
  node = void 0;
  if (typeof selector !== "function") {
    selector = temp_selection_selectorAll(selector);
  }
  j = -1;
  m = this.length;
  while (++j < m) {
    group = this[j];
    i = -1;
    n = group.length;
    while (++i < n) {
      if (node = group[i]) {
        subgroups.push(subgroup = temp_array(selector.call(node, node.__data__, i)));
        subgroup.parentNode = node;
      }
    }
  }
  return temp_selection(subgroups);
};

temp_selectionPrototype.append = function(name) {
  var append, appendNS;
  append = function() {
    return this.appendChild(document.createElementNS(this.namespaceURI, name));
  };
  appendNS = function() {
    return this.appendChild(document.createElementNS(name.space, name.local));
  };
  name = temp.ns.qualify(name);
  return this.select((name.local ? appendNS : append));
};

temp_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml"
};

temp.ns = {
  prefix: temp_nsPrefix,
  qualify: function(name) {
    var i, prefix;
    i = name.indexOf(":");
    prefix = name;
    if (i >= 0) {
      prefix = name.substring(0, i);
      name = name.substring(i + 1);
    }
    if (temp_nsPrefix.hasOwnProperty(prefix)) {
      return {
        space: temp_nsPrefix[prefix],
        local: name
      };
    } else {
      return name;
    }
  }
};

temp_selectionPrototype.attr = function(name, value) {
  var attrConstant, attrConstantNS, attrFunction, attrFunctionNS, attrNull, attrNullNS, node, ret;
  attrNull = function() {
    return this.removeAttribute(name);
  };
  attrNullNS = function() {
    return this.removeAttributeNS(name.space, name.local);
  };
  attrConstant = function() {
    return this.setAttribute(name, value);
  };
  attrConstantNS = function() {
    return this.setAttributeNS(name.space, name.local, value);
  };
  attrFunction = function() {
    var x;
    x = value.apply(this, arguments);
    if (x == null) {
      return this.removeAttribute(name);
    } else {
      return this.setAttribute(name, x);
    }
  };
  attrFunctionNS = function() {
    var x;
    x = value.apply(this, arguments);
    if (x == null) {
      return this.removeAttributeNS(name.space, name.local);
    } else {
      return this.setAttributeNS(name.space, name.local, x);
    }
  };
  name = temp.ns.qualify(name);
  if (arguments.length < 2) {
    node = this.node();
    return (name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name));
  }
  ret = (function() {
    if (!(value != null)) {
      if (name.local) {
        return attrNullNS;
      } else {
        return attrNull;
      }
    } else {
      if (typeof value === "function") {
        if (name.local) {
          return attrFunctionNS;
        } else {
          return attrFunction;
        }
      } else {
        if (name.local) {
          return attrConstantNS;
        } else {
          return attrConstant;
        }
      }
    }
  })();
  return this.each(ret);
};

temp_selectionPrototype.each = function(callback) {
  var group, i, j, m, n, node;
  j = -1;
  m = this.length;
  while (++j < m) {
    group = this[j];
    i = -1;
    n = group.length;
    while (++i < n) {
      node = group[i];
      if (node) {
        callback.call(node, node.__data__, i, j);
      }
    }
  }
  return this;
};

temp_selectionPrototype.text = function(value) {
  var ret;
  if (arguments.length < 1) {
    return this.node().textContent;
  } else {
    ret = (function() {
      if (typeof value === "function") {
        return function() {
          var v;
          v = value.apply(this, arguments);
          return this.textContent = (!(v != null) ? "" : v);
        };
      } else {
        if (!(value != null)) {
          return function() {
            return this.textContent = "";
          };
        } else {
          return function() {
            return this.textContent = value;
          };
        }
      }
    })();
    return this.each(ret);
  }
};

temp_selectionPrototype.node = function(callback) {
  var group, i, j, m, n, node;
  j = 0;
  m = this.length;
  while (j < m) {
    group = this[j];
    i = 0;
    n = group.length;
    while (i < n) {
      node = group[i];
      if (node) {
        return node;
      }
      i++;
    }
    j++;
  }
  return null;
};

temp_eventCancel = function() {
  temp.event.stopPropagation();
  return temp.event.preventDefault();
};

temp_eventSource = function() {
  var e, s;
  e = temp.event;
  s = void 0;
  while (s = e.sourceEvent) {
    e = s;
  }
  return e;
};

temp_dispatch = function() {};

temp_dispatch.prototype.on = function(type, listener) {
  var i, name;
  i = type.indexOf(".");
  name = "";
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }
  if (arguments.length < 2) {
    return this[type].on(name);
  } else {
    return this[type].on(name, listener);
  }
};

temp_dispatch_event = function(dispatch) {
  var event, listenerByName, listeners;
  event = function() {
    var i, l, n, z;
    z = listeners;
    i = -1;
    n = z.length;
    l = void 0;
    if ((function() {
      var _results;
      _results = [];
      while (++i < n) {
        _results.push(l = z[i].on);
      }
      return _results;
    })()) {
      l.apply(this, arguments);
    }
    return dispatch;
  };
  listeners = [];
  listenerByName = new d3_Map;
  console.log(listenerByName);
  event.on = function(name, listener) {
    var i, l;
    l = listenerByName.get(name);
    i = void 0;
    if (arguments.length < 2) {
      return l && l.on;
    }
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }
    if (listener) {
      listeners.push(listenerByName.set(name, {
        on: listener
      }));
    }
    return dispatch;
  };
  return event;
};

temp_eventDispatch = function(target) {
  var dispatch, i, n;
  dispatch = new temp_dispatch;
  i = 0;
  n = arguments.length;
  while (++i < n) {
    dispatch[arguments[i]] = temp_dispatch_event(dispatch);
  }
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      var e0;
      try {
        e0 = e1.sourceEvent = temp.event;
        e1.target = target;
        temp.event = e1;
        return dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        temp.event = e0;
      }
    };
  };
  return dispatch;
};

temp.event = null;

temp_selectionPrototype.on = function(type, listener, capture) {
  var i, name;
  if (arguments.length < 3) {
    capture = false;
  }
  name = "__on" + type;
  i = type.indexOf(".");
  if (i > 0) {
    type = type.substring(0, i);
  }
  if (arguments.length < 2) {
    return (i = this.node()[name]) && i._;
  }
  return this.each(function(d, i) {
    var l, node, o;
    l = function(e) {
      var o;
      o = temp.event;
      temp.event = e;
      try {
        return listener.call(node, node.__data__, i);
      } finally {
        temp.event = o;
      }
    };
    node = this;
    o = node[name];
    if (o) {
      node.removeEventListener(type, o, o.$);
      delete node[name];
    }
    if (listener) {
      node.addEventListener(type, node[name] = l, l.$ = capture);
      return l._ = listener;
    }
  });
};

temp_selection = function(groups) {
  groups.__proto__ = temp_selectionPrototype;
  return groups;
};

temp_selectionRoot = temp_selection([[document]]);

temp_selectRoot = document.documentElement;

temp_selectionRoot[0].parentNode = temp_selectRoot;

temp_arraySlice = function(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
};

temp_arrayCopy = function(pseudoarray) {
  var array, i, n;
  i = -1;
  n = pseudoarray.length;
  array = [];
  while (++i < n) {
    array.push(pseudoarray[i]);
  }
  return array;
};

try {
  temp_array(document.documentElement.childNodes)[0].nodeType;
} catch (e) {
  temp_array = temp_arrayCopy;
}

temp_array = temp_arraySlice;

Mynd.selectAll = function(selector) {
  if (typeof selector === "string") {
    return temp_selectionRoot.selectAll(selector);
  } else {
    return temp_selection([temp_array(selector)]);
  }
};

Mynd.select = function(selector) {
  if (typeof selector === "string") {
    return temp_selectionRoot.select(selector);
  } else {
    return temp_selection([[selector]]);
  }
};

Mynd.Scale.ordinal = function() {
  return (function() {
    var internal, scale;
    internal = {};
    scale = function(x) {
      if (!(internal.range != null)) {
        throw new Error('Mynd.Scale.ordinal: you need to set input range first');
      }
      return internal.range[x];
    };
    scale.setDomain = function(domain) {
      var d, element, key, value, _i, _len;
      if (domain == null) {
        domain = [];
      }
      d = {};
      for (_i = 0, _len = domain.length; _i < _len; _i++) {
        element = domain[_i];
        d[element] = element;
      }
      internal.domain = (function() {
        var _results;
        _results = [];
        for (key in d) {
          value = d[key];
          _results.push(value);
        }
        return _results;
      })();
      return scale;
    };
    scale.setRangeBands = function(bands, padding) {
      var range, reverse, start, step, stop, _i, _ref, _ref1, _results;
      if (padding == null) {
        padding = 0;
      }
      if (!(internal.domain != null)) {
        throw new Error('Mynd.Scale.ordinal: you need to set input domain first');
      }
      start = bands[0];
      stop = bands[1];
      reverse = bands[1] < bands[0];
      if (reverse) {
        _ref = [start, stop], stop = _ref[0], start = _ref[1];
      }
      step = (stop - start) / (internal.domain.length + padding);
      range = (function() {
        _results = [];
        for (var _i = 0, _ref1 = internal.domain.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; 0 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(i) {
        return (start + (step * padding)) + (step * i);
      });
      if (reverse) {
        range.reverse();
      }
      internal.range = range;
      internal.rangeBand = step * (1 - padding);
      return scale;
    };
    scale.getRangeBand = function() {
      return internal.rangeBand;
    };
    return scale.setDomain();
  })();
};

Mynd.Scale.linear = function() {
  return (function() {
    var deinterpolate, internal, interpolate, scale, scaleBilinear;
    internal = {};
    deinterpolate = function(a, b) {
      return function(x) {
        return (x - a) * 1 / (b - a);
      };
    };
    interpolate = function(a, b, round) {
      if (round) {
        return function(x) {
          return Math.round(a + b * x);
        };
      } else {
        return function(x) {
          return a + b * x;
        };
      }
    };
    scaleBilinear = function(domain, range, round) {
      return function(x) {
        return interpolate(range[0], range[1], round)(deinterpolate(domain[0], domain[1])(x));
      };
    };
    scale = function(x) {
      if (!(internal.output != null)) {
        if ((internal.domain != null) && (internal.range != null)) {
          internal.output = scaleBilinear(internal.domain, internal.range, internal.round);
        } else {
          throw new Error('Mynd.Scale.linear: you need to set both input domain and range');
        }
      }
      return internal.output(x);
    };
    scale.setDomain = function(domain) {
      internal.domain = domain;
      return scale;
    };
    scale.setRange = function(range, round) {
      if (round == null) {
        round = false;
      }
      internal.range = range;
      internal.round = round;
      return scale;
    };
    scale.getTicks = function(amount) {
      var reverse, span, start, step, stop, ticks, x, _ref;
      if (!(internal.domain != null)) {
        throw new Error('Mynd.Scale.linear: you need to set input domain first');
      }
      start = internal.domain[0];
      stop = internal.domain[1];
      reverse = internal.domain[1] < internal.domain[0];
      if (reverse) {
        _ref = [start, stop], stop = _ref[0], start = _ref[1];
      }
      span = stop - start;
      step = Math.pow(10, Math.floor(Math.log(span / amount) / Math.LN10));
      x = amount / span * step;
      if (x <= .15) {
        step *= 10;
      } else if (x <= .35) {
        step *= 5;
      } else if (x <= .75) {
        step *= 2;
      }
      ticks = [];
      x = Math.ceil(start / step) * step;
      while (x <= Math.floor(stop / step) * step + step * .5) {
        ticks.push(x);
        x += step;
      }
      return ticks;
    };
    return scale;
  })();
};

/* Create file download with custom content.
*/

var Exporter, PlainExporter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Exporter = (function() {

  Exporter.name = 'Exporter';

  Exporter.prototype.mime = 'text/plain';

  Exporter.prototype.charset = 'UTF-8';

  Exporter.prototype.url = window.webkitURL || window.URL;

  function Exporter(a, data, filename) {
    var builder;
    if (filename == null) {
      filename = 'widget.tsv';
    }
    this.destroy = __bind(this.destroy, this);

    builder = new (window.WebKitBlobBuilder || window.MozBlobBuilder || window.BlobBuilder)();
    builder.append(data);
    a.attr('download', filename);
    (this.href = this.url.createObjectURL(builder.getBlob("" + this.mime + ";charset=" + this.charset))) && (a.attr('href', this.href));
    a.attr('data-downloadurl', [this.mime, filename, this.href].join(':'));
  }

  Exporter.prototype.destroy = function() {
    return this.url.revokeObjectURL(this.href);
  };

  return Exporter;

})();

PlainExporter = (function() {

  PlainExporter.name = 'PlainExporter';

  function PlainExporter(a, data) {
    var w;
    w = window.open();
    if (!(w != null) || typeof w === "undefined") {
      a.after(this.msg = $('<span/>', {
        'style': 'margin-left:5px',
        'class': 'label label-inverse',
        'text': 'Please enable popups'
      }));
    } else {
      w.document.open();
      w.document.write(data);
      w.document.close();
    }
  }

  PlainExporter.prototype.destroy = function() {
    var _ref;
    return (_ref = this.msg) != null ? _ref.fadeOut() : void 0;
  };

  return PlainExporter;

})();

var factory;
factory = function(Backbone) {

  /* Parent for all Widgets, handling templating, validation and errors.
  */
  
  var InterMineWidget,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
  InterMineWidget = (function() {
  
    InterMineWidget.name = 'InterMineWidget';
  
    function InterMineWidget() {
      this.error = __bind(this.error, this);
  
      this.validateType = __bind(this.validateType, this);
      $(this.el).html($('<div/>', {
        "class": "inner",
        style: "height:572px;overflow:hidden;position:relative"
      }));
      this.el = "" + this.el + " div.inner";
      this.imService = new intermine.Service({
        'root': this.service,
        'token': this.token
      });
    }
  
    InterMineWidget.prototype.template = function(name, context) {
      var _name;
      if (context == null) {
        context = {};
      }
      return typeof JST[_name = "" + name + ".eco"] === "function" ? JST[_name](context) : void 0;
    };
  
    InterMineWidget.prototype.validateType = function(object, spec) {
      var fails, key, r, value;
      fails = [];
      for (key in object) {
        value = object[key];
        if ((r = (typeof spec[key] === "function" ? new spec[key](value) : void 0) || (r = new type.isUndefined())) && !r.is()) {
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
          opts.title = opts.statusText;
          opts.text = opts.responseText;
          break;
        case "JSONResponse":
          opts.title = "Invalid JSON Response";
          opts.text = "<ol>" + (opts.join('')) + "</ol>";
      }
      $(this.el).html(this.template("error", opts));
      throw new Error(type);
    };
  
    return InterMineWidget;
  
  })();
  

  /* Chart Widget main class.
  */
  
  var ChartWidget,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  ChartWidget = (function(_super) {
  
    __extends(ChartWidget, _super);
  
    ChartWidget.name = 'ChartWidget';
  
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
      ChartWidget.__super__.constructor.call(this);
      this.render();
    }
  
    ChartWidget.prototype.render = function() {
      var data, key, timeout, value, _ref, _ref1,
        _this = this;
      timeout = window.setTimeout((function() {
        return $(_this.el).append(_this.loading = $(_this.template('loading')));
      }), 400);
      if ((_ref = this.view) != null) {
        _ref.undelegateEvents();
      }
      data = {
        'widget': this.id,
        'list': this.bagName,
        'token': this.token
      };
      _ref1 = this.formOptions;
      for (key in _ref1) {
        value = _ref1[key];
        if (key !== 'errorCorrection' && key !== 'pValue') {
          data['filter'] = value;
        }
      }
      return $.ajax({
        url: "" + this.service + "list/chart",
        dataType: "jsonp",
        data: data,
        success: function(response) {
          var _ref2;
          window.clearTimeout(timeout);
          if ((_ref2 = _this.loading) != null) {
            _ref2.remove();
          }
          _this.validateType(response, _this.spec.response);
          if (response.wasSuccessful) {
            _this.name = response.title;
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
        error: function(err) {
          return _this.error(err, "AJAXTransport");
        }
      });
    };
  
    return ChartWidget;
  
  })(InterMineWidget);
  

  /* Table Widget main class.
  */
  
  var TableWidget,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  TableWidget = (function(_super) {
  
    __extends(TableWidget, _super);
  
    TableWidget.name = 'TableWidget';
  
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
      TableWidget.__super__.constructor.call(this);
      this.render();
    }
  
    TableWidget.prototype.render = function() {
      var data, timeout, _ref,
        _this = this;
      timeout = window.setTimeout((function() {
        return $(_this.el).append(_this.loading = $(_this.template('loading')));
      }), 400);
      if ((_ref = this.view) != null) {
        _ref.undelegateEvents();
      }
      data = {
        'widget': this.id,
        'list': this.bagName,
        'token': this.token
      };
      return $.ajax({
        url: "" + this.service + "list/table",
        dataType: "jsonp",
        data: data,
        success: function(response) {
          var _ref1;
          window.clearTimeout(timeout);
          if ((_ref1 = _this.loading) != null) {
            _ref1.remove();
          }
          _this.validateType(response, _this.spec.response);
          if (response.wasSuccessful) {
            _this.name = response.title;
            return _this.view = new TableView({
              "widget": _this,
              "el": _this.el,
              "template": _this.template,
              "response": response,
              "options": _this.widgetOptions
            });
          }
        },
        error: function(err) {
          return _this.error(err, "AJAXTransport");
        }
      });
    };
  
    return TableWidget;
  
  })(InterMineWidget);
  

  /* Enrichment Widget main class.
  */
  
  var EnrichmentWidget,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  EnrichmentWidget = (function(_super) {
  
    __extends(EnrichmentWidget, _super);
  
    EnrichmentWidget.name = 'EnrichmentWidget';
  
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
        "pathQueryForMatches": type.isString
      }
    };
  
    function EnrichmentWidget(service, token, id, bagName, el, widgetOptions) {
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
      this.formOptions = {
        errorCorrection: "Holm-Bonferroni",
        pValue: "0.05"
      };
      EnrichmentWidget.__super__.constructor.call(this);
      this.render();
    }
  
    EnrichmentWidget.prototype.render = function() {
      var data, key, timeout, value, _ref, _ref1,
        _this = this;
      timeout = window.setTimeout((function() {
        return $(_this.el).append(_this.loading = $(_this.template('loading')));
      }), 400);
      if ((_ref = this.view) != null) {
        _ref.undelegateEvents();
      }
      data = {
        'widget': this.id,
        'list': this.bagName,
        'correction': this.formOptions.errorCorrection,
        'maxp': this.formOptions.pValue,
        'token': this.token
      };
      _ref1 = this.formOptions;
      for (key in _ref1) {
        value = _ref1[key];
        if (key !== 'errorCorrection' && key !== 'pValue') {
          data['filter'] = value;
        }
      }
      return $.ajax({
        'url': "" + this.service + "list/enrichment",
        'dataType': "jsonp",
        'data': data,
        success: function(response) {
          var _ref2;
          window.clearTimeout(timeout);
          if ((_ref2 = _this.loading) != null) {
            _ref2.remove();
          }
          _this.validateType(response, _this.spec.response);
          if (response.wasSuccessful) {
            _this.name = response.title;
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
              "options": _this.widgetOptions
            });
          }
        },
        error: function(err) {
          return _this.error(err, "AJAXTransport");
        }
      });
    };
  
    return EnrichmentWidget;
  
  })(InterMineWidget);
  

  /* Core Model for Enrichment and Table Models.
  */
  
  var CoreCollection, CoreModel, EnrichmentResults, EnrichmentRow, TableResults, TableRow,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  CoreModel = (function(_super) {
  
    __extends(CoreModel, _super);
  
    CoreModel.name = 'CoreModel';
  
    function CoreModel() {
      this.toggleSelected = __bind(this.toggleSelected, this);
  
      this.validate = __bind(this.validate, this);
      return CoreModel.__super__.constructor.apply(this, arguments);
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
  
    CoreCollection.name = 'CoreCollection';
  
    function CoreCollection() {
      return CoreCollection.__super__.constructor.apply(this, arguments);
    }
  
    CoreCollection.prototype.model = CoreModel;
  
    CoreCollection.prototype.selected = function() {
      return this.filter(function(row) {
        return row.get("selected");
      });
    };
  
    CoreCollection.prototype.toggleSelected = function() {
      var model, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
      if (this.models.length - this.selected().length) {
        _ref = this.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          _results.push(model.set({
            "selected": true
          }, {
            'silent': true
          }));
        }
        return _results;
      } else {
        _ref1 = this.models;
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          model = _ref1[_j];
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
  
    EnrichmentRow.name = 'EnrichmentRow';
  
    function EnrichmentRow() {
      return EnrichmentRow.__super__.constructor.apply(this, arguments);
    }
  
    EnrichmentRow.prototype.spec = {
      "description": type.isString,
      "identifier": type.isString,
      "matches": type.isInteger,
      "p-value": type.isInteger,
      "selected": type.isBoolean,
      "externalLink": type.isString
    };
  
    return EnrichmentRow;
  
  })(CoreModel);
  
  EnrichmentResults = (function(_super) {
  
    __extends(EnrichmentResults, _super);
  
    EnrichmentResults.name = 'EnrichmentResults';
  
    function EnrichmentResults() {
      return EnrichmentResults.__super__.constructor.apply(this, arguments);
    }
  
    EnrichmentResults.prototype.model = EnrichmentRow;
  
    return EnrichmentResults;
  
  })(CoreCollection);
  
  /* Models underpinning Table Widget results.
  */
  
  
  TableRow = (function(_super) {
  
    __extends(TableRow, _super);
  
    TableRow.name = 'TableRow';
  
    function TableRow() {
      return TableRow.__super__.constructor.apply(this, arguments);
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
  
    TableResults.name = 'TableResults';
  
    function TableResults() {
      return TableResults.__super__.constructor.apply(this, arguments);
    }
  
    TableResults.prototype.model = TableRow;
  
    return TableResults;
  
  })(CoreCollection);
  

  /* Enrichment Widget table row.
  */
  
  var EnrichmentRowView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  EnrichmentRowView = (function(_super) {
  
    __extends(EnrichmentRowView, _super);
  
    EnrichmentRowView.name = 'EnrichmentRowView';
  
    function EnrichmentRowView() {
      this.toggleMatchesAction = __bind(this.toggleMatchesAction, this);
  
      this.selectAction = __bind(this.selectAction, this);
  
      this.render = __bind(this.render, this);
      return EnrichmentRowView.__super__.constructor.apply(this, arguments);
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
      return this.model.toggleSelected();
    };
  
    EnrichmentRowView.prototype.toggleMatchesAction = function() {
      if (!(this.popoverView != null)) {
        return $(this.el).find('td.matches a.count').after((this.popoverView = new EnrichmentPopoverView({
          "matches": this.model.get("matches"),
          "identifiers": [this.model.get("identifier")],
          "description": this.model.get("description"),
          "template": this.template,
          "matchCb": this.callbacks.matchCb,
          "resultsCb": this.callbacks.resultsCb,
          "listCb": this.callbacks.listCb,
          "response": this.response,
          "imService": this.imService
        })).el);
      } else {
        return this.popoverView.toggle();
      }
    };
  
    return EnrichmentRowView;
  
  })(Backbone.View);
  

  /* Table Widget table row.
  */
  
  var TableRowView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  TableRowView = (function(_super) {
  
    __extends(TableRowView, _super);
  
    TableRowView.name = 'TableRowView';
  
    function TableRowView() {
      this.selectAction = __bind(this.selectAction, this);
  
      this.render = __bind(this.render, this);
      return TableRowView.__super__.constructor.apply(this, arguments);
    }
  
    TableRowView.prototype.tagName = "tr";
  
    TableRowView.prototype.events = {
      "click td.check input": "selectAction"
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
      return this.model.toggleSelected();
    };
  
    return TableRowView;
  
  })(Backbone.View);
  

  /* View maintaining Table Widget.
  */
  
  var TableView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  TableView = (function(_super) {
  
    __extends(TableView, _super);
  
    TableView.name = 'TableView';
  
    function TableView() {
      this.viewAction = __bind(this.viewAction, this);
  
      this.exportAction = __bind(this.exportAction, this);
  
      this.selectAllAction = __bind(this.selectAllAction, this);
  
      this.renderTableBody = __bind(this.renderTableBody, this);
  
      this.renderTable = __bind(this.renderTable, this);
  
      this.renderToolbar = __bind(this.renderToolbar, this);
      return TableView.__super__.constructor.apply(this, arguments);
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
        "notAnalysed": this.response.notAnalysed
      }));
      if (this.response.results.length > 0) {
        this.renderToolbar();
        this.renderTable();
      } else {
        $(this.el).find("div.content").html($(this.template("noresults")));
      }
      return this;
    };
  
    TableView.prototype.renderToolbar = function() {
      return $(this.el).find("div.actions").html($(this.template("actions", {
        "disabled": this.collection.selected().length === 0
      })));
    };
  
    TableView.prototype.renderTable = function() {
      var height, i, table, _fn, _i, _ref,
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
      for (i = _i = 0, _ref = this.response.results.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
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
      var fragment, row, _i, _len, _ref;
      fragment = document.createDocumentFragment();
      _ref = this.collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        fragment.appendChild(new TableRowView({
          "model": row,
          "template": this.template,
          "response": this.response
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
      var ex, model, result, _i, _len, _ref;
      result = [this.response.columns.replace(/,/g, "\t")];
      _ref = this.collection.selected();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        result.push(model.get('descriptions').join("\t") + "\t" + model.get('matches'));
      }
      if (result.length) {
        ex = new PlainExporter($(e.target), '<pre>' + result.join("\n") + '<pre>');
        return window.setTimeout((function() {
          return ex.destroy();
        }), 5000);
      }
    };
  
    TableView.prototype.viewAction = function() {
      var descriptions, model, rowIdentifiers, _i, _len, _ref, _ref1;
      descriptions = [];
      rowIdentifiers = [];
      _ref = this.collection.selected();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        descriptions.push(model.get('descriptions')[0]);
        rowIdentifiers.push(model.get('identifier'));
      }
      if (rowIdentifiers.length) {
        if ((_ref1 = this.popoverView) != null) {
          _ref1.remove();
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
          "imService": this.widget.imService,
          "type": this.response.type
        })).el);
      }
    };
  
    return TableView;
  
  })(Backbone.View);
  

  /* Table Widget table row matches box.
  */
  
  var TablePopoverView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  TablePopoverView = (function(_super) {
  
    __extends(TablePopoverView, _super);
  
    TablePopoverView.name = 'TablePopoverView';
  
    function TablePopoverView() {
      this.close = __bind(this.close, this);
  
      this.listAction = __bind(this.listAction, this);
  
      this.resultsAction = __bind(this.resultsAction, this);
  
      this.matchAction = __bind(this.matchAction, this);
  
      this.renderValues = __bind(this.renderValues, this);
  
      this.render = __bind(this.render, this);
      return TablePopoverView.__super__.constructor.apply(this, arguments);
    }
  
    TablePopoverView.prototype.descriptionLimit = 50;
  
    TablePopoverView.prototype.valuesLimit = 5;
  
    TablePopoverView.prototype.events = {
      "click a.match": "matchAction",
      "click a.results": "resultsAction",
      "click a.list": "listAction",
      "click a.close": "close"
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
      var values,
        _this = this;
      $(this.el).css({
        'position': 'relative'
      });
      $(this.el).html(this.template("popover", {
        "description": this.description,
        "descriptionLimit": this.descriptionLimit,
        "style": 'width:300px'
      }));
      this.pathQuery = JSON.parse(this.pathQuery);
      this.pathQuery.where.push({
        "path": this.pathConstraint,
        "op": "ONE OF",
        "values": this.identifiers
      });
      values = [];
      this.imService.query(this.pathQuery, function(q) {
        return q.rows(function(response) {
          var object, _i, _len;
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            object = response[_i];
            values.push((function(object) {
              var column, _j, _len1;
              for (_j = 0, _len1 = object.length; _j < _len1; _j++) {
                column = object[_j];
                if (column.length > 0) {
                  return column;
                }
              }
            })(object));
          }
          return _this.renderValues(values);
        });
      });
      return this;
    };
  
    TablePopoverView.prototype.renderValues = function(values) {
      return $(this.el).find('div.values').html(this.template("popover.values", {
        'values': values,
        'type': this.type,
        'valuesLimit': this.valuesLimit
      }));
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
  
    TablePopoverView.prototype.close = function() {
      return $(this.el).remove();
    };
  
    return TablePopoverView;
  
  })(Backbone.View);
  

  /* View maintaining Chart Widget.
  */
  
  var ChartView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  ChartView = (function(_super) {
  
    __extends(ChartView, _super);
  
    ChartView.name = 'ChartView';
  
    function ChartView() {
      this.formAction = __bind(this.formAction, this);
  
      this.barAction = __bind(this.barAction, this);
      return ChartView.__super__.constructor.apply(this, arguments);
    }
  
    ChartView.prototype.events = {
      "change div.form select": "formAction"
    };
  
    ChartView.prototype.initialize = function(o) {
      var k, v;
      for (k in o) {
        v = o[k];
        this[k] = v;
      }
      return this.render();
    };
  
    ChartView.prototype.render = function() {
      var chart, data, legend, settings, v, _i, _len, _ref;
      $(this.el).html(this.template("chart", {
        "title": this.options.title ? this.response.title : "",
        "description": this.options.description ? this.response.description : "",
        "notAnalysed": this.response.notAnalysed
      }));
      if (this.response.filterLabel != null) {
        $(this.el).find('div.form form').append(this.template("extra", {
          "label": this.response.filterLabel,
          "possible": this.response.filters.split(','),
          "selected": this.response.filterSelectedValue
        }));
      }
      if (this.response.results.length > 1) {
        data = [];
        _ref = this.response.results.slice(1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          data.push({
            'description': v[0],
            'data': [v[1], v[2]]
          });
        }
        chart = new Chart.Column({
          'el': $(this.el).find("div.content div.chart"),
          'data': data,
          'width': 460,
          'onclick': this.barAction,
          'isStacked': this.response.chartType === 'BarChart',
          'axis': {
            'horizontal': this.response.domainLabel,
            'vertical': this.response.type + ' Count'
          }
        });
        legend = new Chart.Legend({
          'el': $(this.el).find("div.content div.legend"),
          'chart': chart,
          'series': [this.response.results[0][1], this.response.results[0][2]]
        });
        legend.render();
        settings = new Chart.Settings({
          'el': $(this.el).find("div.content div.settings"),
          'chart': chart,
          'legend': legend,
          'isStacked': this.response.chartType === 'BarChart'
        });
        settings.render();
        chart.height = $(this.widget.el).height() - $(this.widget.el).find('div.header').height() - $(this.widget.el).find('div.content div.legend').height() - $(this.widget.el).find('div.content div.settings').height();
        return chart.render();
      } else {
        return $(this.el).find("div.content").html($(this.template("noresults")));
      }
    };
  
    ChartView.prototype.barAction = function(category, seriesIndex, value) {
      var description, quickPq, resultsPq, series, _ref;
      description = '';
      resultsPq = this.response.pathQuery;
      quickPq = this.response.simplePathQuery;
      description += category;
      resultsPq = resultsPq.replace("%category", category);
      quickPq = quickPq.replace("%category", category);
      description += ' ' + this.response.seriesLabels.split(',')[seriesIndex];
      series = (_ref = this.response.seriesValues) != null ? _ref.split(',')[seriesIndex] : void 0;
      resultsPq = resultsPq.replace("%series", series);
      quickPq = resultsPq.replace("%series", series);
      resultsPq = typeof JSON !== "undefined" && JSON !== null ? JSON.parse(resultsPq) : void 0;
      quickPq = typeof JSON !== "undefined" && JSON !== null ? JSON.parse(quickPq) : void 0;
      if (this.barView != null) {
        this.barView.close();
      }
      if (description) {
        return $(this.el).find('div.content').append((this.barView = new ChartPopoverView({
          "description": description,
          "template": this.template,
          "resultsPq": resultsPq,
          "resultsCb": this.options.resultsCb,
          "listCb": this.options.listCb,
          "matchCb": this.options.matchCb,
          "quickPq": quickPq,
          "imService": this.widget.imService,
          "type": this.response.type
        })).el);
      }
    };
  
    ChartView.prototype.formAction = function(e) {
      this.widget.formOptions[$(e.target).attr("name")] = $(e.target[e.target.selectedIndex]).attr("value");
      return this.widget.render();
    };
  
    return ChartView;
  
  })(Backbone.View);
  

  /* Enrichment Widget table row matches box.
  */
  
  var EnrichmentPopoverView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  
  EnrichmentPopoverView = (function(_super) {
  
    __extends(EnrichmentPopoverView, _super);
  
    EnrichmentPopoverView.name = 'EnrichmentPopoverView';
  
    function EnrichmentPopoverView() {
      this.listAction = __bind(this.listAction, this);
  
      this.resultsAction = __bind(this.resultsAction, this);
  
      this.matchAction = __bind(this.matchAction, this);
  
      this.getPq = __bind(this.getPq, this);
  
      this.toggle = __bind(this.toggle, this);
  
      this.renderValues = __bind(this.renderValues, this);
  
      this.render = __bind(this.render, this);
      return EnrichmentPopoverView.__super__.constructor.apply(this, arguments);
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
      var pq, values,
        _this = this;
      $(this.el).css({
        'position': 'relative'
      });
      $(this.el).html(this.template("popover", {
        "description": this.description,
        "descriptionLimit": this.descriptionLimit,
        "style": this.style || "width:300px;margin-left:-300px"
      }));
      pq = typeof JSON !== "undefined" && JSON !== null ? JSON.parse(this.response['pathQueryForMatches']) : void 0;
      pq.where.push({
        "path": this.response.pathConstraint,
        "op": "ONE OF",
        "values": this.identifiers
      });
      values = [];
      this.imService.query(pq, function(q) {
        return q.rows(function(response) {
          var object, value, _i, _len;
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            object = response[_i];
            value = (function(object) {
              var column, _j, _len1, _ref;
              _ref = object.reverse();
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                column = _ref[_j];
                if (column.length > 0) {
                  return column;
                }
              }
            })(object);
            if (__indexOf.call(values, value) < 0) {
              values.push(value);
            }
          }
          return _this.renderValues(values);
        });
      });
      return this;
    };
  
    EnrichmentPopoverView.prototype.renderValues = function(values) {
      return $(this.el).find('div.values').html(this.template("popover.values", {
        'values': values,
        'type': this.response.type,
        'valuesLimit': this.valuesLimit
      }));
    };
  
    EnrichmentPopoverView.prototype.toggle = function() {
      return $(this.el).toggle();
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
  

  /* View maintaining Enrichment Widget.
  */
  
  var EnrichmentView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  EnrichmentView = (function(_super) {
  
    __extends(EnrichmentView, _super);
  
    EnrichmentView.name = 'EnrichmentView';
  
    function EnrichmentView() {
      this.viewAction = __bind(this.viewAction, this);
  
      this.exportAction = __bind(this.exportAction, this);
  
      this.selectAllAction = __bind(this.selectAllAction, this);
  
      this.formAction = __bind(this.formAction, this);
  
      this.renderTableBody = __bind(this.renderTableBody, this);
  
      this.renderTable = __bind(this.renderTable, this);
  
      this.renderToolbar = __bind(this.renderToolbar, this);
      return EnrichmentView.__super__.constructor.apply(this, arguments);
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
      $(this.el).html(this.template("enrichment", {
        "title": this.options.title ? this.response.title : "",
        "description": this.options.description ? this.response.description : "",
        "notAnalysed": this.response.notAnalysed
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
      if (this.response.results.length > 0) {
        this.renderToolbar();
        this.renderTable();
      } else {
        $(this.el).find("div.content").html($(this.template("noresults")));
      }
      return this;
    };
  
    EnrichmentView.prototype.renderToolbar = function() {
      return $(this.el).find("div.actions").html($(this.template("actions", {
        "disabled": this.collection.selected().length === 0
      })));
    };
  
    EnrichmentView.prototype.renderTable = function() {
      var height, i, table, _fn, _i, _ref,
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
      for (i = _i = 0, _ref = this.response.results.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
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
  
    EnrichmentView.prototype.renderTableBody = function(table) {
      var fragment, row, _i, _len, _ref;
      fragment = document.createDocumentFragment();
      _ref = this.collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
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
          "imService": this.widget.imService
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
      var model, pq, rowIdentifiers, _i, _len, _ref,
        _this = this;
      rowIdentifiers = [];
      _ref = this.collection.selected();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        rowIdentifiers.push(model.get('identifier'));
      }
      pq = typeof JSON !== "undefined" && JSON !== null ? JSON.parse(this.response['pathQueryForMatches']) : void 0;
      pq.where.push({
        "path": this.response.pathConstraint,
        "op": "ONE OF",
        "values": rowIdentifiers
      });
      return this.widget.imService.query(pq, function(q) {
        return q.rows(function(response) {
          var dict, ex, model, object, result, _j, _k, _len1, _len2, _ref1;
          dict = {};
          for (_j = 0, _len1 = response.length; _j < _len1; _j++) {
            object = response[_j];
            if (!(dict[object[0]] != null)) {
              dict[object[0]] = [];
            }
            dict[object[0]].push(object[1]);
          }
          result = [];
          _ref1 = _this.collection.selected();
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            model = _ref1[_k];
            result.push([model.get('description'), model.get('p-value')].join("\t") + "\t" + dict[model.get('identifier')].join(','));
          }
          if (result.length) {
            ex = new PlainExporter($(e.target), '<pre>' + result.join("\n") + '<pre>');
            return window.setTimeout((function() {
              return ex.destroy();
            }), 5000);
          }
        });
      });
    };
  
    EnrichmentView.prototype.viewAction = function() {
      var descriptions, model, rowIdentifiers, _i, _len, _ref, _ref1;
      descriptions = [];
      rowIdentifiers = [];
      _ref = this.collection.selected();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        descriptions.push(model.get('description'));
        rowIdentifiers.push(model.get('identifier'));
      }
      if (rowIdentifiers.length) {
        if ((_ref1 = this.popoverView) != null) {
          _ref1.remove();
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
          "imService": this.widget.imService
        })).el);
      }
    };
  
    return EnrichmentView;
  
  })(Backbone.View);
  

  /* Chart Widget bar onclick box.
  */
  
  var ChartPopoverView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };
  
  ChartPopoverView = (function(_super) {
  
    __extends(ChartPopoverView, _super);
  
    ChartPopoverView.name = 'ChartPopoverView';
  
    function ChartPopoverView() {
      this.close = __bind(this.close, this);
  
      this.listAction = __bind(this.listAction, this);
  
      this.resultsAction = __bind(this.resultsAction, this);
  
      this.matchAction = __bind(this.matchAction, this);
  
      this.renderValues = __bind(this.renderValues, this);
  
      this.render = __bind(this.render, this);
      return ChartPopoverView.__super__.constructor.apply(this, arguments);
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
      var values,
        _this = this;
      $(this.el).html(this.template("popover", {
        "description": this.description,
        "descriptionLimit": this.descriptionLimit,
        "style": 'width:300px'
      }));
      values = [];
      this.imService.query(this.quickPq, function(q) {
        return q.rows(function(response) {
          var object, _i, _len;
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            object = response[_i];
            values.push((function(object) {
              var column, _j, _len1;
              for (_j = 0, _len1 = object.length; _j < _len1; _j++) {
                column = object[_j];
                if (column.length > 0) {
                  return column;
                }
              }
            })(object));
          }
          return _this.renderValues(values);
        });
      });
      return this;
    };
  
    ChartPopoverView.prototype.renderValues = function(values) {
      return $(this.el).find('div.values').html(this.template("popover.values", {
        'values': values,
        'type': this.type,
        'valuesLimit': this.valuesLimit
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
  

  return {

    "InterMineWidget": InterMineWidget,
    "ChartWidget": ChartWidget,
    "TableWidget": TableWidget,
    "EnrichmentWidget": EnrichmentWidget,
    "CoreModel": CoreModel,
    "EnrichmentRowView": EnrichmentRowView,
    "TableRowView": TableRowView,
    "TableView": TableView,
    "TablePopoverView": TablePopoverView,
    "ChartView": ChartView,
    "EnrichmentPopoverView": EnrichmentPopoverView,
    "EnrichmentView": EnrichmentView,
    "ChartPopoverView": ChartPopoverView
  };
};
/* Interface to InterMine Widgets.
*/

var $, Widgets,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$ = window.jQuery || window.Zepto;

Widgets = (function() {

  Widgets.name = 'Widgets';

  Widgets.prototype.VERSION = 'd3';

  Widgets.prototype.wait = true;

  Widgets.prototype.resources = [
    {
      name: 'JSON',
      path: 'http://cdnjs.cloudflare.com/ajax/libs/json3/3.2.2/json3.min.js',
      type: 'js'
    }, {
      name: "jQuery",
      path: "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js",
      type: "js",
      wait: true
    }, {
      name: "_",
      path: "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js",
      type: "js",
      wait: true
    }, {
      name: "Backbone",
      path: "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js",
      type: "js",
      wait: true
    }, {
      name: "d3",
      path: "http://aragorn:1111/js/d3.v2.js",
      type: "js"
    }, {
      path: "https://raw.github.com/alexkalderimis/imjs/master/src/model.js",
      type: "js"
    }, {
      path: "https://raw.github.com/alexkalderimis/imjs/master/src/query.js",
      type: "js"
    }, {
      path: "https://raw.github.com/alexkalderimis/imjs/master/src/service.js",
      type: "js"
    }, {
      path: "http://canvg.googlecode.com/svn/trunk/rgbcolor.js",
      type: "js"
    }, {
      path: "http://canvg.googlecode.com/svn/trunk/canvg.js",
      type: "js"
    }
  ];

  function Widgets(service, token) {
    var _this = this;
    this.service = service;
    this.token = token != null ? token : "";
    this.all = __bind(this.all, this);

    this.table = __bind(this.table, this);

    this.enrichment = __bind(this.enrichment, this);

    this.chart = __bind(this.chart, this);

    intermine.load(this.resources, function() {
      $ = window.jQuery;
      __extends(o, factory(window.Backbone));
      return _this.wait = false;
    });
  }

  Widgets.prototype.chart = function() {
    var opts,
      _this = this;
    opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (this.wait) {
      return window.setTimeout((function() {
        return _this.chart.apply(_this, opts);
      }), 0);
    } else {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(o.ChartWidget, [this.service, this.token].concat(__slice.call(opts)), function(){});
    }
  };

  Widgets.prototype.enrichment = function() {
    var opts,
      _this = this;
    opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (this.wait) {
      return window.setTimeout((function() {
        return _this.enrichment.apply(_this, opts);
      }), 0);
    } else {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(o.EnrichmentWidget, [this.service, this.token].concat(__slice.call(opts)), function(){});
    }
  };

  Widgets.prototype.table = function() {
    var opts,
      _this = this;
    opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (this.wait) {
      return window.setTimeout((function() {
        return _this.table.apply(_this, opts);
      }), 0);
    } else {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(o.TableWidget, [this.service, this.token].concat(__slice.call(opts)), function(){});
    }
  };

  Widgets.prototype.all = function(type, bagName, el, widgetOptions) {
    var _this = this;
    if (type == null) {
      type = "Gene";
    }
    if (this.wait) {
      return window.setTimeout((function() {
        return _this.all(type, bagName, el, widgetOptions);
      }), 0);
    } else {
      return $.ajax({
        url: "" + this.service + "widgets",
        dataType: "jsonp",
        success: function(response) {
          var widget, widgetEl, _i, _len, _ref, _results;
          if (response.widgets) {
            _ref = response.widgets;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              widget = _ref[_i];
              if (!(__indexOf.call(widget.targets, type) >= 0)) {
                continue;
              }
              widgetEl = widget.name.replace(/[^-a-zA-Z0-9,&\s]+/ig, '').replace(/-/gi, "_").replace(/\s/gi, "-").toLowerCase();
              $(el).append($('<div/>', {
                id: widgetEl,
                "class": "widget span6"
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
            "class": "alert alert-error",
            html: "" + xhr.statusText + " for <a href='" + _this.service + "widgets'>" + _this.service + "widgets</a>"
          }));
        }
      });
    }
  };

  return Widgets;

})();

if (!window.intermine) {
  throw 'You need to include the InterMine API Loader first!';
} else {
  window.intermine.widgets = Widgets;
}

}).call(this);