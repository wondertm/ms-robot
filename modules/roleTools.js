// Shared logic for /addrole and /removerole.
//
// This lives in modules/ rather than slash/ because every .js file in slash/ is loaded
// as a command and must export commandData.
//
// Two per-server settings drive both commands, and /roleconfig is what edits them:
//   roleManagerRoles   role IDs whose holders may run the commands
//   assignableRoles    role IDs the commands may hand out

import { error } from "./Logger.js";

// A setting holds space separated role IDs. It reads as "false" once a list has been
// emptied, and is simply absent on a server that has never been set up, so both of
// those have to count as nothing.
export function idList(value) {
  if (!value || value === "false") return [];
  return value.split(" ").filter(id => id.length > 0);
}

// Returns the message to refuse with, or null to go ahead.
export function findProblem(interaction, member, role, action) {
  const managerRoles = idList(interaction.settings.roleManagerRoles);
  const assignableRoles = idList(interaction.settings.assignableRoles);
  const me = interaction.guild.me;

  if (!managerRoles.length || !assignableRoles.length)
    return "This server hasn't set up role commands yet. Someone with Manage Roles needs to run /roleconfig first.";

  // Checked here rather than through conf.permLevel: the built-in ladder holds a single
  // modRole and a single adminRole, so it cannot express "any one of these roles".
  if (!managerRoles.some(id => interaction.member.roles.cache.has(id)))
    return "You don't have a role that's allowed to use this command.";

  if (!member)
    return "I couldn't find that person in this server.";

  if (!assignableRoles.includes(role.id))
    return `\`${role.name}\` isn't on this server's list of assignable roles.`;

  // Discord would reject these itself, but with nothing the caller can act on.
  if (!me.permissions.has("MANAGE_ROLES"))
    return "I'm missing the **Manage Roles** permission on this server.";
  if (role.comparePositionTo(me.roles.highest) >= 0)
    return `I can't manage \`${role.name}\`, it sits at or above my own highest role.`;

  const hasRole = member.roles.cache.has(role.id);
  if (action === "add" && hasRole)
    return `${member.user.tag} already has \`${role.name}\`.`;
  if (action === "remove" && !hasRole)
    return `${member.user.tag} doesn't have \`${role.name}\`.`;

  return null;
}

// Replies are ephemeral, so the mod log is the only record of a change in the server
// itself. The role change has already happened by this point, so a failure here isn't
// the user's problem and doesn't get shown to them, but it does get logged. Note the
// bot needs to be able to *see* the channel, not just post in it.
export async function logRoleChange(interaction, member, role, description) {
  const name = interaction.settings.modLogChannel;
  try {
    const channel = interaction.guild.channels.cache.find(c => c.name === name && c.isText());
    if (!channel) {
      return error(`No #${name} channel in ${interaction.guild.name}, role change not logged.`);
    }
    await channel.send({
      content: `${interaction.user.tag} ${description} (${member.user.tag}, \`${role.name}\`)`,
      allowedMentions: { parse: [] },
    });
  } catch (e) {
    error(`Could not write to #${name} in ${interaction.guild.name}: ${e.message}`);
  }
}
