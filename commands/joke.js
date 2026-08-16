const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  
  const { joke } = await fetch('https://some-random-api.com/joke').then(response => response.json());
  
  const embed = {
    title: joke,
    //description: joke,
    color: Math.floor(Math.random() * 16777215).toString(16),
    footer: {
      text: 'Initiated by '+message.author.username+'#'+message.author.discriminator,
      icon_url: message.author.displayAvatarURL()
    }
  };
  
  message.channel.send({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["funny"],
  permLevel: "User"
};

exports.help = {
  name: "joke",
  category: "Fun",
  description: "Tells a bad joke",
  usage: "joke"
};
