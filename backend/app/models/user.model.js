module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    login: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    root: {
      type: Sequelize.BOOLEAN
    }
  });

  return Users;
};
