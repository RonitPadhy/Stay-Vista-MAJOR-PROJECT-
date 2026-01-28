const express = require("express");
const router = express.Router();

// Users
router.get("/users", (req, res) => {
  res.send("Hi,I am root");
});

router.get("/users/:id", (req, res) => {
  res.send("Show route for ID");
});

router.post("/users", (req, res) => {
  res.send("POST route is working well");
});

router.delete("/users/:id", (req, res) => {
  res.send("Delete route is working well");
});

module.exports = router;