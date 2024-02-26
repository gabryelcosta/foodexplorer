const OrderService = require('../../services/Orders/OrderService');

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.moveFromShoppingCartToOrders = this.moveFromShoppingCartToOrders.bind(this);
    this.getOrdersByUserId = this.getOrdersByUserId.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
  }

  async moveFromShoppingCartToOrders(req, res) {
    try {
      const { userId } = req.params;
      const orders = await this.orderService.moveFromShoppingCartToOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error('Erro no controlador:', error);
      res.status(500).json({ error: 'Ocorreu um erro inesperado' });
    }
  }

  async getOrdersByUserId(req, res) {
    try {
      const { userId } = req.params;
      const orders = await this.orderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      console.error('Erro no controlador:', error);
      res.status(500).json({ error: 'Ocorreu um erro inesperado' });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Erro no controlador:', error);
      res.status(500).json({ error: 'Ocorreu um erro inesperado' });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      await this.orderService.updateOrderStatus(orderId, status);
      res.json({ message: 'Status do pedido atualizado com sucesso' });
    } catch (error) {
      console.error('Erro no controlador:', error);
      res.status(500).json({ error: 'Ocorreu um erro inesperado' });
    }
  }
}

module.exports = OrderController;