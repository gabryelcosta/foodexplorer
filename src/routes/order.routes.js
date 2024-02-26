const { Router } = require('express');

const OrderController = require('../controllers/Orders/OrderController');
const orderController = new OrderController();

const ordersRoutes = Router();

ordersRoutes.post("/:userId", orderController.moveFromShoppingCartToOrders);
ordersRoutes.get("/:userId", orderController.getOrdersByUserId);
ordersRoutes.get("/", orderController.getAllOrders);
ordersRoutes.put('/:orderId', orderController.updateOrderStatus);

module.exports = ordersRoutes;