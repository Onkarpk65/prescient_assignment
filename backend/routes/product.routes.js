const productController = require("../controller/product.controller");
const productMiddleware = require("../middleware/product.middleware");

const router = (app) => {
  // CREATE
  app.post(
    "/shoppingcart/api/v1/items",
    productMiddleware.validateCreateProductRequest,
    productController.create,
  );

  // GET ALL
  app.get("/shoppingcart/api/v1/items", productController.getAll);

  // UPDATE
  app.put(
    "/shoppingcart/api/v1/items/:id",
    productMiddleware.validateUpdateProductRequest,
    productController.update,
  );

  // DELETE
  app.delete("/shoppingcart/api/v1/items/:id", productController.deleteProduct);
};

module.exports = router;
