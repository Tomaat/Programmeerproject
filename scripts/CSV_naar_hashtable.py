# Lysanne van Beek, 2017

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
		h[line_list[7].replace(" ","_")]["oorsprong"][line_list[3].replace(" ","_").replace("-","_").upper()] += int(line_list[12])
		h[line_list[7].replace(" ","_")]["profiel"][line_list[6]] += int(line_list[12])
	f.close()
	
	f = open('visualisation/gemeentes3.topojson', 'r')
	topo = eval(f.readline())
	f.close()
	for gemeente in topo['objects']['gemeentes']['geometries']:
		for uni in h.keys():
			h[uni]['oorsprong'][gemeente['id']] += 0
	out = json.dumps(h)

	# Save the JSON  
	f = open('visualisation/'+year+'_data_herkomst.json', 'w')  
	f.write(out)  
	print( "JSON saved!")