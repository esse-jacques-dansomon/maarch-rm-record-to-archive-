const {readXmlFile, parseXml, postRequest, API_URL, pdfToBase64Converter} = require("./utils");


// Exécution du script
async function importArchivesFromXML() {
    const xmlFilePath = 'data/data.xml';
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];
        // Chemin du fichier PDF
        const pdfFilePath = 'nodejs.pdf';

        // URL de l'API à laquelle envoyer les données
        const apiUrl = `${API_URL}/recordsManagement/archive`;
        for (const recordData of records) {
            let archive = {
                "archive": {
                    "digitalResources": [{
                        "handler": "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",
                        "size": "1670",
                        "fileName": "Mon image",
                        "mimetype": "image/png"
                    }],
                    "description": {
                        "title": [
                            "Facture Market SI Palace_1657"
                        ],
                        "keyword": [
                            {
                                "keywordType": "customer",
                                "keywordContent": "AXONE-TEST-API"
                            }
                        ],

                        "language": [
                            "fra"
                        ],
                        "documentType": "Facture",
                        "descriptionLevel": "Item",
                    },
                    "archiveName": "Definition objet archive",
                    "originatorArchiveId": "1657",
                    "originatingDate": "2018-02-21",
                    // "archivalProfileReference": "ATTF",
                    "originatorOrgRegNumber": "GIC",
                    "fullTextIndexation": "none",
                    "descriptionClass": "seda2",
                },
                "zipContainer": false
            }

            const archiveName = recordData.id;
            let originatingDate = null
            const fields = recordData['field'];
            for (const field of fields) {
                if (field['id'] === 'DATP') {
                    originatingDate = field['datetime'];
                }
            }
            archive.archive.archiveName = archiveName + ' - ' + originatingDate + ' - test api'
            archive.archive.description.title = archiveName + ' - ' + originatingDate + ' - test api'
            archive.archive.originatingDate = originatingDate;


            // Convertir le fichier PDF en base64
            const pdfBase64 = await pdfToBase64Converter(pdfFilePath)
            const pdfSize = pdfBase64.length

            archive.archive.digitalResources[0].handler = pdfBase64
            archive.archive.digitalResources[0].fileName = archive.archive.archiveName + '.pdf'
            archive.archive.digitalResources[0].mimetype = 'application/pdf'
            archive.archive.digitalResources[0].size = pdfSize


            await postRequest(archive, apiUrl)
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


async function importArchivesFormXML_2() {
    const xmlFilePath = 'data/Export_AD_29032024_0950.xml';
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];
        // Chemin du fichier PDF
        const pdfFilePath = 'nodejs.pdf';

        // URL de l'API à laquelle envoyer les données
        const apiUrl = `${API_URL}/recordsManagement/archive`;
        for (const recordData of records) {
            console.log(records.length)
            console.log(recordData)
            // return
            let archive = {
                "archive": {
                    "digitalResources": [{
                        "handler": "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",
                        "size": "1670",
                        "fileName": "Mon image",
                        "mimetype": "image/png"
                    }],
                    "description": {
                        "title": [
                            "Facture Market SI Palace_1657"
                        ],
                        "keyword": [
                            {
                                "keywordType": "customer",
                                "keywordContent": "AXONE-TEST-API"
                            }
                        ],

                        "language": [
                            "fra"
                        ],
                        "documentType": "Facture",
                        "descriptionLevel": "Item",
                    },
                    "archiveName": "Definition objet archive",
                    "originatorArchiveId": "1657",
                    "originatingDate": "2018-02-21",
                    // "archivalProfileReference": "ATTF",
                    "originatorOrgRegNumber": "GIC",
                    "fullTextIndexation": "none",
                    "descriptionClass": "seda2",
                },
                "zipContainer": false
            }

            const archiveName = recordData.id;
            let originatingDate = null
            const fields = recordData['field'];
            let des = {}
            for (const field of fields) {
                if (field['id'] === 'DTJUR') {
                    originatingDate = field['datetime'];
                }
                // console.log(field['_'])
                // // console.log(JSON.stringify(field))
                // console.log(field['id'])
                let id  = field['id'] +  field['order']
                des[id] = field['_']

            }
            console.log('-------------------', fields)
            console.log(des)
            archive.archive.archiveName = archiveName + ' - ' + originatingDate + ' - test api'
            archive.archive.description.title = archiveName + ' - ' + originatingDate + ' - test api'
            archive.archive.originatingDate = originatingDate;


            // Convertir le fichier PDF en base64
            // const pdfBase64 = await pdfToBase64Converter(pdfFilePath)
            // const pdfSize = pdfBase64.length
            //
            // archive.archive.digitalResources[0].handler = pdfBase64
            // archive.archive.digitalResources[0].fileName = archive.archive.archiveName + '.pdf'
            // archive.archive.digitalResources[0].mimetype = 'application/pdf'
            // archive.archive.digitalResources[0].size = pdfSize


            console.log(archive)
            return
            // await postRequest(archive, apiUrl)
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    importArchivesFromXML,
    importArchivesFormXML_2
};