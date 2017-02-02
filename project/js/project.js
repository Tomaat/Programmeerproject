/** project.js
    Programmeerproject 2017
    Lysanne van Beek
    10544259 
**/
// globals
var dataForm, map, gemeente="AMSTERDAM", year, updateBarplot, updatePiePlot, plaats="Herkomst";

// function to turn "GEMEENTE" into "Gemeente"
function toSentenceCase(str) {
	if (str) {
		return str.charAt(0) + str.slice(1).toLowerCase();
	} else {
		return str;
	}
}

// makes the township border thicker and blue
function activeBorder() {
	var element = document.getElementsByClassName("datamaps-subunit "+gemeente)[0];
	element.style["stroke"] = "purple";
	element.style["stroke-width"] = "2px"
}

// makes the township border 'normal' (thinner and black)
function nonActiveBorder() {
	var element = document.getElementsByClassName("datamaps-subunit "+gemeente)[0]
	element.style["stroke"] = "black";
	element.style["stroke-width"] = "0.4px"
}
	
// function to make initiate pie plot, returns a function 'updatePiePlot'
function initPieplot() {
	var width_pie = 470,
		height_pie = 250,
		radius_pie = 120;
	
	// make canvas for pie plot
	var svg = d3.select("#pie_container")
		.append("svg")
		.attr("width", width_pie)
		.attr("height", height_pie)
		.append("g")
		.attr("transform", "translate(" + width_pie / 2.5 + "," + height_pie / 2 + ")");
		
	// make tooltip for pie plot
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([20, 0])
		.html(function(d) {
			return '<div class="hoverinfo"><strong>' + d.data.label + "</strong><br>Profiel van " + '<strong>' + d.data.value + "</strong> studenten";
		})
	
	// make the pie pieces
	var arc = d3.svg.arc()
		.outerRadius(radius_pie - 10)
		.innerRadius(0);

	var labelArc = d3.svg.arc()
		.outerRadius(radius_pie - 40)
		.innerRadius(radius_pie - 40);

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.value; });
	
	svg.call(tip);

	// function to update pie plot
	function updatePiePlot(datapoint) {
		
		svg[0][0].innerHTML = "";
		var data_profielen = []
		var i = 0;
		var colors = ['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2', '#a14e9f'];
		
		// get a nice colour for every pie piece
		for (var key in datapoint) {
			data_profielen[data_profielen.length] = {"label": key, "value": datapoint[key], "color": colors[i++]};
		}

		// draw the pie pieces, depending on the data
		var g = svg.selectAll(".arc")
			.data(pie(data_profielen))
		.enter().append("g")
			.attr("class", "arc")
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		g.append("path")
			.attr("class", "pizza")
			.attr("d", arc)
			.attr("data-legend", function(d) { return d.data.label; })
			.attr("data-legend-pos", function(d, i) { return i; })
			.attr("fill", function(d) { return d.data.color; });

		svg.append("g")
			.attr("class", "legend")
			.attr("transform", "translate(" + (radius_pie + 20) + ", 0)")
			.style("font-size", "12px")
			.call(d3.legend);
		
		// make title
		if (plaats == "Herkomst") {
			document.getElementById("pie_title").innerHTML = "Profielen die studenten studerend in " + toSentenceCase(gemeente) + "<br> op de middelbare school hadden in " + year;
		}
		else if (plaats == "Bestemming") {
			document.getElementById("pie_title").innerHTML = "Profielen van leerlingen uit " + toSentenceCase(gemeente) + "<br> op de middelbare school in " + year;
		}

		if (!datapoint) {
			svg.append("text").attr("x", -40).attr("y", -10).text("Geen data om weer te geven");
		}	
	}
	return updatePiePlot
}

// function to initiate bar graph, returns a function 'updateBarplot'
function initBarplot() {
	
	var margin = {top: 10, right: 10, bottom: 20, left: 50},
		width = 500 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;

	// make svg
	var svg = d3.select("#bar_container")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	// set the ranges
	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
	var y = d3.scale.linear().range([height, 0]);

	// make x and y axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(5);
		
	// make tooltip
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			if (plaats == "Herkomst") {
				return '<div class="hoverinfo"><strong>' + toSentenceCase(d.gemeente) + '<br></strong>' + 'Oorspong van <strong>' + d.studenten + "</strong> studenten";
			}
			else if (plaats == "Bestemming") {
				return '<div class="hoverinfo"><strong>' + toSentenceCase(d.gemeente) + '<br>' + d.studenten + "</strong> studenten gaan hier studeren";
			}
		});
	
	svg.call(tip);

	// function to update the bargraph
	function updateBarplot(datapoint) {
	
		svg[0][0].innerHTML = "";
		
		// select 5 townships with highest number of students and put them in an array of objects
		var five = [];
		for (var i = 0; i < 5; i++) {
			var max = 0;
			var cor_key;
			for (var key in datapoint) {
				if (datapoint[key] > max) {
					max = datapoint[key];
					cor_key = key;
				}
			}
			five[i] = {'gemeente': cor_key, 'studenten': max};
			datapoint[cor_key] = 0;
		}
		
		for (var key in five) {
			datapoint[five[key].gemeente] = five[key].studenten;
		}

		// scale the range of the data
		x.domain(five.map(function(d) { return toSentenceCase(d.gemeente); }));
		y.domain([0, five[0].studenten]);

		// add x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)

		// add y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -40)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Aantal studenten");

		// add bar chart
		svg.selectAll("bar")
			.data(five)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(toSentenceCase(d.gemeente)); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.studenten); })
			.attr("height", function(d) { return height - y(d.studenten); })
			.attr("fill", 'blue')
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		// make title
		if (plaats == "Herkomst") {
			document.getElementById("bar_title").innerHTML = "Top 5 van gemeentes waar eerstejaars <br>studerend in " + toSentenceCase(gemeente) + " vandaan komen in " + year;
		}
		else if (plaats == "Bestemming") {
			document.getElementById("bar_title").innerHTML = "Top 5 van gemeentes waar leerlingen <br>uit " + toSentenceCase(gemeente) + " gaan studeren in " + year;
		}

		if (five[0].studenten == 0) {
			svg.append("text").attr("x", 90).attr("y", 90).text("Geen data om weer te geven");
		}	
		
	}
	return updateBarplot
}

