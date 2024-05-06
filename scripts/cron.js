const cron = require('node-cron');
const axios = require('axios');
const {token} = require('../token');
const {API_URL, NOTIFICATION_BASH_ID,  headerOptions} = require("./utils");



let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_URL}/batchProcessing/scheduling/Execute/${NOTIFICATION_BASH_ID}`,
    headers: headerOptions
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