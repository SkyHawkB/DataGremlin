const dataLoader = require('../dataLoader.js');
const { MessageEmbed } = require('discord.js');

function getCardColor(rarity) {
  switch(rarity) {
    case 'Basic':
    case 'Common':
      return '999999';
    case 'Uncommon':
      return '1089C9';
    case 'Rare':
      return 'EDC01C';
    case 'Curse':
      return 'A108BF';
    case 'Special':
      return 'BD2B85';
    default:
      return 'FF0000';
  }
}
function makeCardEmbed(card) {
  const embed = new MessageEmbed()
    .setTitle(card.name)
    .addField('Type', card.type, true)
    .addField('Set', card.set, true)
    .addField('Text', card.description);

  if(card.upgraded !== '') embed.addField('Text (Upgraded)', card.upgraded);

  embed.addField('Cost', card.cost, true)
    .addField('Rarity', card.rarity, true)
    .setColor(getCardColor(card.rarity));

  return embed;
}

function getRelicColor(rarity) {
  switch(rarity) {
    case 'Starter':
    case 'Common':
      return '999999';
    case 'Uncommon':
      return '1089C9';
    case 'Rare':
      return 'EDC01C';
    case 'Boss':
      return '2D4057';
    case 'Shop':
      return '2D8C32';  
    case 'Special':
      return 'BD2B85';
    default:
      return 'FF0000';
  }
}
function makeRelicEmbed(relic) {
  return new MessageEmbed()
    .setTitle(relic.name)
    .setColor(getRelicColor(relic.rarity))
    .addField('Rarity', relic.rarity, true)
    .addField('Character', relic.character, true)
    .addField('Description', relic.description)
    .addField('Flavor Text', `*${relic.flavor}*`);
}

module.exports = (client, message, config) => {
  const lookup = message.content.split(' ').slice(1).join(' ').toLowerCase();

  if(dataLoader.hasCard(lookup)) message.channel.send(makeCardEmbed(dataLoader.card(lookup)));
  if(dataLoader.hasRelic(lookup)) message.channel.send(makeRelicEmbed(dataLoader.relic(lookup)));
};
