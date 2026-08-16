export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  const { MessageEmbed } = require("discord.js");
  const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
  
  const member = (message.guild) ? message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member : message.member || message.guild.members.cache.get(args[0]) ;
  if (!member) return message.channel.send('Please mention the user for the userinfo..');
  const user = member.user;
  var avatar = user.displayAvatarURL()
  var comradeAvatar = ('https://some-random-api.com/canvas/comrade?avatar='+avatar) 
  //replace webp with png
  comradeAvatar = comradeAvatar.replace(".webp", ".png")
    const embeduserinfo = new MessageEmbed()
      .setColor("RANDOM")
      .addField(`${user.tag}`, `${user}`, true)
      .setImage(comradeAvatar)
      .setFooter(`Initiated by ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({embeds:[embeduserinfo]})
  }

export const conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "comrade",
  category: "Avatar stuff",
  description: "overlay effect",
  usage: "comrade [user/id]"
};
