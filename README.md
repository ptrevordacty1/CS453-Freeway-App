# Prerequisites
- Node.js
- MongoDB

# Running the App
1. Open a terminal and navigate to [source](/source)
2. Install package dependences with ```npm install```
3. Start MongoDB as a service or on a separate terminal with ```mongod --dbpath data/db```
4. Start the server with ```node server.js```
5. Open a browser go to "localhost:3000"

# Setting up the MongoDB database
run the following commands from the 'source' directory:

1. mongoimport --host=127.0.0.1 --db freeway_data --collection freeway_loopdata --drop --type=csv --headerline --ignoreBlanks --file ../ProjectData-2018/ProjectData-2017/freeway_loopdata.csv
(^this one will take a while, the file is very large)

2. mongoimport --host=127.0.0.1 --db freeway_data --collection freeway_detectors --drop --type=csv --headerline --ignoreBlanks --file ../ProjectData-2018/ProjectData-2017/freeway_detectors.csv

3. mongoimport --host=127.0.0.1 --db freeway_data --collection freeway_stations --drop --type=csv --headerline --ignoreBlanks --file ../ProjectData-2018/ProjectData-2017/freeway_stations.csv

4. mongoimport --host=127.0.0.1 --db freeway_data --collection highways --drop --type=csv --headerline --ignoreBlanks --file ../ProjectData-2018/ProjectData-2017/highways.csv

Enter a mongo shell (mongosh) and enter the following commands

1. use freeway_data

2. db.freeway_loopdata.createIndex({ "detectorid" : 1, "starttime" : 1, "volume" : 1 })
(This will take awhile, but is required so that the program doesn't take forever when running a query on MongoDB)
