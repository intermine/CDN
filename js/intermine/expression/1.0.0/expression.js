/* script to be used by the report page of thalemine (report.jsp), if gene or transcript
//
// INPUT:   - the gene id (primaryIdentifier) or list name
//          - the mine url (if not present, defaults to araport)
//          - the id of the svg element (from the calling page)
//
// OUTPUT:  heat map
//          colouring is done using the log(level+1)
//          the mouse over displays the actual value of level
//
// TODO: - add x axis labels (tissue)
//       - add legend ?
//
*/

// to set the mine: could be done inside js with injection
// here using a parameter from jsp
//var DEFAULT_MINEURL = "https://apps.araport.org/thalemine/";
var DEFAULT_MINEURL = "http://intermine.modencode.org/thalemineval/";
var DEFAULT_ID = "AT3G24650";
var DEFAULT_SVG = "echart";

if(typeof mineUrl === 'undefined'){
   mineUrl = DEFAULT_MINEURL;
 };

if(typeof queryId === 'undefined'){
   queryId = DEFAULT_ID;
 };

if(typeof svgId === 'undefined'){
   svgId = DEFAULT_SVG;
 };

console.log(svgId +"--"+mineUrl+"|" + queryId);

var BASEURL = mineUrl + "/service/query/results?query=";

// v4 no description

//~ var QUERYSTART = "%3Cquery%20name=%22%22%20model=%22genomic%22%20view=%22Gene.primaryIdentifier%20Gene.symbol%20Gene.RNASeqExpressions.expressionLevel%20Gene.RNASeqExpressions.unit%20Gene.RNASeqExpressions.experiment.SRAaccession%20Gene.RNASeqExpressions.experiment.tissue%22%20longDescription=%22%22%20sortOrder=%22Gene.primaryIdentifier%20asc%20Gene.RNASeqExpressions.experiment.tissue%20asc%22%3E%20%3Cconstraint%20path=%22";
var QUERYSTART = "%3Cquery%20name=%22%22%20model=%22genomic%22%20view=%22Gene.primaryIdentifier%20Gene.symbol%20Gene.RNASeqExpressions.expressionLevel%20Gene.RNASeqExpressions.unit%20Gene.RNASeqExpressions.experiment.SRAaccession%20Gene.RNASeqExpressions.experiment.tissue%22%20longDescription=%22%22%20sortOrder=%22Gene.primaryIdentifier%20asc%20Gene.RNASeqExpressions.experiment.tissue%20asc%20Gene.RNASeqExpressions.experiment.SRAaccession%20asc%22%3E%20%3Cconstraint%20path=%22";

var IDS="Gene.primaryIdentifier%22%20op=%22=%22%20value=%22"

var LIST="Gene%22%20op=%22IN%22%20value=%22"

var qType=IDS;  // default query type: ids

var QUERYEND="%22/%3E%20%3C/query%3E";

if(typeof listName != 'undefined'){ // set only on a bagDetails page
    qType = LIST;
    queryId = listName;
 };

var query = BASEURL + QUERYSTART + qType + queryId + QUERYEND;

var GPORTAL = "portal.do?class=Gene&externalids=";
var EPORTAL = "portal.do?class=RnaseqExperiment&externalids=";

var svg = d3.select("#" + svgId);

//var colors = d3.scale.category20c();
// will be set according to range
var color = null;

// the display unit:
var barHeight = 20;

var cellWidth = 10;

