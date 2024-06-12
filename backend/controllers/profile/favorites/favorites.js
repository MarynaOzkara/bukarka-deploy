const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { Profile } = require("../../../models/profile");

const getFavorites = async (req, res) => {
  const { id } = req.user;
  const { favorites } = await Profile.findOne({ owner: id }).populate(
    "favorites"
  );

  res.json({ favorites });
};
const addToFavorites = async (req, res) => {
  const { id } = req.user;
  const { bookId } = req.params;
  const profile = await Profile.findOne({ owner: id });
  const alreadyAdded = profile.favorites.find((el) => el.toString() === bookId);

  if (alreadyAdded) {
    const { favorites } = await Profile.findOneAndUpdate(
      { owner: id },
      {
        $pull: {
          favorites: bookId,
        },
      },
      { new: true }
    ).populate("favorites");
    res.json({ favorites });
  } else {
    const { favorites } = await Profile.findOneAndUpdate(
      { owner: id },
      {
        $push: { favorites: bookId },
      },
      { new: true }
    ).populate("favorites");
    res.json({ favorites });
  }
};
module.exports = {
  addToFavorites: ctrlWrapper(addToFavorites),
  getFavorites: ctrlWrapper(getFavorites),
};
