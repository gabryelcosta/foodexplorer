const ShoppingCartService = require('../../services/ShoppingCart/ShoppingCartServices');

class ShoppingCartController {
  constructor() {
    this.shoppingCartService = new ShoppingCartService();
    this.addOrder = this.addOrder.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    console.log('ShoppingCartService:', this.shoppingCartService);
  }

  async addOrder(req, res) {
    const { userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image } = req.body;
    console.log(`userId: ${userId}, dishId: ${dishId}, quantity: ${quantity}, userName: ${userName}, dishName: ${dishName}, totalPrice: ${totalValue}, dishPrice: ${dishPrice}`);
    try {
      const order = await this.shoppingCartService.addOrder({ userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image });
      console.log('Pedido retornado do serviço:', order);
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
    const { orderCode } = req.params;
    try {
      await this.shoppingCartService.deleteOrder(orderCode);
      res.json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({ error: error.toString() });
    }
  }
}

module.exports = ShoppingCartController;