const { Telegraf } = require("telegraf");
const { v4: uuidV4 } = require("uuid");
require("dotenv").config();
let factGenerator = require("./factGenerator");
const PORT = process.env.PORT || 3030;

// code to create an instance of the bot:

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  let message = ` Lucky😃 Welcomes! you to the Kingdom of Animals🦁\nPlease use the /fact command to receive a new fact`;
  ctx.reply(message);
});

// command handler for generating a fact

bot.command("fact", async (ctx) => {
  try {
    ctx.reply("generating image , please wait..!!!");
    let imagePath = './temp/${uuidV4()}.jpg';
    await factGenerator.generateImage(imagePath);
    await ctx.replyWithPhoto({ source: imagePath });
    factGenerator.deleteImage(imagePath);
  } catch (error) {
    console.log("error", error);
    ctx.reply("error sending image");
  }
});
bot.launch();
