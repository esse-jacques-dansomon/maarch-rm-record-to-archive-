const {archiveProfileScript, retentionRuleScript, archivalAgreementScript, getAllArchivalAgreementScript} = require("./scripts/retention-rule");
const {
    importArchivesFromXMls
} = require("./scripts/archive");

(async () => {
    //retention rule script
    // await retentionRuleScript();
    // await archiveProfileScript();
    // await archivalAgreementScript();

    // // // //archive script
    await importArchivesFromXMls();
})();