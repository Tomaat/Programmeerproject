####Herkomst, bestemming en profielkeuze van eerstejaarsstudenten in het WO
####Lysanne van Beek
####10544259

Het doel van deze visualisatie is het inzichtelijk gemaakt wordt waar studenten
in studentensteden vandaan komen, waar per gemeente studenten gaan studeren, en welke
pofielen deze studenten hebben.Blijven de meeste studenten in de buurt van de plek waar 
ze hun examen hebben gedaan? Zijn er verschillen tussen steden in het aantal studenten 
met bepaalde profielen? Deze visualisatie verheldert dit.

![](doc/Knipsel.JPG)

De volgende elementen maken dit mogelijk:
- Een kaartje van Nederland die de herkomst of bestemming van studenten laat zien;
- Een bar graph die de top vijf van bestemmingen of herkomstgemeentes laat zien;
- Een pie chart die de gekozen profielen van leerlingen laat zien.
- Alle bovenstaande elementen hebben tooltips die verschijnen zodra er over een
gemeente/bar/pie stukje wordt gehooverd. 

De visualisaties kunnen verschillende soorten input krijgen:
- Met behulp van de slider kan data van 2011 tot en met 2015 ingeladen worden;
- Met de toggle knop kan gekozen worden om de herkomst (waar komen studenten in
deze studentenstad vandaan) of de bestemming (waar gaan leerlingen uit deze gemeente
studeren) te zien.
- Als met de toggle 'Herkomst' is gekozen, kunnen met behulp van een dropdown menu de
verschillende studentensteden aangeklikt worden.
- Als met de toggle 'Bestemming' is gekozen kan er op de gemeentes op de kaart geklikt
worden om te zien waar leerlingen uit deze gemeente gaan studere. De dropdown is dan
disables.

Voor het creeëren van deze visualisatie is gebruik gemaakt van de volgende bronnen:
Voor de data:
- DUO:  https://duo.nl/open_onderwijsdata/databestanden/stroom/doorstroom-3.jsp

Voor de visualisaties (NB: deze materialen hebben ook hun eigen licenses):
- De tooltips: http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js
- De slider: https://github.com/MasterMaps/d3-slider/blob/master/index.html
- De legenda van de pie chart: http://bl.ocks.org/wayneminton/a12b563819b04a3555aa

Copyright Lysanne van Beek, 2017