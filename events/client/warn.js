module.exports = async (client, warn) => {
  let errorLog = client.channels.cache.get('769965868607864853');
  errorLog.send(warn);
}