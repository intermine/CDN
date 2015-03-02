lib = process.env.IMJS_COV ? '../build-cov' : '../build';

var m = require(lib + '/model');
var q = require(lib + '/query');
var s = require(lib + '/service');
var v = require(lib + '/version');

exports.Model = m.Model;
exports.Query = q.Query;
exports.Service = s.Service;
exports.VERSION = v.VERSION;
