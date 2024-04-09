const Process = require('process');
let authToken = Process.env.LAABS_AUTH;
const xlsx = require('xlsx');
const XLSX = require("xlsx");
const fs = require("fs");
const xml2js = require("xml2js");
const pdfToBase64 = require("pdf-to-base64");


const headerOptions = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'service',
    'Cookie': `LAABS-AUTH=${authToken}`
};

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

const readExecl = (file) => {
    return new Promise((resolve, reject) => {
        const workbook = XLSX.readFile(file)
        const sheetNames = workbook.SheetNames
        const worksheet = workbook.Sheets[sheetNames[0]]
        const data = XLSX.utils.sheet_to_json(worksheet)
        resolve(data)
    })
}

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
module.exports = {dateToISO8601, headerOptions, readExecl, readXmlFile, parseXml, pdfToBase64Converter}