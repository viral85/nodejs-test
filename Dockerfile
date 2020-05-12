FROM node:dubnium-alpine
RUN npm install pm2 -g
WORKDIR /opt/nodejs-test
COPY package.json ./
RUN npm install
COPY . .
CMD ["pm2-runtime", "start", "ecosystem.config.js"]