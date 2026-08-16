const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  //generate random color
  var color = Math.floor(Math.random() * 16777215).toString(16);
  const Discord = require('discord.js');
  const querystring = require('querystring');
  
  function trim (str, max){
    return (str.length > max) ? `${str.slice(0, max - 3)}...` : str;
  };
  if (!args.length) {
    return message.channel.send('You need to supply a search term!');
  }
  
  const query = querystring.stringify({ term: args.join(' ') });

  const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
  //check list is not undefined
  if (!list) {
    return message.channel.send('There was an error fetching any results.');
  }
  if (!list.length) {
    return message.channel.send(`No results found for **${args.join(' ')}**.`).catch((e) => { console.log(e); });
  }
  
  //console.log(list);
  const [answer] = list;
  
  
  const embed = {
    color: color,
    description: `**${answer.word}**\n\nCommand issued by ${message.author.tag}`,
    url: answer.permalink,
    fields: [
      {
        name: 'Definition',
        value: trim(answer.definition, 1024),
        inline: false,
      },
      {
        name: 'Example',
        value: trim(answer.example, 1024),
        inline: true,
      },
    ],
    footer: {
      text: `👍 ${answer.thumbs_up} | 👎 ${answer.thumbs_down}`,
    },
  };
  return message.channel.send({ embeds : [embed]});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "define",
  category: "Fun",
  description: "Grab urban dictionary definition for something",
  usage: "define {something}"
};
