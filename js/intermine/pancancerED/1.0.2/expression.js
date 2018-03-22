/* script to be used by the report page of thalemine (report.jsp), if gene or transcript
//
// INPUT:   - the gene id (primaryIdentifier) or list name
//          - the mine url (if not present, defaults to araport)
//          - the id of the svg element (from the calling page)
//
// OUTPUT:  heat map
//          colouring is done using the log2(level+1)
//          the mouse over displays the actual value of level
//
// TODO: - add bands for tissues (and revert to sra for x axis?)
//
*/

// DEFAULTS
var DEFAULT_MINEURL = "https://apps.araport.org/thalemine/";
var DEFAULT_ID = "AT3G24650";
var DEFAULT_SVG = "echart";
var DEFAULT_TYPE = "Gene";

if(typeof mineUrl === 'undefined'){
   mineUrl = DEFAULT_MINEURL;
 };

if(typeof queryId === 'undefined'){
   queryId = DEFAULT_ID;
 };

if(typeof svgId === 'undefined'){
   svgId = DEFAULT_SVG;
 };

if(typeof type === 'undefined'){
   type  = DEFAULT_TYPE;
 };

var constraintOp = '=';
var constraintPath = 'primaryIdentifier';

if(typeof listName != 'undefined'){ // set only on a bagDetails page
    queryId = listName;
    constraintOp = 'IN';
    constraintPath = type;
 };

console.log(type + ": " + svgId + " " + mineUrl + " " + queryId + " (" + constraintOp + " " + constraintPath + ")");

// QUERY (valid both for list and id)

//<query name="" model="genomic"
//view="Gene.primaryIdentifier
//Gene.PanCancerExpressions.expressionLevel Gene.PanCancerExpressions.unit
//Gene.PanCancerExpressions.experiment.tissue" longDescription=""
//sortOrder="Gene.primaryIdentifier asc">
//</query>


