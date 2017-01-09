####Uit welke gemeentes komen eerstejaarsstudenten die naar het hoger onderwijs gaan?
####Voorstel programmeertheorie

###Lysanne van Beek
###10544259

Het probleem dat opgelost wordt voor de gebruiker is dat het inzichtelijk gemaakt wordt
per stad met een (of meerdere) instelling(en)voor hoger onderwijs waar hun eerstejaarsstudenten
vandaan komen. Blijven de meeste studenten in de buurt van de plek waar ze hun examen hebben gedaan?
Hoe zit het voor studenten die uit relatief afgelegen gebieden komen als Groningen en Limburg? 
Deze visualisatie zal dit hopelijk verhelderen.

De features om dit mogelijk te maken zijn:
- Een kaart van Nederland met een bolletje bij elke stad waar een universiteit (MVP) en/of hbo (optional) is.
- Als er op een bolletje geklikt wordt verschijnen er:
	- op de kaart stromen naar de gemeentes waar eerstejaarsstudenten vandaan komen (waar ze examen hebben gedaan) (MVP);
	- een bar chart met de 5 gemeentes waar de meeste studenten vandaan komen die in die stad zijn gaan studeren (MVP) ;
	- een pie chart met de verdeling van profielen van de studenten uit die stad (MVP).
- De stromen op de kaart verschillen van dikte afhankelijk van het aantal studenten (optional).
- Met behulp van een drop down menu kunnen er verschillende jaren geselecteerd worden (MVP);
- Met behulp van een ander drop down menu kan er gekozen worden om alleen HBO, WO of beide
niveaus te laten zien (optional).

Voor deze visualisatie zal een dataset van DUO gebruikt worden waarin o.a. de gemeentes waar
eerstejaarsstudenten eindexamen hebben gedaan, hun profielen en de BIN nummers van de onderwijsinstellingen waar
ze zijn gaan studeren zijn opgenomen: https://duo.nl/open_onderwijsdata/databestanden/stroom/doorstroom-3.jsp 
Om de BIN nummers naar gemeentes om te zetten zal nog gezocht moeten worden naar een bestand dat
de BIN nummers en corresponderende onderwijsinstellingen en gemeentes bevat.

