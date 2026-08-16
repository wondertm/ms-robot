exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const { MessageEmbed } = require("discord.js");
  const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
  const http = require('http'); // or 'https' for https:// URLs
  const fs = require('fs');

  const { link } = await fetch('https://some-random-api.com/animu/face-palm').then(response => response.json());
  var color = Math.floor(Math.random() * 16777215).toString(16);
  let embed = {
    color: color,
    description: args.join(' '),
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

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["palm"],
  permLevel: "User"
};

exports.help = {
  name: "facepalm",
  category: "Gifs",
  description: "Palm your face",
  usage: "facepalm [message/user/id]"
};
