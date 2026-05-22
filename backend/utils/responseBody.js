const successResponseBody = {
  success: true,
  message: "Successfully processed the request",
  data: {},
};

const errorResponseBody = {
  success: false,
  message: "Something went wrong, cannot process the request",
  data: {},
};

module.exports = {
  successResponseBody,
  errorResponseBody,
};
