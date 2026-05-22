const successResponseBody = {
  success: true,
  message: "Successfully processed the request",
  data: {},
  err: {},
};

const errorResponseBody = {
  success: false,
  message: "Something went wrong, cannot process the request",
  data: {},
  err: {},
};

module.exports = {
  successResponseBody,
  errorResponseBody,
};
