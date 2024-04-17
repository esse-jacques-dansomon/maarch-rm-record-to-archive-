const {readXmlFile, parseXml, postRequest, API_URL, pdfToBase64Converter, createDefaultArchive, readArchiveDetails,
    setArchiveDetails
} = require("./utils");

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

async function importArchivesFromXMls() {
    const files = [
        'data/data.xml',
        'data/Export_AD_29032024_0950.xml',
        'data/Export_BLOG0001_29032024_0950.xml',
        'data/Export_CONTW_29032024_0950.xml',
        'data/Export_COOP_29032024_0950.xml',
        'data/Export_ECO_29032024_0950.xml',
        'data/Export_MULTI_29032024_0851.xml',
        'data/Export_RSS_29032024_0851.xml',
        'data/Export_SEM_29032024_0851.xml',
        'data/Export_TJUR_29032024_0851.xml'
    ]

    for (const file of files) {
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
                    let res = await postRequest(archive, apiUrl)
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
    console.log(profiles)
}
// Exécution du script
async function importArchivesFromXML() {
    const xmlFilePath = 'data/data.xml';
    console.log('Start importArchivesFromXML')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];

        // URL de l'API à laquelle envoyer les données
        let profiles = []
        for (const recordData of records) {
            let archiveDetails = readArchiveDetails(recordData)
            console.log(archiveDetails)
            let archive = setArchiveDetails(archiveDetails);
            profiles.push(archiveDetails.recordnature)
            // let res = await postRequest(archive, apiUrl)
            // console.log()
            // return
            
        }
        console.log(profiles)
        console.log('End importArchivesFromXML')
    } catch (error) {
        console.error('Error:', error);
    }
}


async function importArchivesFormXML_1() {
    const xmlFilePath = 'data/Export_AD_29032024_0950.xml';
    console.log('Start importArchivesFormXML_1')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];

        // URL de l'API à laquelle envoyer les données
        for (const recordData of records) {
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_1')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function importArchivesFormXML_2() {
    const xmlFilePath = 'data/Export_BLOG0001_29032024_0950.xml';
    console.log('Start importArchivesFormXML_2')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];
        // URL de l'API à laquelle envoyer les données
        for (let recordData of records) {
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_2')
    } catch (error) {
        console.error('Error:', error.message);
    }
}


async function importArchivesFormXML_3() {
    const xmlFilePath = 'data/Export_CONTW_29032024_0950.xml';
    console.log('Start importArchivesFormXML_3')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];

        // URL de l'API à laquelle envoyer les données
        for (const recordData of records) {
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_3')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function importArchivesFormXML_4() {
    const xmlFilePath = 'data/Export_COOP_29032024_0950.xml';
    console.log('Start importArchivesFormXML_4')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];

        // URL de l'API à laquelle envoyer les données
        for (const recordData of records) {
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_4')
    } catch (error) {
        console.error('Error:', error.message);
    }

}

async function importArchivesFormXML_5() {
    const xmlFilePath = 'data/Export_ECO_29032024_0950.xml';
    console.log('Start importArchivesFormXML_5')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const recordData = jsonData['Alexandrie']['records']['record'];

        let archiveDetails = readArchiveDetails(recordData)
        let archive = setArchiveDetails(archiveDetails);
        let res = await postRequest(archive, apiUrl)
        
        console.log('End importArchivesFormXML_5')

    } catch (error) {
        console.error('Error:', error.message);
    }

}

async function importArchivesFormXML_6() {
    const xmlFilePath = 'data/Export_MULTI_29032024_0851.xml';
    console.log('Start importArchivesFormXML_6')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];

        for (const recordData of records){
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_6')
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function importArchivesFormXML_7() {
    const xmlFilePath = 'data/Export_RSS_29032024_0851.xml';
    console.log('Start importArchivesFormXML_7')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];
        // Chemin du fichier PDF
        const pdfFilePath = 'nodejs.pdf';

        for (let recordData of records){
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_7')


    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function importArchivesFormXML_8() {
    console.log('Start importArchivesFormXML_8')
    const xmlFilePath = 'data/Export_SEM_29032024_0851.xml';
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];

        for (const recordData of records){
            // URL de l'API à laquelle envoyer les données
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_8')


    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function importArchivesFormXML_9() {
    const xmlFilePath = 'data/Export_TJUR_29032024_0851.xml';
    console.log('Start importArchivesFormXML_9')
    try {
        // Lire le fichier XML
        const xmlData = await readXmlFile(xmlFilePath);

        // Parser le XML en objet JavaScript
        const jsonData = await parseXml(xmlData);

        // Convertir les données en archives et les envoyer à l'API
        const records = jsonData['Alexandrie']['records']['record'];
        for (let recordData of records){
            // URL de l'API à laquelle envoyer les données
            // URL de l'API à laquelle envoyer les données
            let archiveDetails = readArchiveDetails(recordData)
            let archive = setArchiveDetails(archiveDetails);
            let res = await postRequest(archive, apiUrl)
            
        }
        console.log('End importArchivesFormXML_9')


    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    importArchivesFromXMls,
    importArchivesFromXML,
    importArchivesFormXML_1,
    importArchivesFormXML_2,
    importArchivesFormXML_3,
    importArchivesFormXML_4,
    importArchivesFormXML_5,
    importArchivesFormXML_6,
    importArchivesFormXML_7,
    importArchivesFormXML_8,
    importArchivesFormXML_9
};