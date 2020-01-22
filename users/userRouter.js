const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.use(errorHandler);

router.post("/", validateUser, (req, res) => {});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      next("User does not exist");
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    next("missing user data");
  } else if (!req.body.name) {
    next("missing required name field");
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    next("missing post data");
  } else if (!req.body.text) {
    next("missing required text field");
  } else {
    next();
  }
}

function errorHandler(error, req, res, next) {
  console.log("error: ", error);
  res.status(400).json({ message: error });
}

module.exports = router;
