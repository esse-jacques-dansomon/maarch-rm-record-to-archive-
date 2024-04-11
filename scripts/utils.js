const Process = require('process');
let authToken = Process.env.LAABS_AUTH;
const XLSX = require("xlsx");
const fs = require("fs");
const xml2js = require("xml2js");
const pdfToBase64 = require("pdf-to-base64");
const axios = require("axios");

const  API_URL = Process.env.API_URL;

// Options d'en-tête pour les requêtes HTTP
const headerOptions = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'service',
    'Cookie': `LAABS-AUTH=${authToken}`
};

// Fonction pour convertir une durée en années en une durée ISO 8601
const dateToISO8601 = (duree) => {
    // Utilisation d'une expression régulière pour extraire le nombre d'années
    let regex = /(\d+)\s*ans/;
    const match = duree.match(regex);
    if (match) {
        // Extraire le nombre d'années de la chaîne correspondante
        const nombreAnnees = parseInt(match[1]);

        // Calculer le nombre total de jours
        // Créer une durée ISO 8601 en utilisant le format spécifié
        return `P${nombreAnnees}Y`;
    } else {
        return null; // Retourner null si la chaîne d'entrée n'est pas au bon format
    }
}

// Fonction pour lire un fichier Excel
const readExecl = (file) => {
    return new Promise((resolve, reject) => {
        const workbook = XLSX.readFile(file)
        const sheetNames = workbook.SheetNames
        const worksheet = workbook.Sheets[sheetNames[0]]
        const data = XLSX.utils.sheet_to_json(worksheet)
        resolve(data)
    })
}

// Fonction pour lire un fichier XML
function readXmlFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Convertir une chaîne XML en objet JSON
function parseXml(xmlData) {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


// Fonction pour convertir un fichier PDF en base64
function pdfToBase64Converter(pdfFilePath) {
    return new Promise((resolve, reject) => {
        pdfToBase64(pdfFilePath)
            .then((base64String) => resolve(base64String))
            .catch((error) => reject(error));
    });
}

const postRequest = (data, apiUrl) => {
    return new Promise((resolve, reject) => {
        axios.post(apiUrl, data, {
            headers: headerOptions
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const createDefaultArchive = () => {
    return   {
        "archive": {
            "digitalResources": [{
                "handler": "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",
                "size": "1670",
                "fileName": "Mon image",
                "mimetype": "image/png"
            }],
            "description": {
                "title": [
                    ""
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
                "description": "",
                "documentType": "",
                "descriptionLevel": "Item",
            },
            "archiveName": "",
            "originatingDate": null,
            "fullTextIndexation": "none",
            "descriptionClass": "seda2",
        },
        "zipContainer": false
    }
}

const readArchiveDetails = (recordData) => {
    let id = recordData.id;
    let archiveName = recordData.id;
    let originatingDate = null
    let recordcreation =  recordData['recordcreation']['_']
    const fields = recordData['field'];
    let des = {}
    let desText = ''
    let keyWords = []
    let INTRO = ''
    let fullText = null
    let type = recordData['recordtype']['_']
    let uri = recordData['uri']
    for (const field of fields) {
        if (field['id'] === 'DTJUR') {
            originatingDate = field['datetime'];
        }
        if (field['id'] === 'TIT') {
            archiveName = field['_'];
        }
        if (field['id'] === 'INTRO') {
            INTRO = field['_'];
            keyWords.push({

                "keywordType": "corpname",
                "keywordContent": field['_']

            })
        }
        if (field['id'] === 'FULL') {
            fullText = field['_'];
        }
        if (field['id'] === 'MOTC') {
            keyWords.push({

                "keywordType": "corpname",
                "keywordContent": field['_']

            })
            desText += field['_'] + ", "
        }

        let id = field['id'] + ( field['order'] ?? '')
        des[id] = field['_']

    }

    return {
        id,
        recordcreation,
        type,
        archiveName,
        originatingDate,
        des,
        desText,
        intro:INTRO,
        fullText,
        keyWords,
        uri
    }
}

module.exports = {
    dateToISO8601, readExecl, readXmlFile, parseXml, postRequest, pdfToBase64Converter,createDefaultArchive,readArchiveDetails,
    headerOptions, API_URL}