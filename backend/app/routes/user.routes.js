module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve all published 
  router.get("/published", users.findAllPublished);

  // Retrieve a single with id
  router.get("/:id", users.findOne);

  // Update a with id
  router.put("/:id", users.update);

  // Delete a  with id
  router.delete("/:id", users.delete);

  // Delete all 
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
