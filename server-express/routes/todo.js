const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function(req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      })
      next()
    } catch(error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
})

router.post("/", async function(req, res) {
  const { title, description } = req.body
  const todo = new Todo({
    title, description, author: req.payload.id, dateCreated: Date.now()
  })
  todo.save().then(({ _id, title, description, author, dateCreated }) => {
    return res.status(201).json({
      id: _id, title, description, author, dateCreated
    })
  }).catch((error) => {
    return res.status(500).json({ error: error.message });
  });
})

router.get("/", async function(req, res) {
  Todo.find().where("author").equals(req.payload.id).then((todos) => {
    return res.status(200).json(todos)
  }).catch((error) => {
    return res.status(500).json({ error: error.message });
  });
})