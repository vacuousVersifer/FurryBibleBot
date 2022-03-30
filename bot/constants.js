const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const TOKEN = process.env.TOKEN;
const API_KEY = process.env.API_KEY;

const commandPrefix = "owo";
const owner = "802317699157196850";
const invite = "https://discord.gg/dFmgxrxU5A";

const groups = [
  ["fun", "Fun Commands"],
  ["bible", "Bibwe Commands"]
];

const commandPath = path.join(__dirname, "commands")

module.exports = { TOKEN, API_KEY, commandPrefix, owner, invite, groups, commandPath };
