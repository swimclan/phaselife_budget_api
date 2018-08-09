FROM node:latest

#create app folder
RUN mkdir /budget_tracker
WORKDIR /budget_tracker

#cache npm dependencies
COPY package.json /budget_tracker
RUN npm install

#copy application files
COPY . /budget_tracker

#run the application in the image
EXPOSE 3000
CMD ["node", "server.js"]