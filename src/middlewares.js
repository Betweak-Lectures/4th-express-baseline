const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createSession = require("express-session");
const { authenticate, loginRequired } = require("./utils/auth");

const sessionMiddleware = createSession({
  secret: process.env.SESSION_SECRET || "<my-secret>",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

function useMiddlewares(app) {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, "public")));
  app.use(sessionMiddleware);
  app.use(authenticate);
  return app;
}
exports.useMiddlewares = useMiddlewares;
// module.exports = { useMiddlewares };
