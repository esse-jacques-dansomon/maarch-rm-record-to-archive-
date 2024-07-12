// const cron = require('node-cron');
// const axios = require('axios');
// const {API_URL, NOTIFICATION_BASH_ID,  headerOptions} = require("./utils");
//
//
//
// let config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: `${API_URL}/batchProcessing/scheduling/Execute/${NOTIFICATION_BASH_ID}`,
//     headers: headerOptions
// };
//
// axios.request(config)
//     .then((response) => {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//
//
// //
// // cron.schedule('*/10 * * * *', () => {
// //
// //     axios.request(config)
// //         .then((response) => {
// //             console.log(JSON.stringify(response.data));
// //         })
// //         .catch((error) => {
// //             console.log(error);
// //         });
// // });