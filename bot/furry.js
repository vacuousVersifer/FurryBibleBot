const translate = require("./furry/translator");
const axios = require('axios');

let furry = {};

furry.translate = translate;

furry.getBibles = () => {

axios
  .get('https://example.com/todos')
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })
}

module.exports = furry;
