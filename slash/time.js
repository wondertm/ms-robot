const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

exports.run = async (client, interaction) => { // eslint-disable-line no-unused-vars

  embed = {
    title: "Current time",
    description: 'The current time is: <t:'+Math.floor(new Date().getTime()/1000.0)+'>',
    color: Math.floor(Math.random() * 16777215).toString(16),
    image: {
      url: 'https://imgs.xkcd.com/comics/now.png?'+Date.now()
    }
  }
  
  await interaction.reply({embeds: [embed]});
  
};

exports.commandData = {
  name: "time",
  description: "Displays a map of timezones",
  options: [],
  defaultPermission: true,
};

// Set guildOnly to true if you want it to be available on guilds only.
// Otherwise false is global.
exports.conf = {
  permLevel: "User",
  guildOnly: true
};
