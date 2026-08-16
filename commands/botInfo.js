const { version } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { DurationFormatter } = require("@sapphire/time-utilities");
const durationFormatter = new DurationFormatter();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = durationFormatter.format(client.uptime);
  const msg = {
    title: "about ms robot",
    description: "ms robot is a bot that is managed and hosted by @Cyndergosa#2493\nIf you wish to suggest changes, send me a DM or open a pull request over at github\n",
    fields: [
      {
        name: "Github",
        value: "[Link](https://github.com/Olivia-Newberry/ms-robot/)",
        inline: true
      },
      {
        name: "Discord Invite",
        value: "[Link](https://discord.com/api/oauth2/authorize?client_id=719912462631305217&permissions=8&scope=applications.commands%20bot)",
        inline: true
      },
    ],
    footer: {
      text: "ms robot"
    }

  }
  message.channel.send({ embeds: [msg] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "botinfo",
  category: "Miscellaneous",
  description: "github and server invite links",
  usage: "botinfo"
};
