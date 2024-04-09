const {archiveProfileScript, retentionRuleScript} = require("./scripts/retention-rule");
const { importArchivesFormXML_2, importArchivesFromXML} = require("./scripts/archive");

(async () => {
    //retention rule script
    // await retentionRuleScript();
    // //archive profile script
    // await archiveProfileScript();
    // //archive script
    // //1- file data
    // await importArchivesFromXML();
    //2- file two
    await importArchivesFormXML_2();
})();