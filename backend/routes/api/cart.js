const express = require("express");
const { authenticate } = require("../../middlewares");
const cartController = require("../../controllers/cart/index");
const checkoutController = require("../../controllers/checkout/index");
const router = express.Router();

router.get("/", authenticate, cartController.getCart);
router.post("/add/:bookId", authenticate, cartController.addOneToCart);
router.post("/add", authenticate, cartController.addManyToCart);
router.patch(
  "/decrease/:bookId",
  authenticate,
  cartController.decreaseItemQuantity
);
router.patch(
  "/increase/:bookId",
  authenticate,
  cartController.increaseItemQuantity
);
router.patch("/delete/:bookId", authenticate, cartController.deleteItem);
router.delete("/clear", authenticate, cartController.clearCart);

router.post("/checkout", authenticate, checkoutController.createCheckout);
router.get(
  "/checkout/:orderId",
  authenticate,
  checkoutController.getCheckoutById
);

module.exports = router;
