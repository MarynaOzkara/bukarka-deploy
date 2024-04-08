const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/index");
const { authenticate, autorizeRoles } = require("../../middlewares");

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

router
  .route("/subscribers")
  .get(authenticate, autorizeRoles("admin"), adminController.getAllSubscribers);

module.exports = router;
