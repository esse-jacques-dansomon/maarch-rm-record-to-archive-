const {
    dateToISO8601,
    headerOptions,
    readExecl,
    API_URL,
    postRequest,
    putRequest,
    getRequest,
    deleteRequest
} = require("./utils");
const fs = require('fs');
const path = require('path');

// Change the working directory to the directory containing the script
process.chdir(__dirname);
const api = `${API_URL}/recordsManagement/retentionRule`
const apiArchieProfile = `${API_URL}/recordsManagement/archivalProfile`
const apiArchieProfileUpload = `${API_URL}/recordsManagement/archivalProfile/archivalProfile/upload`
const archivalAgreementApi = `${API_URL}/medona/archivalAgreement`
const total = 700
// const exelPath = './storage_conservations.xlsx'
const exelPath = './regles.xlsx'
// const exelPath = fs.readFileSync('storage_conservations.xlsx')


const storageRules = [
    {reference: 'DOCUMENTATION', code: 'DOC'},
    {reference: 'RESSOURCES HUMAINES', code: 'AL5'},
    {reference: 'CONTENU WEB', code: 'CON'},
    {reference: 'ARCHIVES', code: 'ARC'},
    {reference: 'MEDIATHEQUE', code: 'MEDIA'},
    {reference: 'INFOTHEQUE', code: 'INF'},
    {reference: 'PRODUCTION GRISE', code: 'PRGR'},
    {reference: 'REPRISE DOCUMENTATION', code: 'REPRISE_DOC'},
    {reference: 'REPRISE RESSOURCES HUMAINES', code: 'REPRISE_AL5'},
    {reference: 'REPRISE CONTENU WEB', code: 'REPRISE_CON'},
    {reference: 'REPRISE ARCHIVES', code: 'REPRISE_ARC'},
    {reference: 'REPRISE MEDIATHEQUE', code: 'REPRISE_MEDIA'},
    {reference: 'REPRISE INFOTHEQUE', code: 'REPRISE_INF'},
    {reference: 'REPRISE PRODUCTION GRISE', code: 'REPRISE_PRGR'},
]


const retentionRuleScript = async () => {
    let i = 1;
    const data = await readExecl(exelPath)
    for (const item in data) {
        console.log("--------------------------------------------------------")
        try {
            const dataItem = {
                "retentionRule": {
                    code: data[item].Numero,
                    duration: dateToISO8601(data[item]['Durée conservation']),
                    description: data[item].Description,
                    label: data[item].Description,
                    "finalDisposition": "preservation",
                }
            }
            const res = await postRequest(dataItem, api)
            console.log("res retentionRule success", res.data)
            // console.log("res retentionRule ", dataItem, api)
        } catch (e) {
            console.log("error", e)
        }
        i = i + 1
        if (i === total) {
            console.log("--------------------------break------------------------------")
            break
        }
        console.log("--------------------------------------------------------")
    }
    console.log('End import retentionRule |  Règles de conservation')

}

