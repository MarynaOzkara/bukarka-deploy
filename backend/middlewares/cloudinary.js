const cloudinary = require("../servises/cloudinary/cloudinary");

const uploadCloudinary = async (req, res, next) => {
  try {
    const images = req.files;
    // console.log(images);
    if (!images) {
      res.status(400).json({ message: "Files not added! Add new files." });
    }
    const imagesUrls = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: "bukarka",
        width: 440,
        height: 672,
        crop: "fill",
      });

      imagesUrls.push(result.secure_url);
    }
    req.images = imagesUrls;
    // console.log(req.images);
    next();
  } catch (error) {
    res.status(500).json(`Internal error at Cloudinary Upload - ${error}`);
  }
};
const removeImage = async (req, res) => {
  const image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) {
      return res.json({ succes: false, err });
    }
    res.json({ message: `Image ${image_id} deleted succesfully` });
  });
  res.json("Remove Image");
};
module.exports = {
  uploadCloudinary,
  removeImage,
};
