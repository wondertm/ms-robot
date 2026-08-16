exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const { MessageEmbed } = require("discord.js");
  const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
  
  const member = (message.guild) ? message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member : message.member || message.guild.members.cache.get(args[0]) ;
  if (!member) return message.channel.send('Please mention the user for the userinfo..');
  const user = member.user;
  var avatar = user.displayAvatarURL()
  var passedAvatar = ('https://some-random-api.com/canvas/passed?avatar='+avatar) 
  //replace webp with png
  passedAvatar = passedAvatar.replace(".webp", ".png")
  
    const embeduserinfo = new MessageEmbed()
      .setColor("RANDOM")
      .addField(`${user.tag}`, `${user}`, true)
      .setImage(passedAvatar)
      .setFooter(`Initiated by ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({embeds:[embeduserinfo]})
  }

 exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["respect"],
  permLevel: "User"
};

exports.help = {
  name: "passed",
  category: "Avatar stuff",
  description: "overlay effect : +respect",
  usage: "passed [user/id]"
};
