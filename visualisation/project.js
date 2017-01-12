/** project.js
    Programmeerproject 2017
    Lysanne van Beek
    10544259 
**/

// Source: http://www.it1me.com/it-answers?id=34732066&ttl=custom+datamap+of+the+Netherlands+in+D3
var map = new Datamap({
        element: document.getElementById('map_netherlands'),
        scope: "collection",
        geographyConfig: {
            dataUrl: '/townships3.topojson'
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