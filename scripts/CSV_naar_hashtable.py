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

	out = json.dumps(h)

	# Save the JSON  
	f = open('visualisation/'+year+'_data.json', 'w')  
	f.write(out)  
	print( "JSON saved!")