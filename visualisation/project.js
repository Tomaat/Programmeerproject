/** project.js
    Programmeerproject 2017
    Lysanne van Beek
    10544259 
**/
var data_form, map, gemeente="AMSTERDAM",year;

window.onload = function() {

	// define values for pie plot
    var width_pie = 400,
    height_pie = 250,
    radius_pie = 100;
    
	// set width and height of canvas
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
		width_bar = 600 - margin.left - margin.right,
		height_bar = 300 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width_bar], .05);
	var y = d3.scale.linear().range([height_bar, 0]);

	// make x and y axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5);

    // make canvas for pie plot
    var svg = d3.select("#pie_container")
        .append("svg")
        .attr("width", width_pie)
        .attr("height", height_pie)
        .append("g")
        .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")");

	// when dropdown is clicked, change gemeente
	d3.selectAll(".m")
		.on("click", function(evt) {
			gemeente = this.getAttribute("value");
			console.log(gemeente);
			selectDataset(evt, year)
			
		});
	
	// select dataset, based on where the slider is pulled
	timeSlider = d3.select('#slider').call(d3.slider()
												 .axis(true)
												 .min(2011)
												 .max(2015)
												 .step(1)
												 .on("slide", selectDataset));


// function to select the dataset
function selectDataset(evt, value) {
	year = value;
	var str;
	if(value == "2015"){
		str = "2015_data.json";
	}else if(value == "2014"){
		str = "2014_data.json";
	}else if(value == "2013"){
		str = "2013_data.json";
	}else if(value == "2012"){
		str = "2012_data2.json"; //fucking javascript
	}else if(value == "2011"){
		str = "2011_data.json";
	}
	
	// update the selected daaset
	d3.json(str, function(error,data) {
		load_data(error,data);
		map.updateChoropleth(data_form);
		pieplot(data[gemeente]["profiel"]);
	});
}

// function to load in the data
function load_data(error, data) {
	data_form = {};
	var selected_data = data[gemeente]["oorsprong"];
	
	for (var key in selected_data) {
	
		var limits = [1,5,10,25,50,100,200,400];
		
		if (selected_data[key] >= limits[0] && selected_data[key] < limits[1]) {  fillKey = '1 - 5' }
		else if (selected_data[key] >= limits[1] && selected_data[key] < limits[2]) {  fillKey = '5 - 10' }
		else if (selected_data[key] >= limits[2] && selected_data[key] < limits[3]) {  fillKey = '10 - 20' }
		else if (selected_data[key] >= limits[3] && selected_data[key] < limits[4]) {  fillKey = '20 - 50' }
		else if (selected_data[key] >= limits[4] && selected_data[key] < limits[5]) {  fillKey = '50 - 100' }
		else if (selected_data[key] >= limits[5] && selected_data[key] < limits[6]) {  fillKey = '100 - 200' }
		else if (selected_data[key] >= limits[6] && selected_data[key] < limits[7]) {  fillKey = '200 - 300' }
		else if (selected_data[key] >= limits[7] ) {  fillKey = '300 +'; }
		
		data_form[key] = {students: selected_data[key], fillKey: fillKey}
	}
}

// default data setting
d3.json("2011_data.json", function(error, data) {
	year = 2011;
	load_data(error,data);
	make_map();
	pieplot(data[gemeente]["profiel"]);
});

function make_map() {
	map = new Datamap({
        element: document.getElementById('map_netherlands'),
        scope: "gemeentes",
        geographyConfig: {
            dataUrl: '/gemeentes2.topojson',
			borderWidth: 0.4,
            borderColor: '#4F4F4F',
			popupTemplate: function(geography, data) {
                        if (!data) return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> Oorsprong van <strong> 0 </strong> studenten'; 
                        return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> Oorsprong van <strong>' + data_form[geography.id].students + '</strong> studenten';},
        },
		
		setProjection: function(element) {
		var projection = d3.geo.mercator()
         .scale(6500)
         .center([0.5, 52.3])
         .rotate([-4.8, 0])
         .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
       
		var path = d3.geo.path()
         .projection(projection);

		return {path: path, projection: projection};	
		},  
		
		// list of colours corresponding to the fillKeys
		fills: {
			'0': 'white',
			'1 - 5': '#ffffcc',
			'5 - 10': '#ffeda0',
			'10 - 20': '#fed976',
			'20 - 50': '#feb24c',
			'50 - 100': '#fd8d3c',
			'100 - 200': '#fc4e2a',
			'200 - 300': '#e31a1c',
			'300 +': '#b10026',
			defaultFill: 'white'
		},
		
		data: data_form
    });
	map.legend();
}

var tip_pie = d3.tip()
            .attr('class', 'd3-tip')
            .offset([20, 0])
            .html(function(d) {
                return '<div class="hoverinfo"><strong>' + d.data.label + "</strong><br>" + d.data.value + " studenten";
            })
            
        var arc = d3.svg.arc()
            .outerRadius(radius_pie - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius_pie - 40)
            .innerRadius(radius_pie - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.value; });
            
        svg.call(tip_pie);

var tip_bar = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<span style='color:red'>" + d.data.value + "</span> <strong> studenten</strong>";
	})
	
function pieplot(datapoint) {
	svg[0][0].innerHTML = "";
	var data_profielen = []
	var i = 1;
	for (var key in datapoint) {
		data_profielen[data_profielen.length] = {"label": key, "value": datapoint[key], "color": d3.interpolateYlGn(i++/10)};
	}
	
  var g = svg.selectAll(".arc")
	  .data(pie(data_profielen))
	.enter().append("g")
	  .attr("class", "arc")
	  .on('mouseover', tip_pie.show)
	  .on('mouseout', tip_pie.hide);

  g.append("path")
	  .attr("d", arc)
	  .attr("fill", function(d) { return d.data.color; });
	
	// add graphtitle
	svg.append("text")
	  .attr("class", "graphtitle")
	  .attr("x", "0")
	  .attr("y", "100")
	  .style("text-anchor", "middle")
	  .text("Verdeling van profielen van eerstjaarsstudenten in (stad)");
}

}
