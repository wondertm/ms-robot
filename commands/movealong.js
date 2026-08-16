exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send('https://youtu.be/_Wx98AolMQw');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "movealong",
  category: "Fun",
  description: "quick youtube video link",
  usage: "movealong"
};