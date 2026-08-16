exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send('https://youtu.be/NmPhaG1ud38');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "rejoice",
  category: "Fun",
  description: "quick youtube video link",
  usage: "rejoice"
};