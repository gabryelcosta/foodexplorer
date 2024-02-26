const sqliteConnection = require("../../database/sqlite");

class ShoppingCartRepository {
  async addItemToCart({ orderCode, userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image }) {
    try {
      const database = await sqliteConnection();
      const { lastID } = await database.run("INSERT INTO shoppingCart (orderCode, userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image) VALUES (?,?,?,?,?,?,?,?,?)", [orderCode, userId, userName, dishId, dishName, quantity, totalValue, dishPrice, image]);
      const item = await database.get("SELECT * FROM shoppingCart WHERE id = ?", [lastID]);
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

  async deleteOrder(id) {
    const database = await sqliteConnection();
    await database.run("DELETE FROM shoppingCart WHERE id = ?", [id]);
  }
}

module.exports = ShoppingCartRepository;