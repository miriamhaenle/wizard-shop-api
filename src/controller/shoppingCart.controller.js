import ShoppingCart from '../models/ShoppingCart.model.js';
import { Customer } from '../models/Customer.model.js';

async function getShoppingCart(req, res) {
  const customerId = req.params.customerId;

  const allCarts = await ShoppingCart.find();
  const cart = allCarts.filter((cart) => cart.customer._id == customerId);

  res.json(cart);
}

async function postShoppingCart(req, res) {
  const customerId = req.params.customerId;
  const customer = await findCustomer(customerId);
  const allCarts = await ShoppingCart.find();
  const orderItems = req.body.orderItems;
  const orderSum = calculateSum(orderItems);

  if (findCustomersCart(allCarts, customerId)) {
    const existingCart = findCustomersCart(allCarts, customerId);

    existingCart.orderItems.push(orderItems);
    existingCart.orderSum += orderSum;

    ShoppingCart.findByIdAndUpdate(existingCart._id, existingCart, {
      new: true,
    })
      .then((updatedCart) => res.json(updatedCart))
      .catch((error) => res.json(error));
  } else {
    const newShoppingCart = new ShoppingCart({
      customer: customer,
      orderItems: req.body.orderItems,
      orderSum: orderSum,
    });
    newShoppingCart
      .save()
      .then((shoppingCart) => res.json(shoppingCart))
      .catch((error) => res.json(error));
  }
}

export { getShoppingCart, postShoppingCart };

async function findCustomer(customerId) {
  return await Customer.findById(customerId);
}

function calculateSum(items) {
  return items.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.amount,
    0
  );
}

function findCustomersCart(carts, customerId) {
  return carts.find((cart) => cart.customer._id == customerId);
}
