###Design programmeertheorie

####Lysanne van Beek
####10544259

#####Data:
De data wordt ingeladen vanuit een json bestand. Om dit bestand te maken
moeten eerst e BRIN nummers van de onderwijsinstellingen omgezet worden 
naar gemeentes m.b.v. een hashtable. Vervolgens zal alle data over de 
gemeentes en profielen in één grote hashtable gezet worden, en die zal
gebruikt worden als de json. Voor elk jaar is er een aparte json die
ingeladen kan worden.

Er zijn 2 dingen die we moeten weten:
- Hoeveel mensen uit welke steden naar elke studentenstad zijn gegaan, oftewel
stadX -> stadY -> hoeveelheid;
- Hoeveel mensen in een stad een bepaald profiel hebben gedaan, oftewel
stad -> profiel -> hoeveelheid.

De hashtable zal er dus als volgt uitzien:

 var h = {amsterdam: {oorsprong: {den haag: 15, utrecht: 7, woerden: 1}, 
			profiel: {cm: 9, em: 5, nt: 8, ng: 7}},
		maastricht: {oorsprong: {eindhoven: 18, amsterdam: 2, roermond: 5}, 
			profiel: {cm: 12, em: 10, nt: 5, ng: 8}}}

Om de waardes voor elke stad of elk profiel te krijgen kan dit makkelijk en snel
opgezocht worden. 

#####Kaartje
Er wordt een kaart geladen met alle gemeenten in Nederland. Gebruikte geojson:
http://app.nos.nl/datavisualisatie/assets/data/GeoJSON/Gemeentes-2014.geo.json

#####Kaartje en graphs:
- On click (stad) wordt de data van die stad ingeladen en:
- De kaart wordt geupdate, nu is te zien waar alle studenten in die stad
vandaan komen. Gebeurt met een functie make_map.
- De bar graph wordt geupdate, nu zijn de 5 gemeentes waar de meeste studenten
vandaan komen te zien. Gebeurt met een functie make_bar.
- De pie chart wordt geupdate, nu is de verdeling tussen de profielen van alle
studenten in de aangeklikte stad te zien. Gebeurt met een functie make_pie.

