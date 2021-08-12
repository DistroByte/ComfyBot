/**
 * @file The invite Command allows users to invite ComfyBot to their own server,
 * and also join the support server.
 */

const { MessageEmbed } = require('discord.js');
const Command = require('../../base/Command');

module.exports = new Command({
  name: 'invite',
  description: 'Get an invite link to invite ComfyBot to your server!',
  dirname: __dirname,

  async run(client, message, args) {
    const inviteEmbed = new MessageEmbed()
      .setTitle('Click here to invite ComfyBot to your server!')
      .addField(`Serving users since ${client.user.createdAt.toUTCString().slice(5, 22)}`, '**[Get support](https://discord.gg/P5qRX8h)**')
      .setURL('https://discord.com/oauth2/authorize?client_id=666393146351026176&permissions=8&scope=applications.commands%20bot')
      .setColor('#0091fc')
      .setFooter('ComfyBot | Developed by DistroByte#0001');

    message.channel.send({ embeds: [inviteEmbed] });
  },
});
