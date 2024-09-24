const { defineConfig } = require("cypress");

const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    projectId: 'jg2xjz',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      cypressSplit(on, config)
      return config;
    },
  },
});
