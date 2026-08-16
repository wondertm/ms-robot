export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
const { find_user } = require("../modules/functions.js");
const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const regex = /(\d){18}/;
  //if no args
  let channelCat = (message.channel.parent.parent !== null) ? message.channel.parent.parent.name.toLowerCase() : message.channel.parent.name.toLowerCase();
  if(channelCat.includes("thread")){
    let userID = await message.channel.messages.fetch().then(([...messages]) => {
      var msgCount = messages.length
      if(msgCount == 50) message.channel.send('This is a long thread, you may have to manually add the role');
      var targetMsg = messages[msgCount-1];
      var targetMsgContent = [...targetMsg][1].content;
      return targetMsgContent.match(regex)[0];
    })
    if(userID == '651034500897439745')userID = await message.channel.messages.fetch().then(([...messages]) => {
      var msgCount = messages.length
      var targetMsg = messages[msgCount-2];
      var targetMsgContent = [...targetMsg][1].content;
      return targetMsgContent.match(regex)[0];
    })
    var member = await client.users.fetch(userID);
  
    //let member = await find_user(message, args);
    //dump member variable into a code block
    //message.channel.send(`\`\`\`js\n${JSON.stringify(member, null, 4)}\n\`\`\``);
    let user = (member.tag !== undefined) ? member : member.user;
    if (member === undefined) {
        return message.channel.send(`I couldn't find a matching member`);
    }  else {
      //check user is in this guild
      let inGuild = false;
      let roleTags = false;
      if(message.guild.members.cache.has(user.id)){
        inGuild = true;
        member = message.guild.members.cache.get(user.id);
        //Get roles of user
        //get roles of member
        let roles = member.roles.cache;
        //let roles = message.guild.members.cache.get(user.id).roles.cache.array();
        if(roles.length > 0){
          roleTags = true;
        }
        //list all roles as tags
        roleTags = roles.map(role => {
          return `<@&${role.id}>`;
        });
      }
      var embeduserinfo = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(user.displayAvatarURL())
        .addField(`${user.tag}`, `${user}`, true)
        //.addField("ID:", `${user.id}`, true)
        .addField("Permissions:", `${user.permLevel}`, true);
      if(inGuild){
        embeduserinfo
          .addField("Nickname:", `${member.nickname}`, true)
          .addField("In Server", message.guild.name, true)
      }
      
      if(member.presence !== null){
        embeduserinfo
          .addField("Status:", `${member.presence.status}`, true)
          .addField("Game:", `${member.presence.game ? member.presence.game.name : 'None'}`, true)
      }
      embeduserinfo
        
        //.addField("Bot:", `${user.bot}`, true)
      if(inGuild){
        embeduserinfo
        .addField("Joined The Server On:", `<t:${Math.floor(moment.unix(member.joinedAt).valueOf()/1000000)}:D> at <t:${Math.floor(moment.unix(member.joinedAt).valueOf()/1000000)}:t> <t:${Math.floor(moment.unix(member.joinedAt).valueOf()/1000000)}:R>`, false)
          //.addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, false)
      }
      embeduserinfo
        .addField("Account Created On:", `<t:${Math.floor(moment.unix(user.createdAt).valueOf()/1000000)}:D> at <t:${Math.floor(moment.unix(user.createdAt).valueOf()/1000000)}:t> <t:${Math.floor(moment.unix(user.createdAt).valueOf()/1000000)}:R>`, false) 
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
      //if roletags addfield to embeduserinfo
      if(inGuild && roleTags){
        embeduserinfo.addField("Roles:", roleTags.join(', '), false);
      }
    
    if (!args[0]) {
      message.channel.send({embeds:[embeduserinfo]})
    }
      message.channel.send('Thread userID = '+userID+" \nTag = <@"+userID+'>');
    }
  }

  //user part
  
  member = await find_user(message, args);
  //dump member variable into a code block
  //message.channel.send(`\`\`\`js\n${JSON.stringify(member, null, 4)}\n\`\`\``);
  let user = (member.tag !== undefined) ? member : member.user;
  if (member === undefined) {
      return message.channel.send(`I couldn't find a matching member`);
  }  else {
    //check user is in this guild
    let inGuild = false;
    let roleTags = false;
    if(message.guild.members.cache.has(user.id)){
      inGuild = true;
      member = message.guild.members.cache.get(user.id);
      //Get roles of user
      //get roles of member
      let roles = member.roles.cache;
      //let roles = message.guild.members.cache.get(user.id).roles.cache.array();
      if(roles.length > 0){
        roleTags = true;
      }
      //list all roles as tags
      roleTags = roles.map(role => {
        return `<@&${role.id}>`;
      });
    }
    var embeduserinfo = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL())
      .addField(`${user.tag}`, `${user}`, true)
      //.addField("ID:", `${user.id}`, true)
      .addField("Permissions:", `${user.permLevel}`, true);
    if(inGuild){
      embeduserinfo
        .addField("Nickname:", `${member.nickname}`, true)
        .addField("In Server", message.guild.name, true)
    }
    if(member.presence !== null){
      embeduserinfo
        .addField("Status:", `${member.presence.status}`, true)
        .addField("Game:", `${member.presence.game ? member.presence.game.name : 'None'}`, true)
    }
    embeduserinfo
      
      //.addField("Bot:", `${user.bot}`, true)
    if(inGuild){
      embeduserinfo
        .addField("Joined The Server On:", `<t:${Math.floor(moment.unix(member.joinedAt).valueOf()/1000000)}:D> at <t:${Math.floor(moment.unix(member.joinedAt).valueOf()/1000000)}:t> <t:${Math.floor(moment.unix(member.joinedAt).valueOf()/1000000)}:R>`, false)
        //.addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, false)
    }
    embeduserinfo
      .addField("Account Created On:", `<t:${Math.floor(moment.unix(user.createdAt).valueOf()/1000000)}:D> at <t:${Math.floor(moment.unix(user.createdAt).valueOf()/1000000)}:t> <t:${Math.floor(moment.unix(user.createdAt).valueOf()/1000000)}:R>`, false) 
      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    //if roletags addfield to embeduserinfo
    if(inGuild && roleTags){
      embeduserinfo.addField("Roles:", roleTags.join(', '), false);
    }

    message.channel.send({embeds:[embeduserinfo]})
  }
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['user'],
  permLevel: "User"
};

export const help = {
  name: "threadUser",
  category: "Moderation",
  description: "Reposts the userID of the user in a mod thread",
  usage: "threadUser"
};