var query    = {
  "from": type,
  "select": [
    "symbol",
    "secondaryIdentifier",
    "PanCancerExpressions.expressionLevel",
    "PanCancerExpressions.unit",
    "PanCancerExpressions.experiment.tissueType",
    "PanCancerExpressions.experiment.tissue",
    "PanCancerExpressions.experiment.location"
    ,"PanCancerExpressions.experiment.id"
  ],
  "orderBy": [
    {
      "path": "symbol",
      "direction": "ASC"
    },
    {
      "path": type + ".PanCancerExpressions.experiment.tissue",
      "direction": "ASC"
    }
    ,{
      "path": type + ".PanCancerExpressions.experiment.tissueType",
      "direction": "ASC"
    }
    ,{
      "path": type + ".PanCancerExpressions.experiment.location",
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
//var EPORTAL = "portal.do?class=PanCancerExperiment&externalids=";
var EPORTAL = "report.do?id=";

var svg = d3.select("#" + svgId);

//var colors = d3.scale.category20c();
// will be set according to range
var color = null;

// the display units:
var barHeight = 20;
var legendCells = 8;

var halfBar = barHeight/2;
var cellWidth = halfBar; // default value

// margins
var margin = {left: 5*barHeight, top: 3*barHeight, right: 3*barHeight, bottom: 4*barHeight};

// Original Width
var width = parseInt(svg.style("width"));

// Store our scale so that it's accessible by all:
var x = null;
var z = null;
var y = null;

var geneNr = null;
var tissueNr = null;
var sampleNr = null;

var xAxis = null;
var yAxis = null;
var linearLegend = null;
var legendLinear = null;

// rendering function ----------------------------------------
var render = function() {

  // when no results don't display anything
  svg.attr("height", 0);

  if (data.length == 0) {return};

  // preliminary setting
  var maxE = d3.max(data, function(d) { return +d[2];} );
  var max = d3.max(data, function(d) { return Math.log2(d[2]+1);} );
  geneNr = d3.map(data, function(d){return d[0];}).size();
  tissueNr = d3.map(data, function(d){return d[5];}).size();
  sampleNr = data.length/geneNr;
  xNr = d3.map(data, function(d){return d[4];}).size();

console.log("s:" + sampleNr + " t:" + tissueNr + " g:" + geneNr + " x:" + xNr + " Max:" + maxE + " log:" + max);

  if (geneNr == 1 ) {
  // adjust margins (no y labels)
    margin.left = barHeight;
    margin.right = 2*barHeight;

  // Build the report header
    head = svg.append('foreignObject')
      .attr("class", "myheader")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', 2*barHeight)
      //.attr('fill', )
      .append("xhtml:body")
      .html('<h3 class="goog"> ' + sampleNr + ' Sites PanCancer Expression - source: <a href="https://dcc.icgc.org/pcawg">PCAWG</a></h3>\
             <p> <p>');
}

  var color = d3.scale.linear()
    .domain([0, max])
    .range(["yellow", "blue"]);
    //.range(["palegreen", "red"]);

  // Size our SVG tall enough so that it fits each bar.
  // Width was already defined when we loaded.
  svg.attr("height", margin.top + (barHeight * geneNr) + margin.bottom + 2*barHeight);
  cellWidth=((width - margin.right -margin.left -2*barHeight)/sampleNr);

  // Coerce data to the appropriate types.
  data.forEach(function(d) {
    d.ens = d[1];
    d.symbol = d[0];
    d.level = +d[2];
    d.tissue = d[5];
    if (d[6] == null) {d.loc = ""} else {d.loc = " " + d[6]};
    d.expid = +d[7];
  });

 // Compute the scale domains and set the ranges
  z = d3.scale.linear().range("white", "blue"); //?
  z.domain([0, d3.max(data, function(d) { return Math.log2(d[2]+1); })]);

  //x = d3.scale.linear().range([0, width]);
  //x.domain(d3.extent(data, function(d) { return d[4]; }));

// HARD CODED for the tissues!!
if (mineUrl.includes("thalemine")) {
  x = d3.scale.ordinal()
    .domain(d3.map(data, function(d){return d[5]}).keys())
    .range([0, 7*cellWidth, 9*cellWidth, 16*cellWidth, 40*cellWidth, 85*cellWidth, 87*cellWidth, 96*cellWidth, 103*cellWidth, 106*cellWidth, 110*cellWidth, sampleNr*cellWidth])
  ;
} else if (mineUrl.includes("storm")) {
//          tissue         | count
// ------------------------+-------
//  blood                  |     4
//  brain                  |    15
//  breast                 |     4
//  esophagus              |     4
//  kidney                 |     5
//  large intestine        |     3
//  liver                  |     5
//  lung                   |     5
//  mouth mucosa           |     3
//  ovary                  |     2
//  pancreas               |     2
//  prostate gland         |     3
//  skeletal muscle tissue |     2
//  skin                   |     3
//  stomach                |     3
//  thyroid gland          |     3
//  urinary bladder        |     3
//  uterine cervix         |     4
//  uterus                 |     3
x = d3.scale.ordinal()
  .domain(d3.map(data, function(d){return d[5]}).keys())
  .range([0, 4*cellWidth, 19*cellWidth, 23*cellWidth, 27*cellWidth, 32*cellWidth,
     35*cellWidth, 40*cellWidth, 45*cellWidth, 48*cellWidth, 50*cellWidth,
     52*cellWidth, 55*cellWidth, 57*cellWidth, 60*cellWidth, 63*cellWidth,
     66*cellWidth, 69*cellWidth, 73*cellWidth, sampleNr*cellWidth])
} else {
/* generic version with the sample id */
  x = d3.scale.ordinal()
   .domain(d3.map(data, function(d){return d[4]}).keys())
   .rangeBands([0, sampleNr*cellWidth]);
}

  y = d3.scale.ordinal()
   .domain(d3.map(data, function(d){return d[1];}).keys())
   .rangeRoundBands([0, geneNr*barHeight]);
  ;

//console.log("x: " + d3.extent(data, function(d) { return d[4]; }));
//console.log("y: " + d3.extent(data, function(d) { return d[0]; }));
//console.log("z: " + d3.extent(data, function(d) { return Math.log2(d[2]+1); }));

  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    ;

  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    ;

// Draw our elements!!

// BOX
  svg.append("rect")
    .attr("class", "boundingbox")
    .attr("x", 0)
    .attr("y", (margin.top - barHeight))
    .attr("height", (margin.top + barHeight*geneNr + margin.bottom))
    .attr("width", width - halfBar)
    .style("stroke", "grey")
    .style("fill", "none")
    //.style("stroke-width", 1)
    ;

  var bar = svg.selectAll("g")
    .data(data)

  // New bars:
  bar.enter().append("g")
    .attr("class", "exbar")
    .attr("transform", function(d, i) {
      return "translate("+(margin.left + (i%sampleNr)*cellWidth) + "," + (margin.top + barHeight*Math.floor(i/sampleNr) ) + ")";
    });

  bar.append("a")
    .on("mouseover", function(d, i){
      d3.select(this)
        .attr({"xlink:href": mineUrl + EPORTAL + d[7]})
        //.attr({"xlink:title": d[0] + "[" + d[1] + "]" + " - " + d[4] + " " + d[6] + " [" + d[5] + "]: " + d[2]});
        .attr({"xlink:title": d[0] + " > " + d[4] + d.loc + ", " + d[5] + ":  " + d[2]});
    })
    .append("rect")
    .attr("width", cellWidth)
    .attr("height", barHeight - 1)
    //.style("fill", function(d) { return color(d[2])});
    .style("fill", function(d) { return color(Math.log2(d[2]+1))});

// X AXIS
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", function() {
      return "translate( " + margin.left + "," + (margin.top + geneNr*barHeight) + ")"})
      .style("shape-rendering", "crispEdges")
      //.attr("ticks", tissueNr)
      .call(xAxis)

    .selectAll("text")
      .attr("class", "xticks")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)" )
    // to link from axis labels
    // removed because we are displaying an attribute (tissue)
    //
    //  .filter(function(d){ return typeof(d) == "string"; })
    //  .style("cursor", "pointer")
    //  .on("click", function(d){
    //    document.location.href = mineUrl + EPORTAL + d;
    //  })
   ;

   /* not working, to add bars
   var xAxisGrid = xAxis.ticks(tissueNr)
    .tickSize(-geneNr*barHeight, 0)
    .tickFormat("")
    //.stroke("blue")
    //.stroke-width("3px")
    .orient("top")
    ;
   svg.append("g")
    .classed('x', true)
    .classed('grid', true)
    .call(xAxisGrid)
    ;
*/

 // Y AXIS

 if (geneNr > 1 ) { // don't display if only 1 row
  svg.append("g")
     .attr("class", "y axis")
     .attr("transform", function() {
        return "translate(" + margin.left + "," + margin.right  + ")"})
     .call(d3.svg.axis().scale(y).orient("left"))
     .call(yAxis)
     .selectAll("text")
     .filter(function(d){ return typeof(d) == "string"; })
     .style("cursor", "pointer")
    //  .on("mouseover", function(d, i){
    //    d3.select(this)
    //       .attr({"xlink:href": mineUrl + GPORTAL + d[0]})
    //       .attr({"xlink:title": d[1] + "AAA"});
    //   })

    //.on("mouseover", function(d){ d3.select(this).attr({"xlink:title": "AAAA" })})

    .on("click", function(d){ document.location.href = mineUrl + GPORTAL + d; })

    // NOTE: we set the axis 'unit' at line 239, here we have just the string if the data item (e.i. ENS id, or sumbol)
    // so we cannot display symbol and use ENS id to link:TODO
  ;
}

// LEGEND
// using d3-legend

  linearLegend = d3.scale.linear()
    .domain([0,maxE])
    //.range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);
    .range(["yellow", "blue"]);

  svg.append("g")
    .attr("class", "legendLinear")
//    .attr("transform", "translate(" + (margin.left + 40*cellWidth) +","+ (barHeight*geneNr + 2*margin.top) +")")
    .attr("transform", "translate(" + (margin.left + sampleNr*cellWidth + halfBar) +","+ (margin.top) +")")
    .style("font-size", halfBar+"px")
    ;

  legendLinear = d3.legend.color()
    .shapeWidth(halfBar)
    .shapeHeight(halfBar)
    .cells(legendCells)
    //.orient('horizontal')
    .ascending('true')
    .labelOffset(5)
    //.labelFormat(d3.format("f"))  // no decimal
    .title("TPM")
    .scale(linearLegend)
    ;

  svg.select(".legendLinear")
    .call(legendLinear);

  // Explanatory text
   svg.append("text")
    .attr("class", "note1")
    .attr("x", margin.left)
    .attr("y", barHeight*(geneNr + 1) + 2*margin.top)
    .style("font-size", 1.2*halfBar+"px")
    .style("fill", "gray")
    .text("Levels expressed in Transcript Per Million (TPM).")
    ;
   svg.append("text")
    .attr("class", "note2")
    .attr("x", margin.left)
    .attr("y", barHeight*(geneNr+2) + 2*margin.top)
    .style("font-size", 1.2*halfBar+"px")
    .style("fill", "gray")
    .text("The colouring is a log2 scale of TPM.")
    ;

}

