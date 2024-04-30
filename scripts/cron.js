const cron = require('node-cron');
const axios = require('axios');
const {token} = require('../token');

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://maarchrmap.axone-sn.com/batchProcessing/scheduling/Execute/maarchRMAP_scrcwa-fh0u-3ie4if',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'service',
        'Cookie': 'LAABS-AUTH=' + token
    }
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });


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