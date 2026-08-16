import { permLevels, defaultSettings } from "../config.js";
import { settings } from "../modules/settings.js";
export async function run(client, message, args, level) {
  const friendly = permLevels.find(l => l.level === level).name;
  const replying = settings.ensure(message.guild.id, defaultSettings).commandReply;
  message.reply({ content: `Your permission level is: ${level} - ${friendly}`, allowedMentions: { repliedUser: (replying === "true") }});
}

export const conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "mylevel",
  category: "Miscellaneous",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel"
};
