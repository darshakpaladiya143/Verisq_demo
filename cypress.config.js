const { defineConfig } = require('cypress');

module.exports = defineConfig({   
    // Configure Mochawesome as the custom reporter
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory where reports will be saved
      overwrite: true,              // Overwrite previous reports with the latest one
      html: true,                   // Generate an HTML report
      json: true                    // Generate a JSON report
    },

  e2e: {
    baseUrl: 'http://clientapp.narola.online:1196/', // Change to your application URL
    specPattern	: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000, // sets timeout to 10 seconds
    retries: 0, // Enable test retries
    setupNodeEvents(on, config) {
      // Implement Node event listeners if needed
    },
  },
});
