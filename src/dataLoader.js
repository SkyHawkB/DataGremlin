const fs = require('fs');
const csv = require('@fast-csv/parse');

function Card(data, set) {
  return {
    name: data[0],
    type: data[1],
    rarity: data[2],
    cost: data[3],
    description: data[4],
    upgraded: data[5],
    set: set,
  };
}
function Relic(data) {
  return {
    name: data[0],
    rarity: data[1],
    character: data[2] !== '' ? data[2] : 'All',
    description: data[3],
    flavor: data[4],
  };
}

let cards = new Map();
let relics = new Map();
module.exports.init = () => {
  let currentSet = '';
  fs.createReadStream('data/Cards.csv')
    .pipe(csv.parse())
    .on('error', error => console.error(error))
    .on('data', row => {
      if(row[0].includes('Cards') && row[1] === '') {
        currentSet = row[0].replace(' Cards', '');
      } else {
        if(!((row[0] + row[1]) === 'NameType')) cards.set(row[0].toLowerCase(), Card(row, currentSet));
      }
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows in Cards.csv`));
  
  fs.createReadStream('data/Relics.csv')
    .pipe(csv.parse())
    .on('error', error => console.error(error))
    .on('data', row => {
     if(!((row[0] + row[1]) === 'NameRarity')) relics.set(row[0].toLowerCase(), Relic(row));
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows in Relics.csv`));
};

module.exports.hasCard = (name) => {
  return cards.has(name);
};
module.exports.hasRelic = (name) => {
  return relics.has(name);
};

module.exports.card = (name) => {
  return cards.get(name);
};
module.exports.relic = (name) => {
  return relics.get(name);
};
