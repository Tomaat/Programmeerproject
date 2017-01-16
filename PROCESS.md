###Process Book

####Lysanne van Beek
####10544259

#####Dag 1
Onderwerp bedacht, dataset gevonden en proposal geschreven.

#####Dag 2
Nagedacht over hoe de data ingeladen moet worden (een hashtable
maken en die opslaan als json)

#####Dag 3
- Overlegd met groepje, tips gekregen:
	- Goed uitzoeken hoe de arcs moeten, is het niet te veel werk?
	- Duidelijk aangeven dat de bar graph het aantal studenten in de
	aangeklikte stad is, en dan gegroepeerd naar waar ze vandaan komen
	- Default instellingen maken: voor de bar graph de grootste
	studentensteden en de pie chart de verdeling van profielen 
	voor alle studenten.
- Scripts geschreven om:
	- De BRIN nummers en bijbehorende gemeentes om te zetten naar key:value pairs;
	- De BRIN nummers in de data te veranderen naar gemeentes;
	- De data om te zetten in een hashtable.
- Besloten om in plaats van arcs een heat map te maken voor het kaartje,
aangezien het dan waarschijnlijk overzichtelijker blijft (in plaats van 
heel veel arcs die door elkaar lopen). Ook kan je met een heat map zien dat veel 
studenten in hun eigen gemeente blijven, terwijl dit met arcs niet mogelijk is.

####Dag 4
- Overlegd met groepje:
	- Universiteiten zullen aangegeven worden met een icoontje op de
	desbetreffende gemeente.
- Na veel zoeken een geojson gevonden om alle gemeenten �n het water in Nederland 
op een correcte manier te visualiseren.
- Visualisatie opnieuw uitgetekend (met kleurtjes).

####Dag 5
- Gepresenteerd en tips gekregen:
	- Maak een slider voor de jaren ipv een dropdown menu.
	- In plaats van klikken op een gemeente zou je hem ook kunnen zoeken met een
	zoekfunctie of aanklikken in een dropdownmenu (lost ook het probleem op
	met de icoontjes).
	- Bar chart is eigenlijk dezelfde data gevisualiseerd, is op het randje volgens
	de docent. Ben ik het niet mee eens, dus goed uitleggen in het verslag waarom
	hiervoor gekozen.
	- Misschien nog leuk om als je een universiteitsgemeente aanklikt je wat info
	krijgt over de universiteit die daar zit.
- Visualisatie opnieuw uitgetekend.

####Dag 6
- Datasets (2015, 2014, 2013) omgezet naar json. In 2012 en 2011 waren er andere BRIN
nummers, dus daar moet ik nog een keer naar kijken.
- Slider gemaakt voor de jaren.