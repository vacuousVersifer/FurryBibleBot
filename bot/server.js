const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Sewvew is wive");
})

const PORT = 3000;
const listener = app.listen(PORT, () => {
  console.log(`Wistenying on powt ${listener.address().port}`)
})

module.exports = app;
