import ShoppingCart from '../models/ShoppingCart.model.js';
import { Customer } from '../models/Customer.model.js';
import { findCustomerCart } from '../lib/customerHelpers.js';
import { calculateSum } from '../lib/calculations.js';
import { findAll, findById, findAndUpdate } from '../lib/databaseHelpers.js';

async function getShoppingCart(req, res) {
  const customerId = req.params.customerId;

  try {
    const allCarts = await findAll(ShoppingCart);
    const cart = findCustomerCart(allCarts, customerId);
    res.json(cart);
  } catch (error) {
    res.json(error);
  }
}

async function postShoppingCart(req, res) {
  const customerId = req.params.customerId;
  const customer = await findById(Customer, customerId);
  const allCarts = await findAll(ShoppingCart);
  const orderItems = req.body.orderItems;
  const orderSum = calculateSum(orderItems);

  if (findCustomerCart(allCarts, customerId)) {
    const existingCart = findCustomerCart(allCarts, customerId);
    existingCart.orderItems.push(orderItems);
    existingCart.orderSum += orderSum;

    try {
      const updatedCart = await findAndUpdate(
        ShoppingCart,
        existingCart._id,
        existingCart
      );
      res.json(updatedCart);
    } catch (error) {
      res.json(error);
    }

    // ShoppingCart.findByIdAndUpdate(existingCart._id, existingCart)
    //   .then((updatedCart) => res.json(updatedCart))
    //   .catch((error) => res.json(error));
  } else {
    const newShoppingCart = new ShoppingCart({
      customer: customer,
      orderItems: req.body.orderItems,
      orderSum: orderSum,
    });

    try {
      const shoppingCart = await saveToDb(newShoppingCart);
      res.json(shoppingCart);
    } catch (error) {
      res.json(error);
    }
  }
}

export { getShoppingCart, postShoppingCart };
