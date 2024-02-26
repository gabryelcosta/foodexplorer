const ShoppingCartRepository = require("../../repositories/ShoppingCart/ShoppingCartRepository");

class ShoppingCartService {
  constructor() {
    this.shoppingCartRepository = new ShoppingCartRepository();
  }

  async addOrder({ orderCode, userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image }) {
    const order = {
      orderCode,
      userId,
      userName,
      dishId,
      dishName,
      quantity,
      totalValue,
      dishPrice,
      image,
    };
    const result = await this.shoppingCartRepository.addItemToCart(order);
    return result;
  }

  async getOrders(userId) {
    const orders = await this.shoppingCartRepository.getOrdersByUserId(userId);
    return orders;
  }

  async deleteOrder(id) {
    await this.shoppingCartRepository.deleteOrder(id);
  }
}

module.exports = ShoppingCartService;