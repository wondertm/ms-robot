export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  message.channel.send('https://youtu.be/NmPhaG1ud38');
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "rejoice",
  category: "Fun",
  description: "quick youtube video link",
  usage: "rejoice"
};