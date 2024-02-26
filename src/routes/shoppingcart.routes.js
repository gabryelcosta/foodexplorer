const { Router } = require('express');

const ShoppingCartController = require('../controllers/ShoppingCart/ShoppingCartController');
const shoppingCartController = new ShoppingCartController();

const shoppingCartRoutes = Router();

shoppingCartRoutes.post("/", shoppingCartController.addOrder);
shoppingCartRoutes.get("/:userId", shoppingCartController.getOrders);
shoppingCartRoutes.delete("/:orderCode", shoppingCartController.deleteOrder);

module.exports = shoppingCartRoutes;