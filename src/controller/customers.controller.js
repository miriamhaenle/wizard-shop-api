import { request } from 'express';
import { Customer } from '../models/Customer.model.js';

function getCustomers(req, res) {
  Customer.find()
    .then((customers) => res.json(customers))
    .catch((error) => res.error);
}

function getCustomer(req, res) {
  const customerId = req.params.customerId;
  Customer.findById(customerId)
    .then((customer) => res.json(customer))
    .catch((error) => res.json(error));
}

function postCustomer(req, res) {
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  newCustomer
    .save()
    .then(() => res.json('Customer was saved'))
    .catch((error) => res.json(error));
}

export { getCustomers, postCustomer, getCustomer };
