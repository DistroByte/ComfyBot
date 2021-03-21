const util = require('util'),
  fs = require('fs'),
  readdir = util.promisify(fs.readdir),
  mongoose = require('mongoose');

const Comfy = require('./base/Comfy'),
  client = new Comfy();

const init = async () => {

  // Loads commands
  const dirs = await readdir('./commands/');
  dirs.forEach(async (dir) => {
    const cmds = await readdir(`./commands/${dir}/`);
    cmds.filter(cmd => cmd.split('.').pop() === 'js').forEach(cmd => {
      const res = client.loadCommand(`./commands/${dir}`, cmd);
      if (res) client.logger.log(res, 'error');
    });
  });

  // Loads events
  const evtDirs = await readdir('./events/')
  evtDirs.forEach(async dir => {
    const evts = await readdir(`./events/${dir}/`);
    evts.forEach(evt => {
      const evtName = evt.split('.')[0];
      const event = new (require(`./events/${dir}/${evt}`))(client);
      client.on(evtName, (...args) => event.run(...args));
      delete require.cache[require.resolve(`./events/${dir}/${evt}`)];
    });
  });

  client.login(client.config.token);

  mongoose.connect(client.config.mongoDB, client.config.dbOptions).then(() => {
    client.logger.log('Database connected', 'log');
  }).catch(err => client.logger.log('Error connecting to database. Error:' + err, 'error'));
}

init()

client.on('disconnect', () => client.logger.log('Bot is disconnecting...', 'warn'))
  .on('reconnecting', () => client.logger.log('Bot reconnecting...', 'log'))
  .on('error', (e) => client.logger.log(e, 'error'))
  .on('warn', (info) => client.logger.log(info, 'warn'));

process.on('unhandledRejection', async (err) => {
  console.error(err);
  if (err.toString().length > 1) {
    try {
      const ch = await client.channels.fetch("823166851668246548");
      ch.send(err);
    } catch (err) { }
  }
});