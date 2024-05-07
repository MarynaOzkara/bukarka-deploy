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

const { getAllOrders, getOrederById } = require("./orders/orders");

module.exports = {
  getProfile,
  editProfile,
  newsletter,
  activateNewsleter,
  deactivateNewslette,
  subscribe,
  activateSubscription,
  unsubscribe,
  getAllOrders,
  getOrederById,
};
