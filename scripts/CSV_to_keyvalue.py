import csv  
import json  

# Open file and read in fieldnames
f = open('BRIN.csv', 'rU')  

f.readline()
brin_naar_gemeente = {}

for line in f:
	key, value, _ = line.split(";")
	brin_naar_gemeente[key] = value
	
# Parse the CSV into JSON  
out = json.dumps(bin_naar_gemeente)  
print "JSON parsed!"  

# Save the JSON  
f = open('BRIN.json', 'w')  
f.write(out)  
print "JSON saved!"