# Test Example

We have implemented this demo in ExpressJS using REST API and AJAX response architechture. For further enhancement we can add more security like API authorization and authentication by passing API token in each API call request and validate it on server side.

## System Requirement

**Operating System**
- Linux based operating systen, most preferable is Ubuntu v18.04 LTS

**Software and Packages**
-   NodeJS (v10.x)
-   NPM (v6.14.x)
-   PM2: for install refer [installation guide](https://pm2.keymetrics.io/docs/usage/quick-start/#installation) 
-  ApiDocJs : to install refere [installation guide](https://apidocjs.com/#install) 

**NodeJS Framework**
-   Expressjs

**View Engine**
-   Handlebarsjs

## Configuration in Development Environment
For developement environment. you need to perform below steps
1. Download code from github
```
git clone https://github.com/viral85/nodejs-test.git
```
2. Goto Project directory
```
> cd nodejs-test
```
3. Install required packages
```
npm install
```
4. Start node process
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
6. To view API document
```
http://localhost:3000/apidoc/
```
## Start project using Docker
For production environment, here we have configure docker for this project. You can setup docker in your linux based server by refer below URL
https://docs.docker.com/get-docker/
After docker instalation complete, you have to execute below commands
1. Download code from github
```
git clone https://github.com/viral85/nodejs-test.git
```
2. Goto Project directory
```
cd nodejs-test
```
3. Build docker container from source code
```
docker-compose build
```
4. Start docker container
```
docker-compose up -d
```
5. Access project using server IP and port 3000
```
http://<Your Server IP or domain>:3000/
```
6. To view API document
```
http://<Your Server IP or domain>:3000/apidoc/
```