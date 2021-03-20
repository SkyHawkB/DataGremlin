const {Bot} = require('quick-bot');
const fs = require('fs');
const config = require('./config.js');
const dataLoader = require('./dataLoader.js');

const client = new Bot('+', {data: dataLoader});

dataLoader.init();

fs.readdir('./commands', (err, files) => {
  files.forEach((file) => {
    client.addCommand(file.replace('.js', ''), require(`./commands/${file}`));
  });
});

client.build().login(config.TOKEN);

client.on('ready', () => {
  
});
