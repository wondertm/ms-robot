export async function run(client, message, args, level, command) { // eslint-disable-line no-unused-vars
  var msgLower = message.content.toLowerCase();

  if (["ms robot test", "anyone listening?"].includes(msgLower)) {
    message.reply('I\'m listening!');
  }
  if (msgLower == "hi ms robot") {
    message.reply('Hello, how are you today?');
  }
  if (msgLower.includes('minecraft')) {
    message.react("634294300976349194")
  }

  if (
    msgLower.includes('!verification')
    || msgLower.includes('! verification')
  ){
    if (message.channel.name != undefined && !(['mossy','newcomers'].includes(message.channel.name.toLowerCase()))) {
      message.channel.send('!!verify');
    } else {
      message.reply('Please read the sticky message or try messaging Sora');
    }
  }

  //if channel name contains "selfie"
  if (message.channel.name != undefined && message.channel.name.toLowerCase().includes("selfie")) {
    if (message.attachments.size > 0) {
      message.react("758296751861268540");
    }
  }
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "partialMessage",
  category: "Miscellaneous",
  description: "Easter eggs, funky things and others",
  usage: "Just chat, you may notice it."
};
