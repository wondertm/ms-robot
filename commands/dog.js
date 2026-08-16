const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  let animal = 'dog';
  const { image, fact } = await fetch('https://some-random-api.com/animal/'+animal).then(response => response.json());
  //returns a random dog image and fact with format:
  //{
    // "image": "some link",
    // "fact": "some fact"
  //}
  //get image
  
  const embed = {
    description: "Random "+animal+" picture:",
    title: fact,
    image: {
      url: image
    },
    //random color
    color: Math.floor(Math.random() * 16777215).toString(16)
  };
  
  message.channel.send({ embeds: [embed] });
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "dog",
  category: "Fun",
  description: "Grab a random dog fact and cute picture",
  usage: "dog"
};
