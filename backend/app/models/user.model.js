module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    command_name: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    confirm_reg: {
      type: Sequelize.BOOLEAN
    }
  });

  return Users;
};