// margins
var margin = {left: 4*barHeight, top: 3*barHeight, right: 3*barHeight, bottom: 4*barHeight};

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
    margin.left = barHeight;
    margin.right = 2*barHeight;
  }

  var color = d3.scale.linear()
    .domain([0, max])
    //.range(["lightgray", "green"]);
    .range(["palegreen", "red"]);

  // Build the report header
    head = svg.append('foreignObject')
      .attr("class", "myheader")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', barHeight)
      //.attr('fill', )
      .append("xhtml:body")
      .html('<h3 class="goog"> ' + sampleNr + ' Samples RNA Seq Expressions - source: Araport</h3>\
             <p> <p>');

  // Size our SVG tall enough so that it fits each bar.
  // Width was already defined when we loaded.
  svg.attr("height", margin.top + (barHeight * geneNr) + margin.bottom + barHeight);
  cellWidth=((width - margin.right -margin.left)/sampleNr);

  // Coerce data to the appropriate types. NOT USED
  data.forEach(function(d) {
    d.sra = +d[4];
    d.gene = +d[0];
    d.level = +d[2];
    d.tissue = +d[5];
  });

  // Compute the scale domains and set the ranges

  x = d3.scale.linear().range([0, width]);
  z = d3.scale.linear().range("white", "blue"); //?

  x.domain(d3.extent(data, function(d) { return d[4]; }));
  z.domain([0, d3.max(data, function(d) { return Math.log2(d[2]+1); })]);

  x = d3.scale.ordinal()
   .domain(d3.map(data, function(d){return d[4]}).keys())
   .rangeBands([0, sampleNr*cellWidth]);
