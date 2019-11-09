const Jasmine = require("jasmine");
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

const jasmine = new Jasmine();

jasmine.loadConfig({
  "spec_dir": "compiled_tests",
  "spec_files": [
    "**/*[sS]pec.js"
  ],
  "helpers": []
});

jasmine.env.clearReporters();
jasmine.env.addReporter(new SpecReporter({
  spec: {
    displayPending: true
  }
}));

jasmine.execute();
