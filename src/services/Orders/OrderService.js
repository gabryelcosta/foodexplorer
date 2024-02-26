const OrderRepository = require('../../repositories/Orders/OrderRepository');

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async moveFromShoppingCartToOrders(userId) {
    try {
      const orders = await this.orderRepository.moveFromShoppingCartToOrders(userId);
      return orders;
    } catch (error) {
      console.error('Erro no serviço:', error);
      throw error;
    }
  }

  async getOrdersByUserId(userId) {
    return this.orderRepository.getOrdersByUserId(userId);
  }

  async getAllOrders() {
    return this.orderRepository.getAllOrders();
  }

  async updateOrderStatus(orderId, status) {
    try {
      return this.orderRepository.updateOrderStatus(orderId, status);
    } catch (error) {
      console.error('Erro no serviço:', error);
      throw error;
    }
  }
}

module.exports = OrderService;