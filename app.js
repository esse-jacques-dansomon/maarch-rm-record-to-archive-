const {
    importArchivesFromXMls
} = require("./scripts/archive");
const {retentionRuleScript, archiveProfileScript, archivalAgreementScript} = require("./scripts/retention-rule");

(async () => {
      //retention rule script
     await retentionRuleScript();
     await archiveProfileScript();
     await archivalAgreementScript();
})();