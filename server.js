const express = require("express");
const userRouter = require("./users/userRouter");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();
server.use(express.json(), helmet(), morgan("dev", logger));

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

module.exports = server;
