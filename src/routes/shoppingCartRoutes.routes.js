import express from 'express';

const router = express.Router();

router.get('/shopping-cart/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  const order = [
    { name: 'Nimbus 2000', price: 2000, amount: 1 },
    { name: 'Butter Beer', price: 200, amount: 6 },
  ];

  const orderSum = order.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.amount,
    0
  );

  res.json({
    customer: 'Harry Potter',
    orderItems: order,
    orderSum,
  });
});

export default router;
