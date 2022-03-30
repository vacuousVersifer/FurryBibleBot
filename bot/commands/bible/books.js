const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class BooksCommand extends Command {
  constructor(client) {
    super(client, {
      name: "books",
      aliases: ["listbooks"],
      group: "bible",
      memberName: "books",
      description: "Teh books of uwu teh bibwe",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    const books = this.client.furry.fetchedBooks;

    let embed = new MessageEmbed()
    .setColor("#FFFFFF")
    .setTitle("Teh books of teh bibwe owo")

    let reply = "";
    books.forEach(book => {
      let name = this.client.furry.translate(book.name);
      reply += `\n${name}`
    })
    embed.setDescription(reply);

    message.say(embed);
  }
};
