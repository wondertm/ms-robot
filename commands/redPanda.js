const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

export async function run(client, message, args, level) {
  const { image, fact } = await fetch('https://some-random-api.com/animal/red_panda').then(response => response.json());
  
  const embed = {
    description: "Random red panda picture:",
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
  aliases: ['red', 'redpanda', 'red_panda'],
  permLevel: "User"
};

export const help = {
  name: "redpanda",
  category: "Fun",
  description: "Grab a random red panda fact and cute picture",
  usage: "redpanda"
};
