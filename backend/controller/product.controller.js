const productService = require("../services/product.services");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");

const create = async (req, res) => {
  try {
    const response = await productService.create(req.body);

    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "Unable to create product due to validation errors";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Product created successfully";
    return res.status(201).json(successResponseBody);
    res.send("Product created successfully");
  } catch (error) {
    errorResponseBody.message = error.message;
    return res.status(500).json(errorResponseBody);
  }
};

const getAll = async (req, res) => {
  try {
    const response = await productService.getAll();

    if (!response || response.length === 0) {
      successResponseBody.data = [];
      successResponseBody.message =
        "No products found, Click on Add Item to add products";
      return res.status(200).json(successResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Products fetched successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.message = error.message;
    return res.status(500).json(errorResponseBody);
  }
};

const update = async (req, res) => {
  try {
    const response = await productService.update(req.params.id, req.body);

    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "Unable to update product due to validation errors";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Product updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.message = error.message;
    return res.status(500).json(errorResponseBody);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await productService.deleteProduct(req.params.id);

    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Product deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.message = error.message;
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = {
  create,
  getAll,
  update,
  deleteProduct,
};
