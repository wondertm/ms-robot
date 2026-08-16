import { Permissions } from "discord.js";

export async function run(client, interaction) { // eslint-disable-line no-unused-vars
  await interaction.deferReply();
  if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) 
    return await interaction.editReply("I do not have permission to kick members in this server.");
  await interaction.member.send("You requested to leave the server, if you change your mind you can rejoin at a later date.");
  await interaction.member.kick(`${interaction.member.displayName} wanted to leave.`);
  await interaction.editReply(`${interaction.member.displayName} left in a hurry!`);
}

export const commandData = {
  name: "leave",
  description: "Make's the user leave the guild.",
  options: [],
  defaultPermission: true,
};

export const conf = {
  permLevel: "User",
  guildOnly: true
};
