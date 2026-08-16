export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  const reply = await message.reply("Ping?");
  await reply.edit(`Pong! Latency is ${reply.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['test'],
  permLevel: "User"
};

export const help = {
  name: "ping",
  category: "Miscellaneous",
  description: "Pongs when Pinged",
  usage: "ping"
};