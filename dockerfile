#Base image taken from:https://hub.docker.com/r/cypress/browsers/tags
FROM cypress/browsers:node-18.16.0-chrome-113.0.5672.92-1-ff-113.0-edge-113.0.1774.35-1

#Create the folder where our project will be stored
RUN mkdir /cucumberproject
#We make it our workdirectory
WORKDIR /cucumberproject
#Let's copy the essential files that we MUST use to run our scripts.
COPY ./package.json .
COPY ./package-lock.json .
COPY ./jsconfig.json .
COPY ./.cypress-cucumber-preprocessorrc.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
COPY ./formatter ./formatter
#Install the cypress dependencies in the work directory
RUN npm install
#Executable commands the container will use[Exec Form]
ENTRYPOINT ["npx","cypress","run","--headless","--browser","chrome","--config-file","cypress.config.js"]
#With CMD in this case, we can specify more parameters to the last entrypoint.
CMD [""]  

#To build this image just use the following command line(just as an example, use your tag name:version as prefered.):
#docker build -t cucumberproject:1.0 .

#To run an example:
#TAG INSTANCE: docker run -i -t cucumberproject:1.0 cypress run --spec cypress/e2e/features/* --env tags=@mobile
#CHROME INSTANCE: docker run -i -t cucumberproject:1.0 cypress run --spec cypress/e2e/features/* --browser chrome
#FIREFOX INSTANCE: docker run -i -t cucumberproject:1.0 cypress run --spec cypress/e2e/features/* --browser firefox
# Volume config sample for Windows: -v "%cd%":/cucumberproject
