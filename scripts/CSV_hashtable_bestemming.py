import csv  
import json  
from collections import defaultdict
import sys

if __name__ == '__main__':
	year = sys.argv[1]
	f = open('data/'+year+'_new.csv', 'r')

	h = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))

	for line in f:
		line_list = line.split(";")
		h[line_list[3].replace(" ","_").replace("-","_").upper()]["oorsprong"][line_list[7].replace(" ","_")] += int(line_list[12])
		h[line_list[3].replace(" ","_").replace("-","_").upper()]["profiel"][line_list[6]] += int(line_list[12])
	f.close()
	
	f = open('visualisation/gemeentes3.topojson', 'r')
	topo = eval(f.readline())
	f.close()
	for gemeente in topo['objects']['gemeentes']['geometries']:
		for bestemming in topo['objects']['gemeentes']['geometries']:
			h[gemeente['id']]['oorsprong'][bestemming['id']] += 0
		
	out = json.dumps(h)

	# Save the JSON  
	f = open('visualisation/'+year+'_data_bestemming_2.json', 'w')  
	f.write(out)  
	print( "JSON saved!")