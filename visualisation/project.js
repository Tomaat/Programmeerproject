/** project.js
    Programmeerproject 2017
    Lysanne van Beek
    10544259 
**/
window.onload = function() {

	// select sataset, based on where the slider is pulled
	var timeSlider = d3.select('#slider').call(d3.slider()
												 .axis(true)
												 .min(2011)
												 .max(2015)
												 .step(1)
												 .on("slide", selectDataset));
}

// function to select the dataset
function selectDataset(evt, value) {
	var str;
	if(value == "2015"){
		str = "2015_data.json";
	}else if(value == "2014"){
		str = "2014_data.json";
	}else if(value == "2013"){
		str = "2013_data.json";
	}else if(value == "2012"){
		str = "2012_data.json";
	}else if(value == "2011"){
		str = "2011_data.json";
	}
	
	d3.json(str, function(error, data) {
		data_form = {};
		var amsterdam = data["AMSTERDAM"]["oorsprong"];
		
		for (var key in amsterdam) {
		
			// make an array containing the boundaries for GDP
			var limits = [1,50,100,200,300,400,500,600];
			
			// // add fillKey with the appropriate key to data
			if (amsterdam[key] >= limits[0] && amsterdam[key] < limits[1]) {  fillKey = '0.0 - 1.0' }
			else if (amsterdam[key] >= limits[1] && amsterdam[key] < limits[2]) {  fillKey = '1.0 - 5.0' }
			else if (amsterdam[key] >= limits[2] && amsterdam[key] < limits[3]) {  fillKey = '5.0 - 10.0' }
			else if (amsterdam[key] >= limits[3] && amsterdam[key] < limits[4]) {  fillKey = '10.0 - 20.0' }
			else if (amsterdam[key] >= limits[4] && amsterdam[key] < limits[5]) {  fillKey = '20.0 - 30.0' }
			else if (amsterdam[key] >= limits[5] && amsterdam[key] < limits[6]) {  fillKey = '30.0 - 40.0' }
			else if (amsterdam[key] >= limits[6] && amsterdam[key] < limits[7]) {  fillKey = '40.0 - 50.0' }
			else if (amsterdam[key] >= limits[7] ) {  fillKey = '50.0 +'; }
			console.log(key, fillKey);
		}
	});
}	

// Source: http://www.it1me.com/it-answers?id=34732066&ttl=custom+datamap+of+the+Netherlands+in+D3
var map = new Datamap({
        element: document.getElementById('map_netherlands'),
        scope: "gemeentes",
        geographyConfig: {
            dataUrl: '/gemeentes2.topojson'
        },
		
		setProjection: function(element) {
		var projection = d3.geo.mercator()
         .scale(6000)
         .center([0, 52])
         .rotate([-4.8, 0])
         .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
       
		var path = d3.geo.path()
         .projection(projection);

		return {path: path, projection: projection};	
		},  
    });
