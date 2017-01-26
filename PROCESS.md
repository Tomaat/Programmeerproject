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
- Na veel zoeken een geojson gevonden om alle gemeenten én het water in Nederland 
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
- Topojson aangepast zodat hij een id heeft wat overeenkomt met de data.
- Begonnen code schrijven om data in de kaart te laden.

####Dag 7
- De data is ingeladen in de kaart! Op dit moment alleen nog die van Amsterdam om alles
een beetje overzichtelijk te houden. Het duurde erg lang omdat dit een custom map is van
Nederland, waardoor in de topojson vanalles aangepast moest worden.
	- Er blijft nog een probleem met gemeentes als 's Gravenhage, dit moet nog opgelost worden.
- Er is een hover over met gemeentenaam + aantal studenten.
- Alle data is omgezet naar het juiste json format.
- Idee: bucketwaardes uit laten rekenen per gemeente om zo goed mogelijk de verdeling te kunnen zien.
- Pie plot gemaakt (moet nog verbeterd en verfraaid worden).

####Dag 8
- Alle gemeentes die irritant deden in de data/toposjon zijn aangepast, hierover geeft hij nu geen
errors meer.
- Pie plot heeft hoverdingetjes en mooiere kleuren.
- Dropdown menu gemaakt met alle studentensteden. Als hier op geklikt wordt veranderem de kaart en
de pie plot mee.
- Idee: lijntje naar geselecteerde gemeente trekken zodat je ziet waar de gemeente ligt die je 
hebt aangeklikt zonder dat er een icoontje over de hele gemeente heen ligt.

####Dag 9
- Bar chart gemaakt, is interactief met slider en dropdown.
- Flow van de code verbeterd, functies gemaakt voor maken van bar graph en pie plot
- Legenda verticaal gemaakt.

####Dag 10
- Gepresenteerd, tips gekregen:
	- Gemeentes met een universiteit extra dik omlijnen, geselecteerde gemeente andere kleur omlijning geven.
	- Iets meer context geven voor de pie chart.
	- De titels moeten heel duidelijk zijn: het gaat om de oorsprong.
	- Beter niet ook nog HBO instellingen doen, dat zou iets te veel data zijn.
	- De getallen zijn nu absoluut, misschien relatief maken (studenten/capita)?
	- Het zou heel leuk zijn als je het ook nog de andere kant op kan zien: klikken op een gemeente en
	zien waar mensen zijn gaan studeren.
	
####Dag 11
- Overal waar gemeentenamen te zien zijn, zijn deze niet meer AMSTERDAM maar Amsterdam.

####Dag 12
- Bugs gefixt: gemeentes waar geen studenten vandaan komen hebben nu als value 0, in plaats van geen value.
- De data om het 'omgekeerd' ook te laten zien is nu in het goede json format.
- Idee: ipv de data voor 'omgekeerd' (waar zijn mensen uit deze gemeente gaan studeren) in de map te weergeven:
een bar of pie chart maken.

####Dag 13
- Alle data voor bestemmingen omgezet naar jsons.
- Toggle knop gemaakt om te kiezen tussen herkomst en bestemming, werkt voor pie en graph.
- Bug fix: toggle knop maakte de datamap kapot, gefixt.
- Variabele titels en tooltips voor de graphs gemaakt, afhankelijk van bestemming of herkomst.

