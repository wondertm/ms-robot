import { log } from "../modules/Logger.js";
export default async (client, error) => {
  log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
