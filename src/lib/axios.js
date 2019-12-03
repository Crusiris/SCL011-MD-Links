// const axios = require('axios')

// function validURL(str) {
//     var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
//         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//         '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//         '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//         '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
//     return pattern.test(str);
// }

// const getStatus = (url) => {
//     const data = new Promise((resolve, reject) => {
//         const isUrl = validURL(url)
//         if (isUrl) {
//             axios.get(url)
//                 .then((result) => {
//                     console.log(result.status);
//                     console.log(url);
//                     resolve({
//                         code: result.status,
//                         url
//                     })
//                 })
//                 .catch((err) => {
//                     console.log(`${err.message}`);
//                     reject(err.message)
//                 });
//         }

//     })
//     return data
// }

// module.exports = {
//     getStatus
// };