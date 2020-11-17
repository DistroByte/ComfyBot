module.exports = async (bot, error) => {
  let errorLog = bot.channels.cache.get('769965868607864853');
  errorLog.send(error);
}