const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false, // Add this line to disable Chrome web security
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

