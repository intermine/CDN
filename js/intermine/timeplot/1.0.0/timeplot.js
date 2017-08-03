/* script to be used by the report page of rumenmine (report.jsp)
//
// INPUT:   - the gene id (primaryIdentifier)
//          - the mine url (if not present, defaults to rumenmine)
// OUTPUT:  bar chart displaying the various expression levels grouped by
//          replicates
//
*/

// to set the mine: could be done inside js with injection
// here using a parameter from jsp


// DEFAULTS
var DEFAULT_MINEURL = "http://rumenmine-dev.ibers.aber.ac.uk/rumenmine-dev";
var DEFAULT_ID = "p15539";
var DEFAULT_SVG = "tchart";
var DEFAULT_TYPE = "Gene";
var DEFAULT_REPLICATE = 3; // use for groups

if(typeof mineUrl === 'undefined'){
   mineUrl = DEFAULT_MINEURL;
 };

if(typeof queryId === 'undefined'){
   queryId = DEFAULT_ID;
 };

//if(typeof svgId === 'undefined'){
   svgId = DEFAULT_SVG;
// };

if(typeof type === 'undefined'){
   type  = DEFAULT_TYPE;
 };

if(typeof replicatesNr === 'undefined'){
   replicatesNr  = DEFAULT_REPLICATE;
 };


var constraintOp = '=';
var constraintPath = 'primaryIdentifier';

// to rm
if(typeof listName != 'undefined'){ // set only on a bagDetails page
    queryId = listName;
    constraintOp = 'IN';
    constraintPath = type;
 };

console.log(type + ": " + svgId + " " + mineUrl + " " + queryId + " (" + constraintOp + " " + constraintPath + ")");

// QUERY (valid both for list and id)
var query    = {
  "from": type,
  "select": [
    "primaryIdentifier",
    "symbol",
    "RNASeqExpressions.expressionLevel",
    "RNASeqExpressions.unit",
    "RNASeqExpressions.experiment.SRAaccession",
    "RNASeqExpressions.experiment.timePoint",
    "RNASeqExpressions.experiment.tissue"
  ],
  "orderBy": [
    {
      "path": "primaryIdentifier",
      "direction": "ASC"
    },
    {
      "path": type + ".RNASeqExpressions.experiment.timePoint",
      "direction": "ASC"
    },
    {
      "path": type + ".RNASeqExpressions.experiment.tissue",
      "direction": "ASC"
    }
  ],
  "where": [
    {
     "path": constraintPath,
      "op": constraintOp,
      "value": queryId,
      "code": "A"
    }
  ]
};


// Displayer defaults and constants
var GPORTAL = "portal.do?class=" + type + "&externalids=";
var EPORTAL = "portal.do?class=RnaseqExperiment&externalids=";

//================

var svg = d3.select("#" + svgId);
var colors = d3.scale.category20();

// margins
var margin = {top: 40, right: 180, bottom: 30, left: 60}

// Original Width
var width = parseInt(svg.style("width"));

// Store our scale so that it's accessible by all:
var x= null;
var xAxis = null;
var max = null;

// Static bar type:
var barHeight = 10;

var render = function() {

var graphW = width - margin.right; // graph width

max = d3.max(data, function(d) { return +d[2];} );
var sf = graphW/max;  //scale factor

var groups=(data.length -1)/replicatesNr;   // -1: the starting state (grass)

console.log("WWW " + width + " MAX: " + max + " -- " + groups);

  x = d3.scale.linear()
  .domain([0, d3.max(data, function(d) {return d[2]})])
  .range([0, graphW]);
  //.range([0, width]);

  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  // when no results don't display anything
  svg.attr("height", 0);

  if (data.length > 0) {

  // Build the report header
    head = svg.append('foreignObject')
      .attr("class", "myheader")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', 20)
      .append("xhtml:body")
      .html('<h3 class="goog"> ' + groups + ' Digestion Time Points </h3>\
             <p> <p>');

  // Size our SVG tall enough so that it fits each bar.
  // Width was already defined when we loaded.
  svg.attr("height", margin.top + (barHeight * (data.length + groups) + margin.bottom));
  }

  // Draw our elements!!
  var bar = svg.selectAll("g")
      .data(data)

  // New bars: note: ceil to divide by replicates
  bar.enter().append("g")
      .attr("class", "proteinbar")
      .attr("transform", function(d, i) {
        //return "translate(" + 0 + "," + (margin.top + (i * barHeight)) + ")";
        return "translate(" + margin.left + "," + (margin.top + ((i + Math.ceil(i/3)) * barHeight)) + ")";
      });

  bar.append("a")
    .on("mouseover", function(d, i){
      d3.select(this)
          .attr({"xlink:href": mineUrl + EPORTAL + d[4]})
          // p15559: Hour1 Cow2 -> 86 un
          .attr({"xlink:title":  d[0] + ": " + d[5] + " " + d[6] + " -> " + d[2] + " " + d[3]});
    })
    .append("rect")
    .attr("data-legend", function(d) { return d[6] })
    .attr("width", function(d) { return d[2]*sf })
    .attr("height", barHeight - 1)
    .style("fill", function(d, i) { return colors(d[6])});

  bar.append("a")
    .on("mouseover", function(d){
      d3.select(this)
        .attr({"xlink:href": mineUrl + EPORTAL + d[4]})
        .attr({"xlink:title":  d[0] + ": " + d[5] + " " + d[6] + " -> " + d[2] + " " + d[3]});
      })
    .append("text")
    .attr("class", "toptip")
    .attr("x", function(d) { return Math.max((d[2]*sf - 25), 0)})
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr("font-size", 1.2*barHeight + "px")
    .text(function(d) { return (d[2])});

bar.append("a")
  .on("mouseover", function(d){
    d3.select(this)
        .attr({"xlink:href": mineUrl + EPORTAL + d[4]});
    })
  .append("text")
  .attr("x", -50)
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .attr("font-size", 1.2*barHeight + "px")
  //.attr("fill", "gray")
  // group by replicates
  .text(function(d,i) { if (i == 0 || i%3 == 2) return (d[5])});

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", function(d, i) {
      //return "translate( 0 " + "," + (margin.top + (barHeight * data.length) +5 ) + ")"})
      return "translate(" + margin.left  + "," + (margin.top + (barHeight * (data.length + groups)) + 5 ) + ")"})
    .call(xAxis);

  svg.append("rect")
    .attr("class", "boundingbox")
    .attr("x", 0)
    .attr("y", (margin.top - 5))
    .attr("height", (10 + barHeight * (data.length + groups)))
    .attr("width", width -15)
    .style("stroke", "grey")
    .style("fill", "none")
    .style("stroke-width", 1);

  svg.append("g")
    .attr("class","legend")
    .attr("transform","translate(" + (margin.left + max*sf + 2*barHeight)  + "," + 2*margin.top +")")
    .style("font-size","12px")
    .call(d3.legend);

