const sqliteConnection = require("../../database/sqlite");

class ShoppingCartRepository {
  async addItemToCart({ userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image }) {
    try {
      const database = await sqliteConnection();
      const { lastID } = await database.run("INSERT INTO shoppingCart (userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image) VALUES (?,?,?,?,?,?,?,?)", [userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image]);
      const item = await database.get("SELECT * FROM shoppingCart WHERE orderCode = ?", [lastID]);
      console.log('Item adicionado ao carrinho:', item);
      return item;
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      throw error;
    }
  }

  async getOrdersByUserId(userId) {
    const database = await sqliteConnection();
    const orders = await database.all("SELECT * FROM shoppingCart WHERE userId = ?", [userId]);
    return orders;
  }

  async deleteOrder(orderCode) {
    const database = await sqliteConnection();
    await database.run("DELETE FROM shoppingCart WHERE orderCode = ?", [orderCode]);
  }
}

module.exports = ShoppingCartRepository;