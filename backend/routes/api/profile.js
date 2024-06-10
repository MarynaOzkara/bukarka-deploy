const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profile/index");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.get("/", authenticate, profileController.getProfile);
router.put(
  "/edit",
  authenticate,
  validateBody(schemas.editUserJoiSchema),
  profileController.editProfile
);
router.get("/newsletter", authenticate, profileController.newsletter);
router.get(
  "/newsletter/activate/:activateToken",
  profileController.activateNewsleter
);
router.get(
  "/newsletter/deactivate",
  authenticate,
  profileController.deactivateNewslette
);

router.get("/orders", authenticate, profileController.getAllOrders);
router.get("/orders/:orderId", authenticate, profileController.getOrederById);
router.get("/bonuses");
router.get("/favorites", authenticate, profileController.getFavorites);
router.get(
  "/favorites/:bookId",
  authenticate,
  profileController.addToFavorites
);

module.exports = router;
