// create error

const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

// Error Handler

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    status: "fail",
    message: err?.message,
    stack: err?.stack,
  });
};
  
  module.exports = {
    errorHandler,
    createError
  }
  