const {
  getProfile,
  editProfile,
  newsletter,
  activateNewsleter,
  deactivateNewslette,
  subscribe,
  activateSubscription,
  unsubscribe,
} = require("./settings/settings");
const { userCart } = require("./orders/orders");

module.exports = {
  getProfile,
  editProfile,
  newsletter,
  activateNewsleter,
  deactivateNewslette,
  subscribe,
  activateSubscription,
  unsubscribe,
  userCart,
};
