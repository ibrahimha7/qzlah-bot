const axios = require("axios");

// Detect the message language
const getMessageLanguage = async (msg) => {
  return await axios
    .request({
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/BreakSentence",
      params: { "api-version": "3.0" },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
      },
      data: [{ Text: msg }],
    })
    .then(function(response) {
      // console.log("return value", response.data[0].detectedLanguage.language);
      return response.data[0].detectedLanguage.language;
    });
};

// Translate the message
const getMessageTranslation = async (msg, from, to) => {
  return await axios
    .request({
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        to: to,
        from: from,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
      },
      data: [{ Text: msg }],
    })
    .then(function(response) {
      // console.log("translate", response.data[0].translations[0].text);
      return response.data[0].translations[0].text;
    });
};

module.exports = {
  getMessageLanguage: getMessageLanguage,
  getMessageTranslation: getMessageTranslation,
};

// module.exports = getMessageLanguage;
// module.exports = getMessageTranslation;
