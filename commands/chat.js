exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
  //combine the args into a string
  let msg = args.join(" ");
  //uri encode the message
  msg = encodeURIComponent(msg);
  //grab key from env
  const key = process.env.SRA_KEY;
  const { response } = await fetch('https://some-random-api.com/chatbot?key='+key+'&message='+msg).then(response => response.json());
  return await message.reply(response);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['c'],
  permLevel: "User"
};

exports.help = {
  name: "chat",
  category: "Fun",
  description: "Chat with a bot",
  usage: "chat"
};
