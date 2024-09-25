const bcrypt = require("bcrypt");
const saltRounds = 10;

const users = [
  {
    userName: "Admin",
    email: "admin@example.com",
    password: "Admin123"
  }, // Después cambiar role: "admin" directamente en MongoDB
  {
    userName: "Paquito",
    email: "paquito@example.com",
    password: "Paquito123"
  }
];

const usersPasswordHashed = async () => {
  for (let user of users) {
    user.password = bcrypt.hashSync(user.password, saltRounds);
  }
  return users;
};

usersPasswordHashed();

module.exports = users;
