const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const autorizeRoles = require("./autorizeRoles");
module.exports = {
  validateBody,
  authenticate,
  autorizeRoles,
};
