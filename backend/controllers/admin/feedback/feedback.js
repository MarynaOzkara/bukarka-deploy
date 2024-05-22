const ctrlWrapper = require("../../../decorators/ctrlWrapper");
const { sendFeedback } = require("../../../servises/emailServise/emailServise");

const feedback = async (req, res) => {
  const { email, name, phone, orderNumber, message } = req.body;
  if (!message || !email) {
    throw HttpError(400, "Please fill in all required fields");
  }
  try {
    await sendFeedback({
      email,
      name,
      phone,
      orderNumber,
      subject: `Зворотній зв'язок від ${name}`,
      message,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
  res.status(200).json("Your feedback sent successfully");
};
module.exports = { feedback: ctrlWrapper(feedback) };
