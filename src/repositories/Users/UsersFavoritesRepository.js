const sqliteConnection = require("../../database/sqlite");

class FavoriteDishesRepository {
  async addFavoriteDish({ userId, dishId, dishName, image }) {
    try {
      const database = await sqliteConnection();
      const { lastID } = await database.run("INSERT INTO favorite_dishes (user_id, dish_id, dish_name, image) VALUES (?,?,?,?)", [userId, dishId, dishName, image]);
      const dish = await database.get("SELECT * FROM favorite_dishes WHERE id = ?", [lastID]);
      return dish;
    } catch (error) {
      console.error('Erro ao adicionar prato aos favoritos:', error);
      throw error;
    }
  }

  async getFavoriteDishesByUserId(userId) {
    const database = await sqliteConnection();
    const dishes = await database.all("SELECT * FROM favorite_dishes WHERE user_id = ?", [userId]);
    return dishes;
  }

  async deleteFavoriteDish(id) {
    const database = await sqliteConnection();
    await database.run("DELETE FROM favorite_dishes WHERE id = ?", [id]);
  }
}

module.exports = FavoriteDishesRepository;