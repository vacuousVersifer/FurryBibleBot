const translate = require("./furry/translator");
const API_KEY = require("./constants").API_KEY;

const axios = require('axios');
axios.defaults.headers.common["api-key"] = API_KEY;

const base = "https://api.scripture.api.bible/v1"

let furry = {};

furry.translate = translate;

let BibleID = "06125adad2d5898a-01"

let chapterPromises = [];

furry.fetchedBooks = [];
furry.fetchedChapters = [];

axios
  .get(`${base}/bibles/${BibleID}/books`)
  .then(res => {
    let books = res.data.data;
    books.forEach(book => {
      furry.fetchedBooks.push(book);
      let url = `${base}/bibles/${BibleID}/books/${book.id}/chapters`
      let promise = axios.get(url)
      chapterPromises.push(promise);
    })
  })
  .then(() => {
    Promise.all(chapterPromises)
    .then(res => {
      res.forEach(responce => {
        chapters = responce.data.data;
        chapters.forEach(chapter => {
          furry.fetchedChapters.push(chapter);
        })
      })
    })
  })

module.exports = furry;
