import { log } from "../modules/Logger.js";
// This event executes when a new guild (server) is joined.

export default (client, guild) => {
  log(`[GUILD JOIN] ${guild.id} added the bot. Owner: ${guild.ownerId}`);
};
