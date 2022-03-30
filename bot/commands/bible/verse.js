const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class VerseCommand extends Command {
  constructor(client) {
    super(client, {
      name: "verse",
      group: "bible",
      memberName: "verse",
      description: "Pwaise Teh Wowd Owo!",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "verseID",
          prompt: "What verse do you owo wanna check out (bookID.chapterID.verseNumber, example: 'GEN.1.1')",
          type: "string"
        }
      ]
    });
  }

  run(message, { verseID }) {
    this.client.furry.getVerse(verseID, (verse, err) => {
      if(err) {
        return message.reply(`That verse doesn't exist / Something went wrong! \`${err}\``);
      }

      let reference = this.client.furry.translate(verse.reference);
      let content = this.client.furry.translate(verse.content.trim());

      let embed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle(reference)
      .setDescription(content);

      message.say(embed);
    })
  }
};
