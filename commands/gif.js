const giphy = require('giphy-api')('I9k7noRKrbkHYQgj8SCHRGvm1dhhDYds');
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  //generate random color
  var color = Math.floor(Math.random() * 16777215).toString(16);

  giphy.search({
    q: args.join(' '),
    rating: 'pg-13'
  }, function(err,response){
    if(response.data.length == 0){
      let embed2 = {
        color: color,
        description: `🎬 Sorry I Can't find a gif related with your keywords.`,
      }
      message.channel.send({embeds: [embed2]})
      return;
    }

    var totalResponses = response.data.length;
    var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;

    let embed = {
      color: color,
      description: '<@'+message.author.id+'> '+args.join(' '),
      image: {
        url: response.data[responseIndex].images.original.url,
      },
    }
    message.channel.send({embeds: [embed]});
    //message.delete();
    return

  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "gif",
  category: "Fun",
  description: "Grab a random gif from giphy matching your description",
  usage: "gif {description}"
};
