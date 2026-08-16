import { log } from "../modules/Logger.js";
import { getSettings } from "../modules/functions.js";
export default async client => {
  // Log that the bot is online.
  log(`${client.user.tag}, ready to serve ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`, "ready");
  
  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${getSettings("default").prefix}help`, { type: "PLAYING" });
};
