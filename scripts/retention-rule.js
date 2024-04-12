const {dateToISO8601, headerOptions, readExecl, API_URL, postRequest} = require("./utils");
const api = `${API_URL}/recordsManagement/retentionRule`
const apiArchieProfile = `${API_URL}/recordsManagement/archivalProfile`

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
            const res = await postRequest(api, dataItem)
            console.log("res ",  item, res.data)
        } catch (e) {
            console.log(e)
        }
        console.log('End import retentionRule')
    }
}
const archiveProfileScript = async () => {
    console.log('Start import retentionRule')
    const data = await readExecl('/Users/essejacques.co/projects/axone/maarchrm/maarchrm-script/data/storage_conservations.xlsx')

    for (const item in data) {
        try {
            const dataItem = {
                "retentionRule":    {
                    "archivalProfileId":data[item].Numero,
                    "reference":  data[item].Description,
                    "name":  data[item].Description,
                    "description": null,
                    "descriptionSchema": null,
                    "descriptionClass": null,
                    "retentionStartDate": null,
                    "isRetentionLastDeposit": false,
                    "retentionRuleCode": null,
                    "accessRuleCode": null,
                    "acceptUserIndex": null,
                    "acceptArchiveWithoutProfile": true,
                    "fileplanLevel": null,
                    "archiveDescription": [],
                    "containedProfiles": [],
                    "retentionRule": null,
                    "accessRule": null,
                    "processingStatuses": null,
                    "isDiscoverable": false
                },
            }
            const res = await postRequest(apiArchieProfile, dataItem)
            console.log("res retentionRule", item, res.data)
        } catch (e) {
            console.log(e)
        }
        console.log('End import retentionRule archiveProfileScript')
    }
}

module.exports = {
    retentionRuleScript,
    archiveProfileScript
}