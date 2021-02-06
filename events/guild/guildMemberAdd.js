
module.exports = async (bot, member) => {
  let guildId = member.guild.id
  if (guildId === "759921793422458901") {
    member.send('Hi there! Welcome to the 2024 Computer Applications Discord server! Before we continue, I need to verify you are who you say you are :eyes:\nPlease reply with !verify <student number (CAO number)> (ignore the angle brackets)!');
    member.send('https://imgur.com/a/KkD35jb');
  }
  if (guildId === "802256858198835220") {
    member.send('Welcome to the DCU Esports Community server!\nPlease verify using one of the following processes.\n```diff\nTo verify, please follow these instructions.\nIf you are using a DCU account, use this method:\n!verify email DCU-Esports <email address>\n\n> Replace the <email address> with your DCU email address, for example:\n!verify email DCU-Esports james.hackett5@mail.dcu.ie\n\n+ If you are using a non DCU account, use this method:\n!verify other DCU-Esports <reason>\n\nReplace the reason with a reason for joining, for example:\n!verify other I know xyz and he said this server is good fun!\n```')
  }
};