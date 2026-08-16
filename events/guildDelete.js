import { log } from "../modules/Logger.js";
import { settings } from "../modules/settings.js";

// This event executes when a new guild (server) is left.

export default (client, guild) => {
  if (!guild.available) return; // If there is an outage, return.
  
  log(`[GUILD LEAVE] ${guild.id} removed the bot.`);

  // If the settings Enmap contains any guild overrides, remove them.
  // No use keeping stale data!
  if (settings.has(guild.id)) {
    settings.delete(guild.id);
  }
};
