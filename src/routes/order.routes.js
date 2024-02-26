const { Router } = require('express');

const OrderController = require('../controllers/Orders/OrderController');
const orderController = new OrderController();

const ordersRoutes = Router();

ordersRoutes.post("/orders/:userId", orderController.moveFromShoppingCartToOrders);

module.exports = ordersRoutes;