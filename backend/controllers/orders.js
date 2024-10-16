const { ctrlWrapper } = require("../decorators");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const { Counter } = require("../models/counter");

const createCart = async (req, res) => {
  const order = new Order({ status: "Pending" });

  await order.save();

  res.status(201).json({
    message: "Кошик успішно створено",
    status: "OK",
    code: 201,
    orderId: order._id,
  });
};

const addToCart = async (req, res) => {
  const { productId, orderId } = req.params;

  let order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({
      message: "Кошик не знайдено",
      status: "NOT_FOUND",
      code: 404,
    });
  }

  const orderItem = new OrderItem({
    quantity: 1,
    product: productId,
  });

  await orderItem.save();

  order.orderItems.push(orderItem);
  await order.save();

  res.status(201).json({
    message: "Книга успішно додана до кошика",
    status: "OK",
    code: 201,
    bookAdded: orderItem,
    orderId: order._id,
  });
};

const getAllOrders = async (req, res) => {
  const orderList = await Order.find().populate({
    path: "orderItems",
    populate: { path: "product" },
  });

  const ordersWithTotalPrice = orderList.map((order) => {
    const totalPrice = order.orderItems.reduce((total, orderItem) => {
      const itemTotalPrice = orderItem.quantity * orderItem.product.price;
      return total + itemTotalPrice;
    }, 0);

    return {
      _id: order._id,
      orderItems: order.orderItems,
      status: order.status,
      totalPrice: totalPrice,
    };
  });

  res.status(200).json(ordersWithTotalPrice);
};

const updateBookQuantity = async (req, res) => {
  const { orderId, orderItemId } = req.params;
  const { quantity } = req.body;

  const updatedOrderItem = await OrderItem.findByIdAndUpdate(
    orderItemId,
    { quantity },
    { new: true }
  );

  if (!updatedOrderItem) {
    return res.status(404).send({ message: "Елемент замовлення не знайдено" });
  }

  res.status(200).json(updatedOrderItem);
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    return res.status(404).json({ message: "Замовлення не знайдено" });
  }

  await OrderItem.deleteMany({ _id: { $in: order.orderItems } });

  res.status(200).json({
    message: "Замовлення та всі елементи замовлення успішно видалені",
  });
};

const deleteOrderItem = async (req, res) => {
  const { orderItemId } = req.params;

  const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId);

  if (!deletedOrderItem) {
    return res.status(404).json({ message: "Елемент замовлення не знайдено" });
  }

  res.status(200).json({ message: "Елемент замовлення успішно видалено" });
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate({
    path: "orderItems",
    populate: { path: "product" },
  });

  if (!order) {
    return res.status(404).json({ message: "Замовлення не знайдено" });
  }

  const totalPrice = order.orderItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  order.totalPrice = totalPrice;
  await order.save();

  res.status(200).json(order);
};

const placeOrder = async (req, res) => {
  const {
    name,
    surname,
    email,
    phoneNumber,
    city,
    address,
    payment,
    delivery,
    comment,
  } = req.body;
  const { orderId } = req.params;

  const counter = await Counter.findOneAndUpdate(
    {},
    { $inc: { orderNumber: 1 } },
    { new: true, upsert: true }
  );
  const orderNumber = counter.orderNumber;

  await counter.save();

  // console.log(orderNumber);

  const order = await Order.findById(orderId).populate({
    path: "orderItems",
    populate: { path: "product" },
  });
  // console.log(order);

  if (!order) {
    return res.status(404).json({ message: "Замовлення не знайдено" });
  }

  order.orderNumber = orderNumber - 1;
  // console.log(order);

  order.customerInfo = {
    name,
    surname,
    email,
    phoneNumber,
    city,
    address,
    payment,
    delivery,
    comment,
  };

  // console.log(order.customerInfo);
  order.status = "processing";
  await order.save();

  res.status(200).json({ message: "Замовлення успішно оформлено", order });
};

module.exports = {
  createCart: ctrlWrapper(createCart),
  addToCart: ctrlWrapper(addToCart),
  getAllOrders: ctrlWrapper(getAllOrders),
  updateBookQuantity: ctrlWrapper(updateBookQuantity),
  deleteOrder: ctrlWrapper(deleteOrder),
  deleteOrderItem: ctrlWrapper(deleteOrderItem),
  getOrderById: ctrlWrapper(getOrderById),
  placeOrder: ctrlWrapper(placeOrder),
};
