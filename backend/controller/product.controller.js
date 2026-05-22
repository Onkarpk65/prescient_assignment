const productService = require("../services/product.services");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");

/**
 *
 * @param {*} req - Request object containing product details in req.body
 * @param {*} res - Response object used to send back the appropriate response based on the outcome of the product creation process
 * @returns - JSON response with status code indicating success or failure of the product creation operation, along with relevant data or error messages
 */

const create = async (req, res) => {
  try {
    const response = await productService.create(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.code = response.code;
      errorResponseBody.message =
        "Unable to create product due to validation errors";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Product created successfully";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.message = error.message;
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns - fetches all the product items
 */

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

/**
 *
 * @param {*} req -> takes req.params.id, req.body with updated product details
 * @param {*} res -> returns JSON response with status code indicating success or failure of the product update operation, along with relevant data or error messages
 * @returns
 */

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

/**
 *
 * @param {*} req -> takes req.params.id of the item to delete
 * @param {*} res -> returns the deleted item
 * @returns
 */

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
