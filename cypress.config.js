const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // env : {
    //   validEmail : "test@test.com",
    //   validPassword : "test1234"
    // },
      baseUrl : 'https://gradebook.vivifyideas.com/login',
    watchForFileChanges : false
  },
});