const archiveProfileScript = async () => {
    console.log('Start import archivalProfile')
    const data = await readExecl(exelPath)
    let start = 0
    for (let j = start; j < data.length; j++) {
        console.log("--------------------------------------------------------")
        try {
            const dataItem = {
                "archivalProfile": {
                    "reference": data[j].Numero,
                    "archivalProfileId": data[j].Numero,
                    "name": data[j].Description + " - " + data[j].Numero,
                    "retentionRuleCode": data[j].Numero,
                    "description": data[j].Description,
                    "accessRuleCode": "REPRISE",
                    "isDiscoverable": false,
                    "descriptionClass": "",
                    "retentionStartDate": null,
                    "isRetentionLastDeposit": false,
                    "acceptUserIndex": false,
                    "archiveDescription": [],
                    "acceptArchiveWithoutProfile": true,
                    "containedProfiles": []
                },
            }
            const res = await postRequest(dataItem, apiArchieProfile)
            console.log("res archivalProfile", res.data)
            const addFilePlan = {
                "archivalProfile": dataItem.archivalProfile,
                "content": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHJuZzpncmFtbWFyIHhtbG5zOnJuZz0iaHR0cDovL3JlbGF4bmcub3JnL25zL3N0cnVjdHVyZS8xLjAiIHhtbG5zOnVkdD0idXJuOnVuOnVuZWNlOnVuY2VmYWN0OmRhdGE6c3RhbmRhcmQ6VW5xdWFsaWZpZWREYXRhVHlwZToxMCIgeG1sbnM6YT0iaHR0cDovL3JlbGF4bmcub3JnL25zL2NvbXBhdGliaWxpdHkvYW5ub3RhdGlvbnMvMS4wIiB4bWxuczp4c2Q9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hIiB4bWxuczpxZHQ9ImZyOmdvdXY6Y3VsdHVyZTphcmNoaXZlc2RlZnJhbmNlOnNlZGE6djEuMDpRdWFsaWZpZWREYXRhVHlwZToxIiB4bWxuczpjY3RzPSJ1cm46dW46dW5lY2U6dW5jZWZhY3Q6ZG9jdW1lbnRhdGlvbjpzdGFuZGFyZDpDb3JlQ29tcG9uZW50c1RlY2huaWNhbFNwZWNpZmljYXRpb246MiIgeG1sbnM9ImZyOmdvdXY6Y3VsdHVyZTphcmNoaXZlc2RlZnJhbmNlOnNlZGE6djEuMCIgbnM9ImZyOmdvdXY6Y3VsdHVyZTphcmNoaXZlc2RlZnJhbmNlOnNlZGE6djEuMCIgZGF0YXR5cGVMaWJyYXJ5PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1kYXRhdHlwZXMiPgogICAgPHJuZzpzdGFydD4KICAgICAgICA8cm5nOmNob2ljZT4KCQkJPHJuZzpyZWYgbmFtZT0iQXJjaGl2ZVRyYW5zZmVyIi8+CgkJCTxybmc6cmVmIG5hbWU9IkFyY2hpdmVUcmFuc2ZlclJlcXVlc3QiLz4KCQk8L3JuZzpjaG9pY2U+CiAgICA8L3JuZzpzdGFydD4KICAgIDxybmc6ZGVmaW5lIG5hbWU9IkFyY2hpdmVUcmFuc2ZlciI+CiAgICAgICAgPHJuZzplbGVtZW50IG5hbWU9IkFyY2hpdmVUcmFuc2ZlciI+CiAgICAgICAgICAgIDxybmc6cmVmIG5hbWU9IkFyY2hpdmVUcmFuc2Zlcl9ONjU1MzciLz4KICAgICAgICA8L3JuZzplbGVtZW50PgogICAgPC9ybmc6ZGVmaW5lPgoJPHJuZzpkZWZpbmUgbmFtZT0iQXJjaGl2ZVRyYW5zZmVyUmVxdWVzdCI+CiAgICAgICAgPHJuZzplbGVtZW50IG5hbWU9IkFyY2hpdmVUcmFuc2ZlclJlcXVlc3QiPgogICAgICAgICAgICA8cm5nOnJlZiBuYW1lPSJBcmNoaXZlVHJhbnNmZXJfTjY1NTM3Ii8+CiAgICAgICAgPC9ybmc6ZWxlbWVudD4KICAgIDwvcm5nOmRlZmluZT4KICAgIDxybmc6ZGVmaW5lIG5hbWU9IkFyY2hpdmVUcmFuc2Zlcl9ONjU1MzciPgogICAgICAgIDxybmc6emVyb09yTW9yZT4KICAgICAgICAgICAgPHJuZzpyZWYgbmFtZT0iYW55RWxlbWVudCIvPgogICAgICAgIDwvcm5nOnplcm9Pck1vcmU+CiAgICA8L3JuZzpkZWZpbmU+CiAgICA8cm5nOmRlZmluZSBuYW1lPSJhbnlFbGVtZW50Ij4KICAgICAgICA8cm5nOnplcm9Pck1vcmU+CiAgICAgICAgICAgIDxybmc6ZWxlbWVudD4KICAgICAgICAgICAgICAgIDxybmc6YW55TmFtZS8+CiAgICAgICAgICAgICAgICA8cm5nOnplcm9Pck1vcmU+CiAgICAgICAgICAgICAgICAgICAgPHJuZzpjaG9pY2U+CiAgICAgICAgICAgICAgICAgICAgICAgIDxybmc6YXR0cmlidXRlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJuZzphbnlOYW1lLz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9ybmc6YXR0cmlidXRlPgogICAgICAgICAgICAgICAgICAgICAgICA8cm5nOnRleHQvPgogICAgICAgICAgICAgICAgICAgICAgICA8cm5nOnJlZiBuYW1lPSJhbnlFbGVtZW50Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9ybmc6Y2hvaWNlPgogICAgICAgICAgICAgICAgPC9ybmc6emVyb09yTW9yZT4KICAgICAgICAgICAgPC9ybmc6ZWxlbWVudD4KICAgICAgICA8L3JuZzp6ZXJvT3JNb3JlPgogICAgPC9ybmc6ZGVmaW5lPgo8L3JuZzpncmFtbWFyPg==",
                "format": "rng"
            }
            const resFilePlan = await postRequest(addFilePlan, `${apiArchieProfileUpload}/${addFilePlan.archivalProfile.reference}`)
            console.log("res archivalProfile addFilePlan ", j , resFilePlan.data)
            if (j === total) {
                console.log("Finish import all archivalProfile archiveProfileScript")
                break
            }
        } catch (e) {

        }
    }
    console.log('End import archivalProfile archiveProfileScript')
}

