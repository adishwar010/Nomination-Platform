const serverErrorResponse = () => ({
  status: "error",
  message: "Internal Server Error",
});

const failErrorResponse = (msg) => ({
  status: "fail",
  message: msg,
});

module.exports = { serverErrorResponse, failErrorResponse };
