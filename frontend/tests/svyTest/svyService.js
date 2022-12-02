const axios = require("axios");
const data = require("./data");
const API_ENDPOINT = "https://formduo.ddns.net";

module.exports = {
    findAll() {
        return data.surveys;
    },

    create(svy) {
        data.surveys.push(svy);
    },

    destroy(id) {
        data.users.splice(
            data.surveys.findIndex((svy) => svy.id === id),
            1
        );
    },

    update(id, svy) {
        data.surveys[data.surveys.findIndex((svy) => svy.id === id)] = svy;
    },

    findOne(id) {
        return axios
          .get(`${API_ENDPOINT}/survey/share/${id}`)
          .then((response) => response.data);
      },
};
  