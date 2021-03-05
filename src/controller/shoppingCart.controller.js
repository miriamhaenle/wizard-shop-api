import ShoppingCart from '../models/ShoppingCart.model.js';
import { Customer } from '../models/Customer.model.js';

async function getShoppingCart(req, res) {
  const customerId = req.params.customerId;

  const allCarts = await ShoppingCart.find();
  console.log(allCarts[0].customer._id);
  const customerCart = allCarts.filter(
    (cart) => cart.customer._id === customerId
  );

  res.json(customerCart);
}

async function postShoppingCart(req, res) {
  const customerId = req.params.customerId;
  const customer = await findCustomer(customerId);

  const orderItems = req.body.orderItems;

  const orderSum = calculateSum(orderItems);

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
