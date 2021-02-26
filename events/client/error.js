module.exports = async (client, error) => {
  let errorLog = client.channels.cache.get('769965868607864853');
  errorLog.send(error);
}