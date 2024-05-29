const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/index");
const { authenticate, autorizeRoles } = require("../../middlewares");
const upload = require("../../middlewares/upload");
const { uploadCloudinary } = require("../../middlewares/cloudinary");

router.post(
  "/books",
  authenticate,
  autorizeRoles("admin"),
  upload.array("images"),
  uploadCloudinary,
  adminController.addBook
);
router
  .route("/books/:bookId")
  .get(authenticate, autorizeRoles("admin"), adminController.getBookById)
  .put(authenticate, autorizeRoles("admin"), adminController.updateBookById)
  .delete(authenticate, autorizeRoles("admin"), adminController.deleteBookById);
router.patch(
  "/books/:bookId/images",
  authenticate,
  autorizeRoles("admin"),
  upload.array("images"),
  uploadCloudinary,
  adminController.updateImages
);
router.get(
  "/users",
  authenticate,
  autorizeRoles("admin"),
  adminController.getAllUsers
);
router
  .route("/users/:id")
  .get(authenticate, autorizeRoles("admin"), adminController.getUserById)
  .put(authenticate, autorizeRoles("admin"), adminController.updateUser)
  .delete(authenticate, autorizeRoles("admin"), adminController.deleteUser);

router.get(
  "/orders",
  authenticate,
  autorizeRoles("admin"),
  adminController.getAllOrders
);
router
  .route("/orders/:orderNumber")
  .get(authenticate, autorizeRoles("admin"), adminController.getOrderById)
  .put(authenticate, autorizeRoles("admin"), adminController.updateOrder)
  .delete(authenticate, autorizeRoles("admin"), adminController.deleteOrder);

router
  .route("/subscribers")
  .get(authenticate, autorizeRoles("admin"), adminController.getAllSubscribers);

router.post("/feedback", adminController.feedback);

module.exports = router;
