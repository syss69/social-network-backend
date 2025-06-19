FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install && npm -g install nodemon
COPY . . 
EXPOSE 3000
CMD ["npm", "start"]