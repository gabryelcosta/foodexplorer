const OrderRepository = require('../../repositories/Orders/OrderRepository');

class OrderService {
  constructo() {
    this.orderRepository = new OrderRepository();
  }

  async moveFromShoppingCartToOrders(userId) {
    console.log('Serviço: movendo itens para pedidos para o usuário:', userId);
    const orders = await this.orderRepository.moveFromShoppingCartToOrders(userId);
    console.log('Serviço: pedidos movidos:', orders);
    return orders;
  }
}

module.exports = OrderService;