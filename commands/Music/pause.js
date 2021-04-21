const Command = require("../../base/Command.js");

class Pause extends Command {

  constructor(client) {
    super(client, {
      name: "pause",
      description: "Pause the current song!",
      dirname: __dirname,
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 5000
    });
  }

  async run(message) {
    if (!message.member.voice.channel) return message.error(`You're not in a voice channel!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(`You are not in the same voice channel!`);
    if (!this.client.player.getQueue(message)) return message.error(`No music currently playing!`);
    if (this.client.player.getQueue(message).paused) return message.error(`The music is already paused!`);

    const success = this.client.player.pause(message);
    if (success) message.success(`Song ${this.client.player.getQueue(message).playing.title} paused!`);
  }
}

module.exports = Pause;