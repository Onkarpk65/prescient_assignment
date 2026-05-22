const badRequestResponseObject = {
  success: false,
  err: [],
  data: {},
  message: "Malformed Request | Bad Request",
};

const validateCreateProductRequest = (req, res, next) => {
  console.log("Validating create product request with body:", req.body);
  const { name, price } = req.body;
  let errors = [];

  if (!name) {
    errors.push({
      field: "name",
      message: "Name is required",
    });
  }
  if (!price) {
    errors.push({
      field: "price",
      message: "Price is required",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      ...badRequestResponseObject,
      err: errors,
    });
  }
  next();
};

const validateUpdateProductRequest = (req, res, next) => {
  const { name, price } = req.body;
  let errors = [];

  if (name) {
    errors.push({
      field: "name",
      message: "Name cannot be updated",
    });
  }

  if (!price || typeof price !== "number") {
    errors.push({
      field: "price",
      message: "Price is required and must be a number",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      ...badRequestResponseObject,
      err: errors,
    });
  }
  next();
};

module.exports = {
  validateCreateProductRequest,
  validateUpdateProductRequest,
};