//   .rangeRoundBands([0, sampleNr*cellWidth]);
  ;

  y = d3.scale.ordinal()
   .domain(d3.map(data, function(d){return d[0];}).keys())
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
      .attr("width", width - 2*cellWidth)
      .style("stroke", "grey")
      .style("fill", "none")
      //.style("stroke-width", 1)
      ;

  var bar = svg.selectAll("g")
      .data(data)

  // New bars:
  bar.enter().append("g")
      .attr("class", "proteinbar")
      .attr("transform", function(d, i) {
         return "translate("+(margin.left + (i%sampleNr)*cellWidth) + "," + (margin.top + barHeight*Math.floor(i/sampleNr) ) + ")";
     });

  bar.append("a")
    .on("mouseover", function(d, i){
      d3.select(this)
          .attr({"xlink:href": mineUrl + EPORTAL + d[4]})
          .attr({"xlink:title": d[0] +" - " + d[4] + " (" + d[5] + "): " + d[2]});
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
//      return "translate( 0 " + "," + (margin.top + geneNr*barHeight) + ")"})
      //.style("stroke", "blue")
      //.style("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      //.attr("ticks", tissueNr)
      .call(xAxis)
      .selectAll("text")
        .attr("class", "xticks")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" )

      .filter(function(d){ return typeof(d) == "string"; })
       .style("cursor", "pointer")
       .on("click", function(d){
        document.location.href = mineUrl + EPORTAL + d;
    })

// NOT USED
    //~ .append("text")
      //~ .attr("class", "xlabel")
      //~ .attr("x", margin.left + sampleNr*cellWidth)
      //~ .attr("y", margin.top + (geneNr+1)*barHeight)
      //~ .attr("text-anchor", "end")
      //~ .text("SRA (by tissue)")
      //~ .attr("transform", "rotate(-5)" )
      ;

 if (geneNr > 1 ) { // don't display if only 1 row

  // Y AXIS
  svg.append("g")
     .attr("class", "y axis")
     .attr("transform", function() {
        return "translate(" + margin.left + "," + margin.right  + ")"})
     .call(d3.svg.axis().scale(y).orient("left"))
     .call(yAxis)
     .selectAll("text")
      .filter(function(d){ return typeof(d) == "string"; })
      .style("cursor", "pointer")
      .on("click", function(d){ document.location.href = mineUrl + GPORTAL + d; })
  // label
    //~ .append("text")
      //~ .attr("class", "ylabel")
      //~ .attr("x", margin.right)
      //~ .attr("y", margin.top )
      //~ // .attr("y", function(d, i) { return (2*margin.top + barHeight*Math.floor(i/sampleNr))})
      //~ .attr("text-anchor", "beginning")
      //~ .text("GENE")
      ;

}



// Add a legend for the color values.
  //~ var legend = svg.selectAll(".legend")
      //~ .data(z.ticks(5).slice(1).reverse())
    //~ .enter().append("g")
      //~ .attr("class", "legend")
      //.attr("transform", function(d, i) { return "translate(" + (20 + i * 20) + "," + (barHeight*geneNr + 44) + ")"; });
      //~ .attr("transform", function(d, i) { return "translate(" + 0 + "," + (20 + i * 20) + ")"; })
      //~ ;
//~
  //~ legend.append("rect")
      //~ .attr("width", cellWidth*2)
      //~ .attr("height", 10)
      //~ //.style("fill", function(d) { return color(d[2])})
      //~ .style("fill", "red")
      //~ ;
//~
  //~ legend.append("text")
      //~ .attr("x", 66)
      //~ .attr("y", barHeight*geneNr + margin.top + barHeight)
      //~ .attr("dy", ".35em")
      //~ .text(String);
//~
  //~ svg.append("text")
      //~ .attr("class", "label")
      //~ .attr("x", 0)
      //~ .attr("y", barHeight*geneNr + margin.top + 2*barHeight)
      //~ .attr("dy", ".35em")
      //~ .text("Count");


 var legendRectSize = barHeight/2
 var legendSpacing = legendRectSize/2;


        var legend = svg.selectAll('.legend')                     // NEW
          .data(color.domain())                                   // NEW
          .enter()                                                // NEW
          .append('g')                                            // NEW
          .attr('class', 'legend')                                // NEW
          .attr('transform', function(d, i) {                     // NEW
            var h = barHeight + i * 3 * barHeight ;                       // NEW
            var v = barHeight*geneNr + margin.top + margin.bottom;
            return 'translate(' + h + ',' + v + ')';        // NEW
          });                                                     // NEW

        legend.append('rect')                                     // NEW
          .attr('width', legendRectSize)                          // NEW
          .attr('height', legendRectSize)                         // NEW
          .style('fill', color)                                   // NEW
          .style('stroke', color);                                // NEW

        legend.append('text')                                     // NEW
          .attr('x', legendRectSize + legendSpacing)              // NEW
          .attr('y', legendRectSize )
          .style("font-size","14px")
          .text(function(d) { return (Math.pow(2, d) -1).toFixed(2); });

// legend box
    svg.append("rect")
      .attr("class", "legendbox")
      .attr("x", legendRectSize)
      .attr("y", barHeight*geneNr + 2*margin.top +barHeight/2)
      .attr("height", 1.5*barHeight)
      .attr("width", 7*barHeight)
      .style("stroke", "grey")
      .style("fill", "none")
      //.style("stroke-width", 1)
      ;

}

var rescale = function() {

  // The new width of the SVG element
  var newwidth = parseInt(svg.style("width"));

 // Our input hasn't changed (domain) but our range has. Rescale it!
  //x.range([0, newwidth]);
  cellWidth=((newwidth - margin.right - margin.left)/sampleNr);
  x.rangeBands([0,sampleNr*cellWidth]);

  // Use our existing data:
  var bar = svg.selectAll(".proteinbar").data(data)

  bar.attr("transform", function(d,i) {
        return "translate("+(margin.left + (i%sampleNr)*cellWidth) + "," + (margin.top + barHeight*Math.floor(i/sampleNr) ) + ")";
      });

  // For each bar group, select the rect and reposition it using the new scale.
  bar.select("rect")
      .attr("width", cellWidth)
      .attr("height", barHeight - 1)
      ;

  // Also reposition the bars using the new scales.
  //~ bar.select("text")
      //~ .attr("x", function(d,i) { return i*cellWidth; })
      //~ .attr("y", barHeight / 2)
      //~ .attr("dy", ".15em")
      //~ .text(function(d) { return (d[2])});

  // resize the bounding box
  var bb = svg.select(".boundingbox").attr("width", (newwidth -2*cellWidth));

  // resize the x axis
  xAxis.scale(x);
  svg.select(".x.axis")
    .attr("transform", function() {
      return "translate( " + margin.left + "," + (margin.top + geneNr*barHeight) + ")"})
    .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")
  ;

// re position the label
svg.select(".xlabel")
    .attr("x", margin.left + sampleNr*cellWidth)
    .text("SRA (by tissue)");

  // resize the header
  head = svg.select(".myheader").attr("width",newwidth);

}

// Fetch our JSON and feed it to the draw function

// d3.json("data.json", function(returned) {
//   data = returned.results;
//   render();
// });

d3.json(query, function(returned) {
  data = returned.results;
  render();
});


// Rescale it when the window resizes:
d3.select(window).on("resize", rescale);
