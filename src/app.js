const dotenv = require("dotenv");
dotenv.config();

const createError = require("http-errors");
const express = require("express");
const { useMiddlewares } = require("./middlewares");
const apiRouter = require("./routes/api/apiRouter");
const connectDB = require("./models/connect");

connectDB();

const app = express();
// 미들웨어 등록
useMiddlewares(app);

// 라우터 등록
app.use("/api", apiRouter);

// 404에러 처리
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  const message = err.message;
  const error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({
    message: message,
    error: error,
  });
});

module.exports = app;
