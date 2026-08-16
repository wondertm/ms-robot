import { version } from "discord.js";
import { codeBlock } from "@discordjs/builders";
import { DurationFormatter } from "@sapphire/time-utilities";
const durationFormatter = new DurationFormatter();

export function run(client, message, args, level) { // eslint-disable-line no-unused-vars
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
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "botinfo",
  category: "Miscellaneous",
  description: "github and server invite links",
  usage: "botinfo"
};
