const data = require("./data");

module.exports = {
    findAll() {
        return data.users;
    },

    create(user) {
        data.users.push(user);
    },

    destroy(id) {
        data.users.splice(
            data.users.findIndex((user) => user.id === id),
            1
        );
    },

    update(id, user) {
        data.users[data.users.findIndex((user) => user.id === id)] = user;
    },
};

beforeEach(() => {
    data.users.push(
      { id: 1, email: "user1@test.com" },
      { id: 2, email: "user2@test.com" },
      { id: 3, email: "user3@test.com" }
    );
  });
  