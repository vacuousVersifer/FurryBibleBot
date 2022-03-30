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
  });

furry.getVerse = (verseID, callback) => {
  axios
  .get(`${base}/bibles/${BibleID}/verses/${verseID}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`)
  .then(res => {
    if(res.data.statusCode) {
      callback(null, `Error Code: ${res.data.statusCode}`);
    } else {
      callback(res.data.data);
    }
  })
  .catch(e => {
    console.log(e);
    callback(null, e)
  })
}

furry.getChapter = (chapterID, callback) => {
  axios
  .get(`${base}/bibles/${BibleID}/chapters/${chapterID}`)
  .then(res => {
    callback(res.data.data);
  })
  .catch(e => console.error);
}

module.exports = furry;
