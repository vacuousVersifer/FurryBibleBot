const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class ChaptersCommand extends Command {
  constructor(client) {
    super(client, {
      name: "chapters",
      aliases: ["listchapters"],
      group: "bible",
      memberName: "chapters",
      description: "Teh chapters of a book of uwu teh bibwe",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "bookID",
          prompt: "What book do you owo wanna check (book id)",
          type: "string"
        }
      ]
    });
  }

  run(message, { bookID }) {
    const books = this.client.furry.fetchedBooks;

    let requestedBook;
    let found;

    books.forEach(book => {
      if(book.id === bookID) {
        found = true
        requestedBook = book;
      }
    });

    if(found) {
      let nameLong = this.client.furry.translate(requestedBook.nameLong);

      let embed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle(`Teh chapters of teh book of ${nameLong} owo`)

      let reply = "";

      this.client.furry.fetchedChapters.forEach(chapter => {
        if(chapter.bookId === bookID) {
          reply += `\n${chapter.reference} (id: ${chapter.id})`;
        }
      })

      embed.setDescription(reply);
      message.say(embed);
    } else {
      let embed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle("Uh oh :<")
      .setDescription("That book wasn't found!");

      message.say(embed);
    }
  }
};