window.onload = function() {
	
	// save return values
	updatePiePlot = initPieplot();
	updateBarplot = initBarplot()
    
	// when dropdown is clicked, change gemeente
	d3.selectAll(".m")
		.on("click", function(evt) {
			nonActiveBorder();
			gemeente = this.getAttribute("value");
			selectDataset(evt, year)
			activeBorder();
		});
	
	// when toggle is shifted, change 'plaats'. Disable dropdown menu if 'Bestemming' is selected. 
	$(function() {
		$("#schuif").change(function(evt) {
			if ($(this).prop("checked")) {
				plaats = "Herkomst";
				$("#dropdown").prop("disabled", false);
				nonActiveBorder();
				gemeente = "AMSTERDAM";
				activeBorder();
			} else {
				plaats = "Bestemming";
				$("#dropdown").prop("disabled", true);
			}
			selectDataset(evt, year)
		});
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
		if (plaats == 'Herkomst') {
			str = "/../../data/"+year+"_data_herkomst.json";
		}
		else if (plaats == 'Bestemming') {
			str = "/../../data/"+year+"_data_bestemming_2.json";
		}
		
		// update the selected dataset
		d3.json(str, function(error,data) {
			loadData(error,data);
			map.updateChoropleth(dataForm);
			updatePiePlot(data[gemeente]["profiel"]);
			updateBarplot(data[gemeente]["oorsprong"]);
			
			// make map title
			if (plaats == "Herkomst") {
				document.getElementById("map_title").innerHTML = "Herkomst van studenten studerend in " + toSentenceCase(gemeente) + ' in ' + year;
			} else {
				document.getElementById("map_title").innerHTML = "Steden waar leerlingen uit " + toSentenceCase(gemeente) + " gaan studeren" + ' in ' + year;
			}
		});
	}

	// function to load in the data
	function loadData(error, data) {
		dataForm = {};
		var selectedData = data[gemeente]["oorsprong"];
		
		// add fillKey to the data, depending on amount of students
		for (var key in selectedData) {
		
			var limits = [1,5,10,25,50,100,200,400];
			fillKey = '0';
			
			if (selectedData[key] >= limits[0] && selectedData[key] < limits[1]) {  fillKey = '1 - 5' }
			else if (selectedData[key] >= limits[1] && selectedData[key] < limits[2]) {  fillKey = '5 - 10' }
			else if (selectedData[key] >= limits[2] && selectedData[key] < limits[3]) {  fillKey = '10 - 20' }
			else if (selectedData[key] >= limits[3] && selectedData[key] < limits[4]) {  fillKey = '20 - 50' }
			else if (selectedData[key] >= limits[4] && selectedData[key] < limits[5]) {  fillKey = '50 - 100' }
			else if (selectedData[key] >= limits[5] && selectedData[key] < limits[6]) {  fillKey = '100 - 200' }
			else if (selectedData[key] >= limits[6] && selectedData[key] < limits[7]) {  fillKey = '200 - 300' }
			else if (selectedData[key] >= limits[7] ) {  fillKey = '300 +'; }
			
			dataForm[key] = {students: selectedData[key], fillKey: fillKey}
		}
	}

	// default data setting
	d3.json("/../../data/2011_data_herkomst.json", function(error, data) {
		year = 2011;
		loadData(error,data);
		makeMap();
		updatePiePlot(data[gemeente]["profiel"]);
		updateBarplot(data[gemeente]["oorsprong"]);
		document.getElementById("map_title").innerHTML = "Herkomst van studenten studerend in " + toSentenceCase(gemeente) + ' in ' + year;
	});
	
	// make the datamaps map
	function makeMap() {
		map = new Datamap({
			element: document.getElementById('map_netherlands'),
			scope: "gemeentes",
			geographyConfig: {
				dataUrl: '../../data/gemeentes3.topojson',
				borderWidth: 0.4,
				borderColor: '#4F4F4F',
				// make tooltip, depending on 'herkomst' or 'bestemming'
				popupTemplate: function(geography, data) {
							if (plaats == "Herkomst"){
								if (!data) {
									return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> Oorsprong van <strong> 0 </strong> studenten'; 
								} else {
									return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> Oorsprong van <strong>' + dataForm[geography.id].students + '</strong> studenten';
								}
							} else {
								if (!data) {
									return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br><strong> 0 </strong> studenten gaan hier studeren'; 
								} else {
									return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> <strong>' + dataForm[geography.id].students + '</strong> studenten gaan hier studeren';
								}
							}
				}
			},
			
			// get the map the way we want it
			setProjection: function(element) {
				var projection = d3.geo.mercator()
				 .scale(6300)
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
			data: dataForm,
			done: function() {
					activeBorder();
					
					// make townships clickable
					$(function() {
						$(".datamaps-subunit").click(function(evt) {
							if (plaats == "Bestemming") {
								nonActiveBorder();
								gemeente = this.getAttribute("class").split(" ")[1];
								activeBorder();
								selectDataset(evt, year);
							}
						});
					});
				  }
		});
		map.legend();
	}
}



