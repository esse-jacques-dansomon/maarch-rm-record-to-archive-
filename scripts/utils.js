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


module.exports = {dateToISO8601, readExecl, readXmlFile, parseXml, postRequest, pdfToBase64Converter, headerOptions, API_URL}