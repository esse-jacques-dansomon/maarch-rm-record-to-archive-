const cron = require('node-cron');
const axios = require('axios');
const {headerOptions} = require("./utils");
const api = `${process.env.API_URL}/batchProcessing/scheduling/Execute/maarchRMAP_sbgvvu-gb45-ivsigb`;
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: api,
    headers: headerOptions
};


// Schedule the cron job to run every minute
cron.schedule('0* * * * *', () => {

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
});