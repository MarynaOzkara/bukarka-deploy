const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { HttpError } = require("../../../helpers");
const { Newsletter } = require("../../../models/newsletter");
const { User } = require("../../../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "customer" }).select(
    "-password -token"
  );
  const total = await User.countDocuments({ role: "customer" });

  res.status(200).json({
    total,
    users: users,
  });
};
const getAllSubscribers = async (req, res) => {
  const subscribers = await Newsletter.find({ subscribe: true });
  const total = await Newsletter.countDocuments({ subscribe: true });
  res.status(200).json({ total, users: subscribers });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (user) {
    const { id, name, surname, email, phone, role, bookClub } = user;
    res
      .status(200)
      .json({ user: { id, name, surname, email, phone, role, bookClub } });
  } else {
    throw HttpError(404, `User with id: ${id} not found`);
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  const newUserData = {
    email,
    role,
  };
  const user = await User.findByIdAndUpdate(id, newUserData, { new: true });
  if (user) {
    const { id, name, surname, email, phone, role, bookClub } = user;
    res
      .status(200)
      .json({ user: { id, name, surname, email, phone, role, bookClub } });
  } else {
    throw HttpError(404, `User with id: ${id} not found`);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  res.status(200).json({ messege: "User deleted success" });
};
module.exports = {
  getAllUsers: ctrlWrapper(getAllUsers),
  getUserById: ctrlWrapper(getUserById),
  getAllSubscribers: ctrlWrapper(getAllSubscribers),
  updateUser: ctrlWrapper(updateUser),
  deleteUser: ctrlWrapper(deleteUser),
};
