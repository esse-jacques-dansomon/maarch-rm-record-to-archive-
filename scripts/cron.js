const cron = require('node-cron');
const axios = require('axios');
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://maarchrmap.axone-sn.com/batchProcessing/scheduling/Execute/maarchRMAP_sbgvvu-gb45-ivsigb',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'service',
        'Cookie': 'LAABS-AUTH=phdF9WkJuTKkDuPXoqDZuPs4jdJfIZgYGsDLBBhtCTB7LptKflOSM2WLDzettWMByKRSo7hwwNrkRrf1kboks2pZZM%2BnttHZSPymQNnrqXtGmWbDYm%2FAtUzLchMJWq2OMjQhxWZT9Vg6WJ4TcQYpRg%3D%3D; LAABS-ORGANIZATION=phdF9WkJuTLD%2BdImn%2FTzShHmNjoGvo5niDvahpMr14cjW5VR4jf692rVcOmXMymg7uDJw8roiD3%2Buv3YHY1GiOq9BLh%2Ba1iJrmibb%2FE4F9BfyMrs1lC2VTU82GPBleEY959HNdzUocmBulmHr2%2FULjKWiyci5Z9CSKJiB3L%2BxBDzDah2EOqVOYuupS64oSPstfKp44p4ZIs0EDQlbAfem6Q4av%2BTw%2FZ5fToTqeZ63%2BTCBQJlqW314zBmsyVI33ew%2Fux%2B6hn5iun7p10b%2Bpb9LW0CI9Tc3aRHIDDqyveydXqz8l7Wocmaps8mBa4ZTvbXR2SIf9UaIB900kdPiwugp30d%2FJOU5M2Asu4d62bB0njk4TAI4u1E0bsaGUt8ppw23oxxWMHWkd3w8AsrUHFK4xlHamsnMB7jMh%2B3WSi6GXVS4%2FcpD4AW43V4rLvRJOz9HQOx45G0FWZ%2BdNssde3nmAavWDN9GA1%2BaN3k%2BBps1exphra4xvbpfIZeM%2FeRRtfLpejz1hzFlSs7qyzLvh9FUbTw2N2yju7x4QLKtBUvjz27aPXlHrlo1SgPVbwpfwvK6ECExv6cYlnQv%2BzvsSMVLPa72FVgSzNuArYRuUF6uv2T27AycgK7JnLdbm8LpJt%2FWsrvEfBk7jN%2BiVR6rS5gbglelc92dvK4X4JDhf8V1ub6zcvMtJ3mCw%3D%3D'
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