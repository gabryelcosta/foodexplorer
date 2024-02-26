const sqliteConnection = require("../../database/sqlite");

class OrderRepository {
  async moveFromShoppingCartToOrders(userId) {
    const { format } = require('date-fns');
    try {
      const database = await sqliteConnection();

      const shoppingCartItems = await database.all("SELECT * FROM shoppingCart WHERE userId = ?", [userId]);
      for (const item of shoppingCartItems) {
        const formattedDate = format(new Date(), 'dd/MM/yyyy');
        const formattedHour = format(new Date(), 'HH:mm');
        await database.run(
          "INSERT INTO orders (userId, dishId, quantity, userName, dishName, totalPrice, date, hour, status, orderCode, price) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
          [item.userId, item.dishId, item.quantity, item.userName, item.dishName, item.totalValue, formattedDate, formattedHour, 'Pendente', item.orderCode, item.dishPrice]
        );
      }

      await database.run("DELETE FROM shoppingCart WHERE userId = ?", [userId]);

      const orders = await database.all("SELECT * FROM orders WHERE userId = ?", [userId]);

      return orders;
    } catch (error) {
      console.error('Erro no repositório:', error);
      throw error;
    }
  }

  async getOrdersByUserId(userId) {
    const database = await sqliteConnection();
    return database.all("SELECT * FROM orders WHERE userId = ?", [userId]);
  }

  async getAllOrders() {
    const database = await sqliteConnection();
    return database.all("SELECT * FROM orders");
  }

  async updateOrderStatus(orderId, status) {
    const database = await sqliteConnection();
    return database.run("UPDATE orders SET status = ? WHERE orderCode = ?", [status, orderId]);
  }
}
module.exports = OrderRepository;