const Command = require("../../base/Command");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Skips the current song",
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["s", "next"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 3000
    });
  }

  async run(message, args, data) {
    if (!message.member.voice.channel) return message.error(`You're not in a voice channel!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.error(`You are not in the same voice channel!`);
    if (!this.client.player.getQueue(message)) return message.error(`No music currently playing!`);

    const success = this.client.player.skip(message);
    if (success) message.success(`The current song has just been **skipped**!`);
  }
}

module.exports = Skip;
