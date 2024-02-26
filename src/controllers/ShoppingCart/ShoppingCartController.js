const ShoppingCartService = require('../../services/ShoppingCart/ShoppingCartServices');

class ShoppingCartController {
  constructor() {
    this.shoppingCartService = new ShoppingCartService();
    this.addOrder = this.addOrder.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  async addOrder(req, res) {
    const { orderCode, userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image } = req.body;
    try {
      const order = await this.shoppingCartService.addOrder({ orderCode, userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image });
      res.json(order);
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      res.status(500).json({ error: error.toString() });
    }
  }

  async getOrders(req, res) {
    const { userId } = req.params;
    try {
      const orders = await this.shoppingCartService.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error('Erro ao recuperar pedidos:', error);
      res.status(500).json({ error: error.toString() });
    }
  }

  async deleteOrder(req, res) {
    const { id } = req.params;
    try {
      await this.shoppingCartService.deleteOrder(id);
      res.json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({ error: error.toString() });
    }
  }
}

module.exports = ShoppingCartController;