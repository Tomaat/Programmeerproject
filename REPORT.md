##Report Programmeerproject
##Lysanne van Beek, 10544259

###Beschrijving
De visualisatie heeft als doel de herkomst en bestemming van eerstejaarsstudenten
in het WO per gemeente te visualiseren, en welke profielen deze studenten
hadden op de middelbare school. Er wordt een kaartje van Nederland getoond opgedeeld 
in gemeentes, die ingekleurd worden op basis van hoeveel studenten er uit een
gemeente komen of hoeveel er gaan studeren. Ook is er een bar graph die de top vijf
van gemeentes waar de meeste studenten zijn gaan studeren of vandaan komen te zien.
Tenslotte wordt met behulp van een pie chart de verdeling van profielen getoond.

###Technisch ontwerp

###Uitdagingen en veranderingen
Er zijn een aantal elementen die in de uiteindelijke visualisatie anders zijn dan
ik vooraf bedacht had. Ten eerste was ik van plan bogen te trekken tussen gemeentes,
waarbij de dikte van de boog aan zou geven hoeveel studenten uit de ene naar de
andere gemeente zijn gegaan. In de eerste week besefte ik echter al dat dit voor
een heel onoverzichtelijk kaartje zou zorgen, aangezien in bijvoorbeeld Amsterdam
studenten uit ongeveer 180 verschillende gemeentes komen. Om deze reden heb ik uiteindelijk
gekozen voor een heat map, aangezien deze hetzelfde weergeeft, maar op een overzichtelijkere
manier.

Ten tweede was het originele plan om gemeentes met een universiteit een ander kleurtje te
geven of een icoontje overheen te plaatsen waarna de gebruiker er op kon klikken om de
visualisatie voor die gemeente te zien. Beide opties waren echter niet praktisch. De 
gemeente een andere kleur geven zou niet werken aangezien er gebruik wordt gemaakt van
een heat map, waarbij elke kleur een betekenis heeft en dus een gemeente niet zomaar
een andere kleur kan krijgen. Ook een icoontje op de gemeente plaatsen bleek vrij 
onmogelijk, aangezien sommige gemeentes (zoals Delft en Leiden) zo klein zijn dat ze
dan helemaal niet meer te zien zouden zijn. Om deze redenen is gekozen om een dropdown
menu te maken met alle gemeentes met een universiteit er in, in plaats van te klikken
op de kaart. Een zoekfunctie was ook nog mogelijk geweest, maar het leek mij praktischer
om een dropdown te gebruiken aangezien er slecht 11 gemeentes met een universiteit zijn,
en gebruikers nu niet zelf hoeven te bedenken welke dat ook al weer zijn. Om de bestemming
van studenten te bekijken is wel gekozen om te klikken op de kaart. Dit omdat er zoveel
gemeentes zijn dat ze niet meer in een dropdown passen.



###Beslissingen
