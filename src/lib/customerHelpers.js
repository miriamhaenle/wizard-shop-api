const findCustomerCart = (carts, customerId) =>
  carts.find((cart) => cart.customer._id == customerId);

export { findCustomerCart };
