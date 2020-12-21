module.exports = async (bot, warn) => {
  let errorLog = bot.channels.cache.get('769965868607864853');
  errorLog.send(warn);
}