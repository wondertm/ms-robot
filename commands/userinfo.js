export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  const { MessageEmbed } = require("discord.js");
  const moment = require('moment');
  const Discord = require('discord.js');
  
  const member = (message.guild) ? message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member : message.member || message.guild.members.cache.get(args[0]) ;
  if (!member) return message.channel.send('Please mention the user for the userinfo..');
  const user = member.user;
    const embeduserinfo = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL())
      .addField(`${user.tag}`, `${user}`, true)
      .addField("ID:", `${user.id}`, true)
      .addField("Permissions:", `${user.permLevel}`, true)
      .addField("Nickname:", `${member.nickname}`, true)
      //.addField("Status:", `${user.presence.status}`, true)
      .addField("In Server", message.guild.name, true)
      //.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
      .addField("Bot:", `${user.bot}`, true)
      .addField("Joined The Server On:", `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
      .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({embeds:[embeduserinfo]})
  }

export const conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "userinfo",
  category: "Miscellaneous",
  description: "Userinfo of mentioned user/id or if no one mentioned then yours",
  usage: "userinfo [user/id]"
};
