// Gives a member one of the roles an admin has allowlisted for this server.
//
// Roles are picked from Discord's role menu and handled as IDs, never matched by name:
// role names can differ only by capitalisation or by lookalike characters, and Discord
// permits duplicates. Checks and settings are shared with removerole.js.

import { findProblem, logRoleChange } from "../modules/roleTools.js";

export async function run(client, interaction) { // eslint-disable-line no-unused-vars
  const member = interaction.options.getMember("user");
  const role = interaction.options.getRole("role");

  const problem = findProblem(interaction, member, role, "add");
  if (problem) return interaction.reply({ content: problem, ephemeral: true });

  await member.roles.add(role, `/addrole used by ${interaction.user.tag}`);
  await interaction.reply({ content: `Gave \`${role.name}\` to ${member.user.tag}.`, ephemeral: true });
  await logRoleChange(interaction, member, role, "added a role");
}

export const commandData = {
  name: "addrole",
  description: "Give a member one of this server's assignable roles.",
  options: [
    { name: "user", description: "The member to give the role to", type: "USER", required: true },
    { name: "role", description: "The role to give", type: "ROLE", required: true },
  ],
  defaultPermission: true,
};

export const conf = {
  // Anyone may invoke; the real check is roleManagerRoles, in findProblem().
  permLevel: "User",
  guildOnly: true
};
