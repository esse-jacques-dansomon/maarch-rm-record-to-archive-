const axios = require('axios')
const XLSX = require('xlsx');
const api = 'http://localhost:9090/recordsManagement/retentionRule'
const authToken = 'phdF9WkJuTKkDuPXoqDZuPs4jdJfIZgYGsDLBBhtCTDN%2Bcj%2BZ81HBqxrX7FahRB2Xd8TTx7%2B0p09x3YrbHia2HxYa%2F%2ByRftTr7dXbwhQga29lZr83sNQZ30oETxHSbK9iFievRSdlq584kms1HjRBw%3D%3D'

 const  dateToISO8601 = (duree )  =>{
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
    let dataFormatted = []
    for (const item in data){
      // console.log(item, data[item])
      const  i = {
        "retentionRule": {
          code: data[item].Numero,
          duration:  dateToISO8601(data[item]['Durée conservation']),
          description: data[item].Description,
          label:  data[item].Description,
          "finalDisposition": "preservation",
          "implementationDate": null
        }
      }
      dataFormatted.push(i)
    }
    resolve(dataFormatted)
  })
}

const postStorageRule = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(api, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'service',
        'Cookie': `LAABS-AUTH=${authToken}`
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

(async () => {
    const data = await readExecl('/Users/essejacques.co/projects/axone/maarchrm/maarchrm-script/scripts/storage_conservations.xlsx')

    for (const item in data){
      try {
        const res = await postStorageRule(data[item])
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    }

})();