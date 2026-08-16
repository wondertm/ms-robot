export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  const { MessageEmbed } = require("discord.js");
  const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
  const http = require('http'); // or 'https' for https:// URLs
  const fs = require('fs');

  const member = (message.guild) ? message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member : message.member || message.guild.members.cache.get(args[0]) ;
  if (!member) return message.channel.send('unable to find any member..');
  const user = member.user;
  const { link } = await fetch('https://some-random-api.com/animu/pat').then(response => response.json());
  var color = Math.floor(Math.random() * 16777215).toString(16);
  let embed = {
    color: color,
    description: args.join(' ')+' **Have a pat on the head.**',
    image: {
      url: link,
    },
    footer: {
      text: 'Initiated by '+message.author.username+'#'+message.author.discriminator,
      icon_url: message.author.displayAvatarURL()
    }
  }
  message.channel.send({embeds: [embed]});
}

export const conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pat"],
  permLevel: "User"
};

export const help = {
  name: "headpat",
  category: "gifs",
  description: "give a user a headpat",
  usage: "headpat [user/id]"
};