// explanatory text, when we know...
  //  svg.append("text")
  //   .attr("class", "note1")
  //   .attr("x", margin.left + max*sf + 2*barHeight)
  //   .attr("y", 3*margin.top)
  //   .style("font-size", 1.2*barHeight +"px")
  //   .style("fill", "gray")
  //   .text("Levels expressed in Transcript Per Million (TPM).")
  //   ;

}


// var range = function(d) {
//   //var beginning = x(d[0]);
//   var beginning = 0;
//   var end = x(d[2]);
//   var range = end - beginning;
//   return range;
// }

var rescale = function() {
  // The new width of the SVG element
  var newwidth = parseInt(svg.style("width"));
  var newgraphW= (newwidth - margin.right);
  var sf = newgraphW/max;

  // Our input hasn't changed (domain) but our range has. Rescale it!
  //x.range([0, newwidth]);
  x.range([0, newgraphW]);

  // Use our existing data:
  var bar = svg.selectAll(".proteinbar").data(data)

  bar.attr("transform", function(d, i) {
        return "translate(" + margin.left + "," + (margin.top + ((i + Math.ceil(i/3)) * barHeight)) + ")";
      });

  // For each bar group, select the rect and reposition it using the new scale.
  bar.select("rect")
      //.attr("width", function(d) { return range(d); })
      .attr("width", function(d) { return (sf*d[2]); })
      .attr("height", barHeight - 1)
      .style("fill", function(d, i) { return colors(d[6])});

  // reposition top text too
  bar.select(".toptip").attr("x", function(d) { return Math.max((d[2]*sf - 25), 0)});

  // Also reposition the bars using the new scales.
  // bar.select("text")
  //     //.attr("x", function(d) { return range(d) - 3; })
  //     //.attr("x", function(d) { return d[2]*sf - 3; })
  //     .attr("x", 0)
  //     .attr("y", barHeight / 2)
  //     .attr("dy", ".35em")
  //     // .text(function(d) { return (d[0] + "..." + d[1] + " " + d[2]+": " + d[3] + " " + d[4])});
  //     .text(function(d) { return (d[6] + ": " + d[2] )});

  // reposition legend
  var lb = svg.select(".legend").attr("transform","translate(" + (margin.left + max*sf + 2*barHeight)  + "," + 2*margin.top +")")

  // resize the bounding box
  var bb = svg.select(".boundingbox").attr("width", newwidth -15);

  // resize the x axis
  xAxis.scale(x);
  svg.select(".x.axis").call(xAxis);

  // resize the header
  head = svg.select(".myheader").attr("width", newwidth);

}

// Fetch our JSON and feed it to the draw function

var myService = null;
if(typeof token === 'undefined' || token === null){
  // never happens from the webapp, just for local test
   myService = new imjs.Service({root: mineUrl + 'service/'});
 } else { // normal workings
   myService = new imjs.Service({root: mineUrl, token: token});
};


myService.rows(query).then(function(rows) {
  data = rows;
  render();
});

// was:
//d3.json(query, function(returned) {
//  data = returned.results;
//  render();
//});

// Rescale it when the window resizes:
d3.select(window).on("resize", rescale);



// d3.legend.js
// (C) 2012 ziggy.jonsson.nyc@gmail.com
// MIT licence

(function() {
d3.legend = function(g) {
  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        lb = g.selectAll(".legend-box").data([true]),
        li = g.selectAll(".legend-items").data([true])

    lb.enter().append("rect").classed("legend-box",true)
    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend]").each(function() {
        var self = d3.select(this)
        items[self.attr("data-legend")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
        }
      })

    items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})


    li.selectAll("text")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return i+"em"})
        .attr("x","1em")
        .text(function(d) { ;return d.key})

    li.selectAll("circle")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("circle")})
        .call(function(d) { d.exit().remove()})
        .attr("cy",function(d,i) { return i-0.25+"em"})
        .attr("cx",0)
        .attr("r","0.4em")
        .style("fill",function(d) { console.log(d.value.color);return d.value.color})

    // Reposition and resize the box
    var lbbox = li[0][0].getBBox()
    lb.attr("x",(lbbox.x-legendPadding))
        .attr("y",(lbbox.y-legendPadding))
        .attr("height",(lbbox.height+2*legendPadding))
        .attr("width",(lbbox.width+2*legendPadding))
  })
  return g
}
})()
