const axios = require("axios");
const reducer = (previousValue, currentValue) => previousValue + currentValue;
// Getting food information
const getFoodFromApi = async (food) => {
  return await axios
    .request({
      method: "GET",
      url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
      params: { query: food },
      headers: {
        "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
        "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
      },
    })
    .then(function(response) {
      let x;
      if (response.data.length < 1) {
        x = {
          food: response.data[0].name,
          cal: response.data[0].calories,
          sizeInG: response.data[0].serving_size_g,
        };
      } else {
        let countName = [];
        let countCalories = [];
        let countGrams = [];
        response.data.map((item) => {
          countName.push(item.name);
          countCalories.push(item.calories);
          countGrams.push(item.serving_size_g);
        });
        x = {
          food: countName.join(),
          cal: countCalories.reduce(reducer),
          sizeInG: countGrams.reduce(reducer),
        };
      }

      return x;
    })
    .catch((err) => {
      let x;
      if (err.response.status) {
        x = {
          food: food,
          cal: "مادريت",
          sizeInG: "مادريت",
        };
      }
      return x;
    });
};

module.exports = {
  getFoodFromApi: getFoodFromApi,
};
