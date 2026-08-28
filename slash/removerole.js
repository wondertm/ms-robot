// Takes one of this server's allowlisted roles off a member.
// The inverse of addrole.js; see modules/roleTools.js for the shared checks.

import { findProblem, logRoleChange } from "../modules/roleTools.js";

export async function run(client, interaction) { // eslint-disable-line no-unused-vars
  const member = interaction.options.getMember("user");
  const role = interaction.options.getRole("role");

  const problem = findProblem(interaction, member, role, "remove");
  if (problem) return interaction.reply({ content: problem, ephemeral: true });

  await member.roles.remove(role, `/removerole used by ${interaction.user.tag}`);
  await interaction.reply({ content: `Took \`${role.name}\` from ${member.user.tag}.`, ephemeral: true });
  await logRoleChange(interaction, member, role, "removed a role");
}

export const commandData = {
  name: "removerole",
  description: "Take one of this server's assignable roles off a member.",
  options: [
    { name: "user", description: "The member to take the role from", type: "USER", required: true },
    { name: "role", description: "The role to take", type: "ROLE", required: true },
  ],
  defaultPermission: true,
};

export const conf = {
  // Anyone may invoke; the real check is roleManagerRoles, in findProblem().
  permLevel: "User",
  guildOnly: true
};
