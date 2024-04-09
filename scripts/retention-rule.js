const axios = require('axios')
const {dateToISO8601, headerOptions, readExecl} = require("./utils");
const api = 'http://localhost:9090/recordsManagement/retentionRule'


const postStorageRule = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(api, data, {
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

(async () => {
    const data = await readExecl('/Users/essejacques.co/projects/axone/maarchrm/maarchrm-script/data/storage_conservations.xlsx')

    for (const item in data){
      try {
        const  dataItem = {
          "retentionRule": {
            code: data[item].Numero,
            duration:  dateToISO8601(data[item]['Durée conservation']),
            description: data[item].Description,
            label:  data[item].Description,
            "finalDisposition": "preservation",
            "implementationDate": null
          }
        }
        const res = await postStorageRule(dataItem)
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    }

})();