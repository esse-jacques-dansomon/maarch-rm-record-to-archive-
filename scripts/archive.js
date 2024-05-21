const {readXmlFile, parseXml, postRequest, API_URL, pdfToBase64Converter, createDefaultArchive, readArchiveDetails,
    setArchiveDetails
} = require("./utils");
const Process = require("process");

const apiUrl = `${API_URL}/recordsManagement/archive`;
// const profiles = [
//     'DOCUMENTATION',
//     'RESSOURCES HUMAINES',
//     'CONTENU WEB',
//     'ARCHIVES',
//     'MEDIATHEQUE',
//     'INFOTHEQUE',
//     'PRODUCTION GRISE'
// ]
const profiles = [

]

const  XML_FILES = [ 'data/ConférenceDesChefsdEtatUEMOA.xml' ];




async function importArchivesFromXMls() {
    for (const file of XML_FILES) {
        try {
            // Lire le fichier XML
            const xmlData = await readXmlFile(file);

            // Parser le XML en objet JavaScript
            const jsonData = await parseXml(xmlData);

            // Convertir les données en archives et les envoyer à l'API
            console.log(`Start importArchivesFromXML ${file}`)
            let records = jsonData['Alexandrie']['records']['record'];
            //if record not array
            if (!Array.isArray(records)) {
                records = [records];
            }
            // URL de l'API à laquelle envoyer les données
            for (const recordData of records) {
                let archiveDetails = readArchiveDetails(recordData)
                let archive = setArchiveDetails(archiveDetails);
                try {
                    // let res = await postRequest(archive, apiUrl)
                    console.log("success")
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            console.log(`End importArchivesFromXML ${file}`)
        } catch (error) {
            console.error('Error:', error.data);
        }
    }
}


module.exports = {
    importArchivesFromXMls,
};