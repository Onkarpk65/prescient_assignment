const Product = require("../model/product.model");

const create = async (data) => {
  try {
    const response = await Product.create(data);
    console.log("Response from Product.create:", response);
    if (!response) {
      return {
        err: "Unable to create the product",
        code: 500,
      };
    }

    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      console.error("Validation error:", error.message);
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return { err: err, code: 422 };
    }
    console.log("Error creating the product: ", error.message);
    throw error;
  }
};

const getAll = async () => {
  try {
    const response = await Product.find({});
    return response;
  } catch (error) {
    throw error;
  }
};

const update = async (itemId, data) => {
  try {
    const query = {};

    if (data.price) {
      query.name = data.name;
      query.price = data.price;
    }

    const response = await Product.findByIdAndUpdate(itemId, query, {
      returnDocument: "after",
    });
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return {
        err: err,
        code: 422,
      };
    }
    throw error;
  }
};

const deleteProduct = async (itemId) => {
  try {
    const response = await Product.findByIdAndDelete(itemId);

    if (!response) {
      return {
        err: "Product with given id not found",
        code: 404,
      };
    }

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAll,
  update,
  deleteProduct,
};
