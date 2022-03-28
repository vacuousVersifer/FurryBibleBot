const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const TOKEN = process.env.TOKEN;

const commandPrefix = "owo";
const owner = "802317699157196850";
const invite = "https://discord.gg/dFmgxrxU5A";

const groups = [
  ["fun", "Fun Commands"]
];

const commandPath = path.join(__dirname, "commands")

module.exports = { TOKEN, commandPrefix, owner, invite, groups, commandPath };
