// DishRepository.js
const sqliteConnection = require("../../database/sqlite");

// DishRepository.js
class DishRepository {
  async create(dishData) {
    const database = await sqliteConnection();
    const { lastID } = await database.run("INSERT INTO dishes (image, name, category, price, description) VALUES (?,?,?,?,?)", [dishData.image, dishData.name, dishData.category, dishData.price, dishData.description]);

    for (let ingredient of dishData.ingredients) {
      await database.run("INSERT INTO dish_ingredients (dish_id, ingredient_name) VALUES (?,?)", [lastID, ingredient]);
    }

    return { id: lastID, ...dishData };
  }
}

module.exports = DishRepository;