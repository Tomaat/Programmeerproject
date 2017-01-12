import csv  
import json  
from collections import defaultdict

f = open('DOOSTROOM_new.csv', 'rU')


h = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))

for line in f:
	line_list = line.split(";")
	h[line_list[7]]["oorsprong"][line_list[3]] += int(line_list[12])
	h[line_list[7]]["profiel"][line_list[6]] += int(line_list[12])
	
# Parse the CSV into JSON  
out = json.dumps(h)  
print "JSON parsed!"  

# Save the JSON  
f = open('data2015.json', 'w')  
f.write(out)  
print "JSON saved!"