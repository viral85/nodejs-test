# Test Example
We have implemented this demo in ExpressJS usinh Handlebars and AJAX response architechture. As we know REST API using AJAX with API versioning is best architecture for this requirement. Due to some time limitation we cant able to implement it, here we want to show you our backend coding skills.
  
## Configuration in Development Environment
For developement environment. you need to perform below steps
1.  Download code from github 
```
git clone https://github.com/viral85/day-length.git
```
2. Goto Project directory
```
> cd day-length
```
3. Install required packages
```
npm install
```
4.  Start node process
```
npm start
```
or start process using PM2
```
pm2 start ecosystem.config.js
```
5. Access project in browser using port 3000
```
http://localhost:3000
```
## Start project using Docker
For production environment,  here we have configure docker for this project. You can setup docker in your linux based server by refer below URL 
https://docs.docker.com/get-docker/

After docker instalation complete, you have to execute below commands
1.  Download code from github 
```
git clone https://github.com/viral85/day-length.git
```
2. Goto Project directory
```
cd day-length
```  
3. Build docker container from source code
```
docker-compose build
```
4. Start docker container
```
docker-compose up -d
```
5.  Access project using server IP and port 3000
```
http://<Your Server IP>:3000/
```