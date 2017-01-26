/** project.js
    Programmeerproject 2017
    Lysanne van Beek
    10544259 
**/
// globals
var data_form, map, gemeente="AMSTERDAM",year, updateBarplot, update_pieplot, plaats="Herkomst";

// function to turn "GEMEENTE" into "Gemeente"
function toSentenceCase(str) {
	return str.charAt(0) + str.slice(1).toLowerCase();
}

// function to make initiate pie plot
function initPieplot() {
	var width_pie = 500,
		height_pie = 300,
		radius_pie = 120;
	
	// make canvas for pie plot
	var svg = d3.select("#pie_container")
		.append("svg")
		.attr("width", width_pie)
		.attr("height", height_pie)
		.append("g")
		.attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")");
		
	// make tooltip for pie plot
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([20, 0])
		.html(function(d) {
			if (plaats == "Herkomst") {
				return '<div class="hoverinfo"><strong>' + d.data.label + "</strong><br>Profiel van " + '<strong>' + d.data.value + "</strong> eerstejaars studerend in " + toSentenceCase(gemeente);
			}
			else if (plaats == "Bestemming") {
				return '<div class="hoverinfo"><strong>' + d.data.label + "</strong><br>Profiel van " + '<strong>' + d.data.value + "</strong> studenten uit " + '//gekozen gemeente//';
			}
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
	function update_pieplot(datapoint) {
		svg[0][0].innerHTML = "";
		var data_profielen = []
		var i = 1;
		
		// get a nice colour for every pie piece
		for (var key in datapoint) {
			data_profielen[data_profielen.length] = {"label": key, "value": datapoint[key], "color": d3.interpolateYlGn(i++/10)};
		}

		var g = svg.selectAll(".arc")
			.data(pie(data_profielen))
		.enter().append("g")
			.attr("class", "arc")
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		g.append("path")
			.attr("class", "pizza")
			.attr("d", arc)
			.attr("fill", function(d) { return d.data.color; });

		
		
		// add pie graphtitle
		// var text = svg.append("text")
			// .attr("class", "graphtitle")
			// .attr("x", -(width_pie/2))
			// .attr("y", -120)
			// .style("text-anchor", "left");
		if (plaats == "Herkomst") {
			document.getElementById("pie_title").innerHTML = "Profielen die eerstjaarsstudenten in <br>" + toSentenceCase(gemeente) + " op de middelbare school hadden";
		}
		else if (plaats == "Bestemming") {
			document.getElementById("pie_title").innerHTML = "Profielen die eerstejaarstudenten uit " + toSentenceCase(gemeente) + " op de middelbare school hadden";
		}
	}
	return update_pieplot
}

// function to initiate bar graph
function initBarplot() {
	var margin = {top: 10, right: 10, bottom: 20, left: 10},
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
			
		// add graphtitle
		// var text = svg.append("text")
			// .attr("class", "graphtitle")
			// .attr("x", "-50")
			// .attr("y", "0")
			// .style("text-anchor", "right")
		if (plaats == "Herkomst") {
			document.getElementById("bar_title").innerHTML = "Top 5 van gemeentes waar eerstejaars <br>studerend in " + toSentenceCase(gemeente) + " vandaan komen";
		}
		else if (plaats == "Bestemming") {
			document.getElementById("bar_title").innerHTML = "Top 5 van gemeentes waar leerlingen <br>uit " + toSentenceCase(gemeente) + " gaan studeren";
		}
	}
	return updateBarplot
}

window.onload = function() {
	// save return values
	update_pieplot = initPieplot();
	updateBarplot = initBarplot()
    
	// when dropdown is clicked, change gemeente
	d3.selectAll(".m")
		.on("click", function(evt) {
			document.getElementsByClassName("datamaps-subunit "+gemeente)[0].style["stroke-width"] = "0.4px";
			gemeente = this.getAttribute("value");
			selectDataset(evt, year)
			document.getElementsByClassName("datamaps-subunit "+gemeente)[0].style["stroke-width"] = "3px";
		});
	
	// when toggle is shifted, change 'plaats'. Disable dropdown menu if 'Bestemming' is selected. 
	$(function() {
		$("#schuif").change(function(evt) {
			if ($(this).prop("checked")) {
				plaats = "Herkomst";
				$("#dropdown").prop("disabled", false);
				gemeente = "AMSTERDAM";
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
			str = year+"_data_herkomst.json";
		}
		else if (plaats == 'Bestemming') {
			str = year+"_data_bestemming_2.json";
		}
		
		// update the selected dataset
		d3.json(str, function(error,data) {
			load_data(error,data);
			console.log(data_form);
			map.updateChoropleth(data_form);
			update_pieplot(data[gemeente]["profiel"]);
			updateBarplot(data[gemeente]["oorsprong"]);
		});
	}

	// function to load in the data
	function load_data(error, data) {
		data_form = {};
		var selected_data = data[gemeente]["oorsprong"];
		
		for (var key in selected_data) {
		
			var limits = [1,5,10,25,50,100,200,400];
			fillKey = '0';
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
	d3.json("2011_data_herkomst.json", function(error, data) {
		year = 2011;
		load_data(error,data);
		make_map();
		update_pieplot(data[gemeente]["profiel"]);
		updateBarplot(data[gemeente]["oorsprong"]);
	});

	if (plaats == "Herkomst") {
		document.getElementById("map_title").innerHTML = "Herkomst van eerstejaarsstudenten studerend in " + toSentenceCase(gemeente);
	}
	else if (plaats == "Bestemming") {
		document.getElementById("map_title").innerHTML = "Steden waar eerstejaarsstudenten die uit " + toSentenceCase(gemeente) + " komen gaan studeren";
	}
	
	// make the datamaps map
	function make_map() {
		map = new Datamap({
			element: document.getElementById('map_netherlands'),
			scope: "gemeentes",
			geographyConfig: {
				dataUrl: '/gemeentes3.topojson',
				borderWidth: 0.4,
				borderColor: '#4F4F4F',
				popupTemplate: function(geography, data) {
							if (!data) return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> Oorsprong van <strong> 0 </strong> studenten'; 
							return '<div class="hoverinfo"> <strong>' + geography.properties.name + '</strong> <br> Oorsprong van <strong>' + data_form[geography.id].students + '</strong> studenten';},
			},
			
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
			data: data_form,
			done: function() {
					document.getElementsByClassName("datamaps-subunit "+gemeente)[0].style["stroke-width"] = "3px";
				  }
			/**
			if (plaats == "Herkomst") {
				done: function() {
					document.getElementsByClassName("datamaps-subunit "+gemeente)[0].style["stroke-width"] = "3px";
					}
				}
			else if (plaats == "Bestemming") {
				done: function(datamap) {
					datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
						console.log("bla");
				}
			}
			**/
		});
		map.legend();
	}
}



