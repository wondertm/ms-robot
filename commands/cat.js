const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  
  const { link } = await fetch('https://some-random-api.com/img/cat').then(response => response.json());
  const cat = link;
  const { fact } = await fetch('https://some-random-api.com/facts/cat').then(response => response.json());
  
  const embed = {
    description: "Random cat picture:",
    title: fact,
    image: {
      url: cat
    },
    //random color
    color: Math.floor(Math.random() * 16777215).toString(16)
  };
  
  message.channel.send({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "cat",
  category: "Fun",
  description: "Grab a random cat fact and cute picture",
  usage: "cat"
};