const archivalAgreementScript = async () => {
    console.log('Start import accordsVersement')
    const data = await readExecl(exelPath)
    // let indexAccords  = null
    // const resIndex = await getRequest(archivalAgreementApi + "/index")
    // indexAccords = resIndex.data
    //
    // let res;
    // // for (let item of indexAccords) {
    // //     if (item.name.includes(item.reference.toUpperCase()) && item.description.includes("Accord de versement - (")) {
    // //         // console.log("Accord de versement - (DOCUMENTATION) - DOCUMENTATION")
    // //         // break
    // //         res = await deleteRequest(archivalAgreementApi + "/" + item.archivalAgreementId)
    // //         console.log("delete", res.data)
    // //     } else {
    // //         console.log("not delete",item.name)
    // //     }
    // //
    // // }
    for (const item of data) {
        let i = 0;
        try {
            console.log("--------------------------------------------------------")
            const dataItem = {
                "archivalAgreement":
                    {
                        "archivalAgreementId": item.Numero.toUpperCase(),
                        "reference": item.Numero,
                        "name": item.Description + " - " + item.Numero.toUpperCase(),
                        "description": "Accord de versement - (" + item.Description + ")" + " - " + item.Numero.toUpperCase(),
                        "archiverOrgRegNumber": "Service_Archive",
                        "originatorOrgIds": [],
                        "depositorOrgRegNumber": "Service_Versant_Principal",
                        "beginDate": null,
                        "endDate": null,
                        "allowedFormats": "fmt/14 fmt/15 fmt/16 fmt/17 fmt/18 fmt/19 fmt/20 fmt/95 fmt/101 fmt/189 fmt/276 fmt/354 fmt/412 fmt/476 fmt/477 fmt/478 fmt/479 fmt/480 fmt/481 fmt/291 fmt/43",
                        "enabled": true,
                        "archivalProfileReference": item.Numero,
                        "serviceLevelReference": "serviceLevel_001",
                        "maxSizeAgreement": 1000000,
                        "maxSizeTransfer": 0,
                        "maxSizeDay": 0,
                        "maxSizeMonth": 0,
                        "maxSizeWeek": 0,
                        "maxSizeYear": 0,
                        "signed": false,
                        "autoTransferAcceptance": false,
                        "processSmallArchive": true
                    },

            }
            const res = await postRequest(dataItem, archivalAgreementApi)
            console.log("archivalAgreement ", i, res.data)
            // console.log("archivalAgreement  success", dataItem)
        } catch (e) {
            console.log("error", e)
        }
        i = i + 1
        if (i === total) {
            console.log("--------------------------break------------------------------")
            break
        }
        console.log("--------------------------------------------------------")
    }
    console.log('End import archivalAgreement')
}

// const getAllArchivalAgreementScript = async () => {
//     let data = null;
//     getRequest(archivalAgreementApi + "/index").then(
//         res => {
//             console.log("get all archivalAgreement success")
//             data = res.data
//             for (const item of data) {
//                 if (item.name.includes("Maarch les Bains -"))
//                 {
//                     updateArchivalAgreement(item)
//                 }
//             }
//         }
//     ).catch(e => {
//             console.log("error", e)
//         }
//     )
//
//
// }


// updateArchivalAgreement =(item) => {
//     const dataItem = {
//         "archivalAgreement":
//             {
//                 "archivalAgreementId":item.archivalAgreementId,
//                 "reference": item.reference.replace("MAARCH_LES_BAINS_", ""),
//                 "name": item.name.replace("Maarch les Bains -", ""),
//                 "description": item.description.replace("Maarch les Bains -", ""),
//                 "archiverOrgRegNumber": item.archiverOrgRegNumber,
//                 "originatorOrgIds": item.originatorOrgIds,
//                 "depositorOrgRegNumber": item.depositorOrgRegNumber,
//                 "beginDate": null,
//                 "endDate": null,
//                 "archivalProfileReference": item.archivalProfileReference,
//                 "serviceLevelReference": "serviceLevel_001",
//                 "maxSizeAgreement": 1000000,
//                 "maxSizeTransfer": 0,
//                 "maxSizeDay": 0,
//                 "maxSizeMonth": 0,
//                 "maxSizeWeek": 0,
//                 "maxSizeYear": 0,
//                 "signed": false,
//                 "autoTransferAcceptance": true,
//                 "processSmallArchive": true
//             },
//
//     }
//     const res = putRequest(dataItem, archivalAgreementApi)
//     console.log("put archivalAgreement  success", res)
// }

module.exports = {
    retentionRuleScript,
    archiveProfileScript,
    archivalAgreementScript,
}