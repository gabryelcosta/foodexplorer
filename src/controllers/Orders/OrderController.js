const OrderService = require('../../services/Orders/OrderService');

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.moveFromShoppingCartToOrders = this.moveFromShoppingCartToOrders.bind(this);
  }

  async moveFromShoppingCartToOrders(req, res) {
    const { userId } = req.params;
    console.log('Controlador: recebido pedido para mover itens para pedidos para o usuário:', userId);
    const orders = await this.orderService.moveFromShoppingCartToOrders(userId);
    console.log('Controlador: pedidos movidos:', orders);
    res.json(orders);
  }
}

module.exports = OrderController;