const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

export async function run(client, message, args, level) { // eslint-disable-line no-unused-vars
  let animal = 'bird';
  const { image, fact } = await fetch("https://some-random-api.com/animal/" + animal).then(response => response.json());
  const embed = {
    description: "Random " + animal + " picture:",
    title: fact,
    image: {
      url: image
    },
    //random color
    color: Math.floor(Math.random() * (Math.pow(2, 24) - 1)).toString(16)
  };

  message.channel.send({ embeds: [embed] });
}

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bird"],
  permLevel: "User"
};

export const help = {
  name: "birb",
  category: "Fun",
  description: "Grab a random birb fact and cute picture",
  usage: "birb"
};
