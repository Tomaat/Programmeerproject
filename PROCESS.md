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
	- De BIN nummers en bijbehorende gemeentes om te zetten naar key:value pairs;
	- De BIN nummers in de data te veranderen naar gemeentes;
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
