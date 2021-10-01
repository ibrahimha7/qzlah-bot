require("dotenv").config();
const { getFoodFromApi } = require("./services/getFoodInfo");
const {
  getMessageLanguage,
  getMessageTranslation,
} = require("./services/getTranslations");

// To use offline
// const { Telegraf } = require("telegraf");
// const bot = new Telegraf(process.env.BOT_TOKEN);

// To use online
const { Composer } = require("micro-bot");
const bot = new Composer();

bot.start((ctx) => ctx.reply("ارحب"));

bot.use((ctx) => {
  let message = ctx.message.text;
  getMessageLanguage(message).then((res) => {
    if (res === "ar") {
      getMessageTranslation(message, "ar", "en").then((res) => {
        getFoodFromApi(res).then((res) => {
          ctx.reply(`انت اجلت: ${message}
          وفيهو: ${res.cal} سعره
          حجمو بالجرام: ${res.sizeInG}
          `);
        });
      });
    } else {
      getFoodFromApi(message).then((res) => {
        ctx.reply(`انت اجلت: ${message}
        وفيهو: ${res.cal} سعره
        حجمو بالجرام: ${res.sizeInG}
        `);
      });
    }
  });
});

// to use offline
// bot.launch();

// to use online
module.exports = bot;
