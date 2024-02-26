const ShoppingCartRepository = require("../../repositories/ShoppingCart/ShoppingCartRepository");

class ShoppingCartService {
  constructor() {
    this.shoppingCartRepository = new ShoppingCartRepository();
  }

  async addOrder({ userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image }) {
    const order = {
      userId,
      userName,
      dishId,
      dishName,
      quantity,
      totalValue,
      dishPrice,
      image,
    };
    console.log('Enviando pedido para o repositório:', order);
    const result = await this.shoppingCartRepository.addItemToCart(order);
    console.log('Resultado retornado do repositório:', result);
    return result;
  }

  async getOrders(userId) {
    const orders = await this.shoppingCartRepository.getOrdersByUserId(userId);
    return orders;
  }

  async deleteOrder(orderCode) {
    await this.shoppingCartRepository.deleteOrder(orderCode);
  }
}

module.exports = ShoppingCartService;