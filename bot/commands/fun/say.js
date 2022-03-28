const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      aliases: ["repeat"],
      group: "fun",
      memberName: "say",
      description: "Wepeats whatevew chu say",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "text",
          prompt: "Wat wouwd chu wike me uwu to say?",
          type: "string"
        }
      ]
    });
  }

  run(message, { text }) {
    message.say(this.client.furry.translate(text));
  }
};
