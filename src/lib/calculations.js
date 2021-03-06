function calculateSum(items) {
  return items.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.amount,
    0
  );
}

export { calculateSum };
