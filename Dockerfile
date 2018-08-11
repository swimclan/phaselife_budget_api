FROM node:latest

#create app folder
RUN mkdir /budget_tracker
WORKDIR /budget_tracker

#cache npm dependencies
COPY package.json /budget_tracker
RUN npm install

#copy application files
COPY . /budget_tracker

#make log directory and file
RUN mkdir /budget_tracker/logs
RUN touch /budget_tracker/logs/app.log

#run the application in the image
EXPOSE 3000
CMD ["node", "server.js"]