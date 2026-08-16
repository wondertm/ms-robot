export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  //generate random color
  var color = Math.floor(Math.random() * 16777215).toString(16);
  embed = {
    title: "Current time",
    description: 'The current time is: <t:'+Math.floor(new Date().getTime()/1000.0)+'>',
    color: color,
    image: {
      url: 'https://imgs.xkcd.com/comics/now.png?'+Date.now()
    }

  }
  message.channel.send({embeds: [embed]});
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "time",
  category: "Fun",
  description: "Displays a map of timezones",
  usage: "time"
};