import csv  
import json  

# Open file and read in fieldnames
f = open('2012.csv', 'rU')  

f.readline()
f.readline()

brin_naar_gemeente = {"07GR": "TILBURG", "00MF": "UTRECHT", "23AH": "ENSCHEDE", "21PL": "AMSTERDAM", "09OT": "DOETINCHEM", "30TX": "EDE", "30VP": "ROTTERDAM", "21PE": "ROTTERDAM", "30HD": "RHEDEN", "15BK": "GOUDA", "28DN": "AMSTERDAM", "21PJ": "MAASTRICHT", "21PI": "WAGENINGEN", "21PH": "ENSCHEDE", "21MI": "VLISSINGEN", "21PM": "NIJMEGEN", "02BY": "AMSTERDAM", "02NT": "EINDHOVEN", "21PB": "LEIDEN", "08OK": "HELMOND", "27UM": "S GRAVENHAGE", "21PG": "EINDHOVEN", "21PF": "DELFT", "02NR": "S GRAVENHAGE", "21PD": "UTRECHT", "21CW": "S HERTOGENBOSCH", "25JX": "HEERLEN", "22NC": "HEERLEN", "21PK": "AMSTERDAM", "21RI": "LEIDEN", "14NI": "ROTTERDAM", "10IZ": "UTRECHT", "25BE": "GRONINGEN", "22HH": "ZWOLLE", "25BA": "EDE", "27NF": "ARNHEM", "27PZ": "ROTTERDAM", "01VU": "ZWOLLE", "25DW": "UTRECHT", "21PN": "TILBURG", "25KB": "ARNHEM", "23KJ": "S GRAVENHAGE", "21UG": "AMSTERDAM", "22EX": "LEEUWARDEN", "21QA": "AMSTERDAM", "25AV": "KAMPEN", "22OJ": "ROTTERDAM", "21WN": "LEEUWARDEN", "21UI": "BREDA", "23BF": "UTRECHT", "21PC": "GRONINGEN", "30GB": "EINDHOVEN", "00DV": "AMSTERDAM", "21QO": "APELDOORN", "00IC": "ZWOLLE"}

g = open('2012_new.csv', 'w')  

for line in f:
	line_list = line.split(";")
	line_list[7] = brin_naar_gemeente[line_list[7]]
	joined_line_list = ";".join(line_list)
	g.write(joined_line_list)