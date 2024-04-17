const {dateToISO8601, headerOptions, readExecl, API_URL, postRequest} = require("./utils");
const api = `${API_URL}/recordsManagement/retentionRule`
const apiArchieProfile = `${API_URL}/recordsManagement/archivalProfile`
const archivalAgreementApi = `${API_URL}/medona/archivalAgreement`
const profiles = [
    {reference: 'DOCUMENTATION', code: 'DOC'},
    {reference: 'RESSOURCES HUMAINES', code: 'AL5'},
    {reference: 'CONTENU WEB', code: 'CON'},
    {reference: 'ARCHIVES', code: 'ARC'},
    {reference: 'MEDIATHEQUE', code: 'MEDIA'},
    {reference: 'INFOTHEQUE', code: 'INF'},
    {reference: 'PRODUCTION GRISE', code: 'PRGR'},
]

const reprisesProfiles = [
    {reference: 'REPRISE DOCUMENTATION', code: 'REPRISE_DOC'},
    {reference: 'REPRISE RESSOURCES HUMAINES', code: 'REPRISE_AL5'},
    {reference: 'REPRISE CONTENU WEB', code: 'REPRISE_CON'},
    {reference: 'REPRISE ARCHIVES', code: 'REPRISE_ARC'},
    {reference: 'REPRISE MEDIATHEQUE', code: 'REPRISE_MEDIA'},
    {reference: 'REPRISE INFOTHEQUE', code: 'REPRISE_INF'},
    {reference: 'REPRISE PRODUCTION GRISE', code: 'REPRISE_PRGR'},
]
const retentionRuleScript = async () => {
    console.log('Start import retentionRule')
    const data = await readExecl('/Users/essejacques.co/projects/axone/maarchrm/maarchrm-script/data/storage_conservations.xlsx')

    for (const item in data) {
        try {
            const dataItem = {
                "retentionRule": {
                    code: data[item].Numero,
                    duration: dateToISO8601(data[item]['Durée conservation']),
                    description: data[item].Description,
                    label: data[item].Description,
                    "finalDisposition": "preservation",
                    "implementationDate": null
                }
            }
            const res = await postRequest(dataItem, api)
            console.log("res retentionRule success")
        } catch (e) {
            console.log("error", e)
        }
        console.log('End import retentionRule')
    }
}
const archiveProfileScript = async () => {
    console.log('Start import retentionRule')
    for (const item of reprisesProfiles) {
        try {
            const dataItem = {
                "archivalProfile": {
                    "reference": item.code,
                    "archivalProfileId": item.code,
                    "name": item.reference,
                },
            }
            const res = await postRequest(dataItem, apiArchieProfile)
            console.log("res archivalProfile success")
        } catch (e) {
            console.log("error")
        }
        console.log('End import retentionRule archiveProfileScript')
    }
}

const archivalAgreementScript = async () => {
    console.log('Start import accordsVersement')

    for (const item of reprisesProfiles) {

        try {
            const dataItem = {
                "archivalAgreement":
                    {
                        "archivalAgreementId": "MAARCH_LES_BAINS_" + item.code,
                        "reference": "MAARCH_LES_BAINS_" + item.code,
                        "name": "Maarch les Bains - (" + item.reference + ")",
                        "description": "Accord de versement pour Maarch les Bains - (" + item.reference + ")",
                        "archiverOrgRegNumber": "ACME_ARCHIVE",
                        "originatorOrgIds": [
                            "maarchRMAP_q5w7ox-01c5-qhxl98",
                            "maarchRMAP_q5w7p1-1064-z51o04",
                            "maarchRMAP_q5w7p3-0392-74ck6z",
                            "maarchRMAP_sb7mqj-0wkt-nddr6k",
                            "maarchRMAP_sb7ndq-b4on-9fhm3e"
                        ],
                        "depositorOrgRegNumber": "Service_Audit_Interne",
                        "beginDate": null,
                        "endDate": null,
                        "allowedFormats": "fmt/14 fmt/15 fmt/16 fmt/17 fmt/18 fmt/19 fmt/20 fmt/95 fmt/101 fmt/189 fmt/276 fmt/354 fmt/412 fmt/476 fmt/477 fmt/478 fmt/479 fmt/480 fmt/481 fmt/291 fmt/43",                        "enabled": true,
                        "archivalProfileReference": item.code,
                        "serviceLevelReference": "serviceLevel_001",
                        "maxSizeAgreement": 1000000,
                        "maxSizeTransfer": 0,
                        "maxSizeDay": 0,
                        "maxSizeMonth": 0,
                        "maxSizeWeek": 0,
                        "maxSizeYear": 0,
                        "signed": false,
                        "autoTransferAcceptance": true,
                        "processSmallArchive": true
                    },

            }
            const res = await postRequest(dataItem, archivalAgreementApi)
            console.log("res retentionRule ")
        } catch (e) {
            console.log("error", e)
        }
        console.log('End import retentionRule')
    }
}

module.exports = {
    retentionRuleScript,
    archiveProfileScript,
    archivalAgreementScript
}