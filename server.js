const {archiveProfileScript, retentionRuleScript, archivalAgreementScript, getAllArchivalAgreementScript} = require("./scripts/retention-rule");
const {
    importArchivesFromXML,
    importArchivesFormXML_1,
    importArchivesFormXML_2,
    importArchivesFormXML_3,
    importArchivesFormXML_4,
    importArchivesFormXML_5,
    importArchivesFormXML_6,
    importArchivesFormXML_7,
    importArchivesFormXML_8,
    importArchivesFormXML_9, importArchivesFromXMls
} = require("./scripts/archive");

(async () => {


    //retention rule script
    // await retentionRuleScript();
    // await archiveProfileScript();
    await archivalAgreementScript();

    // // // //archive script
    // await importArchivesFromXMls();
    // //archive script
    // //1- file data
    // await importArchivesFromXML();
    // await importArchivesFormXML_1();
    // await importArchivesFormXML_2();
    // await importArchivesFormXML_3();
    // await importArchivesFormXML_4();
    // await importArchivesFormXML_5();
    // await importArchivesFormXML_6();
    // await importArchivesFormXML_7();
    // await importArchivesFormXML_8();
    // await importArchivesFormXML_9();
})();