var rescale = function() {

  // The new width of the SVG element
  var newwidth = parseInt(svg.style("width"));

 // Our input hasn't changed (domain) but our range has. Rescale it!
  //x.range([0, newwidth]);
  cellWidth=((newwidth - margin.right - margin.left - 2*barHeight)/sampleNr);
  x.rangeBands([0,sampleNr*cellWidth]);

  // Use our existing data:
  var bar = svg.selectAll(".exbar").data(data)

  bar.attr("transform", function(d,i) {
        return "translate("+(margin.left + (i%sampleNr)*cellWidth) + "," + (margin.top + barHeight*Math.floor(i/sampleNr) ) + ")";
      });

  // For each bar group, select the rect and reposition it using the new scale.
  bar.select("rect")
      .attr("width", cellWidth)
      .attr("height", barHeight - 1)
      ;

  // resize the bounding box
  var bb = svg.select(".boundingbox").attr("width", (newwidth -halfBar));

  // resize the x axis
  xAxis.scale(x);
  //x.range([0, 7*cellWidth, 9*cellWidth, 16*cellWidth, 40*cellWidth, 85*cellWidth, 87*cellWidth, 96*cellWidth, 103*cellWidth, 106*cellWidth, 110*cellWidth, sampleNr*cellWidth])
  x.range([0, 4*cellWidth, 19*cellWidth, 23*cellWidth, 27*cellWidth, 32*cellWidth, 35*cellWidth,
    40*cellWidth, 45*cellWidth, 48*cellWidth, 50*cellWidth, 52*cellWidth, 55*cellWidth, 57*cellWidth,
    60*cellWidth, 63*cellWidth, 66*cellWidth, 69*cellWidth, 73*cellWidth, sampleNr*cellWidth])
    ;
  svg.select(".x.axis")
    .attr("transform", function() {
      return "translate( " + margin.left + "," + (margin.top + geneNr*barHeight) + ")"})
    .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")

      .filter(function(d){ return typeof(d) == "string"; })
       .style("cursor", "pointer")
       .on("click", function(d){
        document.location.href = mineUrl + EPORTAL + d;
    })
;

// resize legend
svg.select(".legendLinear")
//   .attr("transform", "translate(" + (margin.left + 40*cellWidth) +","+ (barHeight*geneNr + 2*margin.top) +")")
    .attr("transform", "translate(" + (margin.left + sampleNr*cellWidth + halfBar) +","+ (margin.top) +")")
   .call(
     d3.legend.color()
    .shapeWidth(halfBar)
    .shapeHeight(halfBar)
    .cells(legendCells)
    .ascending('true')
    .labelOffset(5)
    //.orient('horizontal')
    //.labelFormat(d3.format("f"))  // no decimal
    .title("TPM")
    .scale(linearLegend)
   );

  // resize the header
  head = svg.select(".myheader").attr("width",newwidth);

  // resize the notes (only x changes)
  svg.select(".note1")
    .attr("x", margin.left + 40*cellWidth)
    ;
   svg.select(".note2")
    .attr("x", margin.left + 40*cellWidth)
    ;
}

// Fetch our JSON and feed it to the draw function

var myService = null;
if(typeof token === 'undefined' || token === null){
  // never happens from the webapp, just for local test
   myService = new imjs.Service({root: mineUrl + 'service/'});
 } else { // normal workings
   myService = new imjs.Service({root: mineUrl, token: token});
};

//var myService = new imjs.Service({root: mineUrl, token: token});


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
