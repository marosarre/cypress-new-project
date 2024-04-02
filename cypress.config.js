const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const csv = require('@fast-csv/parse');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )

  on("task", {
    //create task to read csv
    readFromCsv(csvPath) {
      return new Promise(resolve => {
        let dataArray = []
        csv.parseFile(csvPath, {headers: true, discardUnmappedColumns: false, delimiter: ';'})
        .on('data', (data) => {
          dataArray.push(data)
        })
        .on('end', () => {
          resolve(dataArray)
        })
      })
    }
  })

  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    defaultCommandTimeout: 15000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 10,
    env: {
      allureReuseAfterSpec: true,
    },
  },
  video: false,
  includeShadowDom: true,
});
