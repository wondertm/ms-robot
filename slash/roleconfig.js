// Edits which roles /addrole and /removerole work with.
//
//   /roleconfig list
//   /roleconfig assignable add|remove  role:<role> confirm:<code>
//   /roleconfig managers   add|remove  role:<role> confirm:<code>
//
// "assignable" is the list of roles the commands may hand out. "managers" is the list
// of roles allowed to run them. Editing either changes who can do what on this server,
// so both sit behind Discord's Manage Roles permission and a typed confirmation.
//
// The confirmation word is not a secret, it's right there in this file. It's only
// there to stop someone reconfiguring the server's access control by accident while
// tabbing through the autocomplete.
//
// This uses Manage Roles instead of conf.permLevel because the "Administrator" level
// looks up settings.adminRole by name, so it breaks on any server that calls its
// admin role something else.

import { settings } from "../modules/settings.js";
import { idList } from "../modules/roleTools.js";

const CONFIRMATION = "iknowwhatimdoing";

// Which setting each subcommand group edits, and how to describe it.
const LISTS = {
  assignable: { key: "assignableRoles", noun: "handed out by /addrole" },
  managers: { key: "roleManagerRoles", noun: "allowed to use /addrole and /removerole" },
};

// Writes a list back to this server's overrides, the same way commands/set.js does.
// An emptied list is stored as "false", which is what the rest of the project uses to
// mean a setting isn't in use.
function save(interaction, key, ids) {
  if (!settings.has(interaction.guild.id)) settings.set(interaction.guild.id, {});
  settings.set(interaction.guild.id, ids.length ? ids.join(" ") : "false", key);
}

// An ID with no matching role means the role was deleted since it was configured.
function describe(interaction, ids) {
  if (!ids.length) return "_none_";
  return ids.map(id => {
    const role = interaction.guild.roles.cache.get(id);
    return role ? `\`${role.name}\`` : `\`${id}\` (deleted role)`;
  }).join(", ");
}

export async function run(client, interaction) { // eslint-disable-line no-unused-vars
  const reply = (content) => interaction.reply({ content, ephemeral: true });

  if (!interaction.member.permissions.has("MANAGE_ROLES"))
    return reply("You need the **Manage Roles** permission to change this.");

  if (interaction.options.getSubcommand() === "list") {
    const assignable = idList(interaction.settings.assignableRoles);
    const managers = idList(interaction.settings.roleManagerRoles);
    return reply([
      `**Can be assigned** (${assignable.length}): ${describe(interaction, assignable)}`,
      `**Can use the commands** (${managers.length}): ${describe(interaction, managers)}`,
    ].join("\n\n"));
  }

  if (interaction.options.getString("confirm") !== CONFIRMATION)
    return reply(`This changes who can manage roles on this server. Re-run it with \`confirm: ${CONFIRMATION}\` if you meant to.`);

  const { key, noun } = LISTS[interaction.options.getSubcommandGroup()];
  const role = interaction.options.getRole("role");
  const current = idList(interaction.settings[key]);

  if (interaction.options.getSubcommand() === "add") {
    if (current.includes(role.id)) return reply(`\`${role.name}\` is already ${noun}.`);
    save(interaction, key, [...current, role.id]);
    return reply(`\`${role.name}\` is now ${noun}.`);
  }

  if (current.includes(role.id)) {
    save(interaction, key, current.filter(id => id !== role.id));
    return reply(`\`${role.name}\` is no longer ${noun}.`);
  }
  return reply(`\`${role.name}\` wasn't ${noun} to begin with.`);
}

// Both groups take the same two options, so build them once.
const editSubcommand = (name, description) => ({
  name,
  description,
  type: "SUB_COMMAND",
  options: [
    { name: "role", description: "The role to change", type: "ROLE", required: true },
    { name: "confirm", description: `Type ${CONFIRMATION} to confirm`, type: "STRING", required: true },
  ],
});

export const commandData = {
  name: "roleconfig",
  description: "Choose which roles /addrole and /removerole work with.",
  options: [
    {
      name: "assignable",
      description: "Roles that /addrole may hand out",
      type: "SUB_COMMAND_GROUP",
      options: [
        editSubcommand("add", "Let /addrole hand out a role"),
        editSubcommand("remove", "Stop /addrole handing out a role"),
      ],
    },
    {
      name: "managers",
      description: "Roles allowed to use /addrole and /removerole",
      type: "SUB_COMMAND_GROUP",
      options: [
        editSubcommand("add", "Let a role use /addrole and /removerole"),
        editSubcommand("remove", "Stop a role using /addrole and /removerole"),
      ],
    },
    { name: "list", description: "Show this server's role configuration", type: "SUB_COMMAND" },
  ],
  defaultPermission: true,
};

export const conf = {
  // Anyone may invoke; the real check is Manage Roles, at the top of run().
  permLevel: "User",
  guildOnly: true
};
