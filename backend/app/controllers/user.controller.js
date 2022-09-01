const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");

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

exports.sendMail = (req, res) => {
      console.log("request came");
      let user = req.body;
      sendMail(user, info => {
        res.send(info);
      })

    async function sendMail(user, callback) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: details.email,
          pass: details.password
        }
      });

    let mailOptions = {
      from: '"Ilja" <kozlikov.ilja27@gmail.ru>', // sender address
      to: user.email, // list of receivers
      subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
      html: `<h1>Hi ${user.name}</h1><br>
      <h4>Thanks for joining us</h4>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
  }
}

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
