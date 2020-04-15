FROM node:13
COPY src /usr/src/app/src
COPY package.json /usr/src/app
WORKDIR /usr/src/app
RUN npm install 
EXPOSE 3000
CMD ["npm", "run", "start"]