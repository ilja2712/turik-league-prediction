const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// получить всех пользователей из базы данных
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Произошла ошибка при получении пользователей."
      });
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
