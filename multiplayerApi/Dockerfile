FROM node

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ]