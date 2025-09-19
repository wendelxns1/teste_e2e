// const { defineConfig } = require('cypress');
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       allureWriter(on, config); // escreve relatórios allure
//       return config;
//     },
//     reporter: 'allure',
//     reporterOptions: {
//       resultsDir: 'allure-results'
//     }
//   },
//   specPattern: 'cypress/e2e/**/*',
// });

// const { defineConfig } = require('cypress');
// const allureWriter = require('@shelex/cypress-allure-plugin/writer');

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       allureWriter(on, config);
//       return config;
//     },
//     reporter: "spec",   // ou "mochawesome"
//     reporterOptions: {
//       mochawesomeReporterOptions: {
//         reportDir: "cypress/reports/mochawesome",
//         overwrite: false,
//         html: true,
//         json: true,
//       },
//     },
//   },
// });

const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*',
  },
};
