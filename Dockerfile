FROM node:dubnium-alpine
WORKDIR /opt/day-length
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]