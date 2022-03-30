const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const cron = require("node-cron");

module.exports = class VOSDCommand extends Command {
  constructor(client) {
    super(client, {
      name: "vosd",
      aliases: ["verseoftheday"],
      group: "bible",
      memberName: "vosd",
      description: "Pwaise Teh Wowd Owo!",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message, { verseID }) {
    cron.schedule("0 12 */1 * *", () => {
      message.say("Vewse Of Uwu Teh Day Stawted Owo! I Wiww Post A Wandom Vewse Evewyday At 12 Owo!")

      let chapters = this.client.furry.fetchedChapters
      let randomChapter = chapters[Math.floor((Math.random() * chapters.length))];

      this.client.furry.getChapter(randomChapter.id, chapter => {
        let verseCount = chapter.verseCount;
        let verseNumber = Math.floor(Math.random() * verseCount);

        this.client.furry.getVerse(`${chapter.id}.${verseNumber}`, verse => {
          let reference = this.client.furry.translate(verse.reference);
          let content = this.client.furry.translate(verse.content.trim());

          let embed = new MessageEmbed()
          .setColor("#FFFFFF")
          .setTitle(reference)
          .setDescription(content);

          message.say(embed);
        })
      })
    })

    // cron.schedule("0 12 */1 * *", () => {
    //
    // })

    /*
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
    */
  }
};
