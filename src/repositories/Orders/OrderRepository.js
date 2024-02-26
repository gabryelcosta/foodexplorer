const sqliteConnection = require("../../database/sqlite");

class OrderRepository {
  async moveFromShoppingCartToOrders(userId) {
    const database = await sqliteConnection();

    console.log('Buscando itens do carrinho para o usuário:', userId);
    const shoppingCartItems = await database.all("SELECT * FROM shoppingCart WHERE userId = ?", [userId]);
    console.log('Itens do carrinho:', shoppingCartItems);

    console.log('Movendo itens para pedidos...');
    for (const item of shoppingCartItems) {
      await database.run(
        "INSERT INTO orders (userId, dishId, quantity, userName, dishName, totalPrice, date, status) VALUES (?,?,?,?,?,?,?,?)",
        [item.userId, item.dishId, item.quantity, item.userName, item.dishName, item.totalPrice, new Date(), 'Pendente']
      );
    }

    console.log('Removendo itens do carrinho...');
    await database.run("DELETE FROM shoppingCart WHERE userId = ?", [userId]);

    console.log('Buscando novos pedidos...');
    const orders = await database.all("SELECT * FROM orders WHERE userId = ?", [userId]);
    console.log('Novos pedidos:', orders);

    return orders;
  }
}

module.exports = OrderRepository;