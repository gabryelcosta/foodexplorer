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

  async findAllWithIngredients() {
    const database = await sqliteConnection();
    const dishes = await database.all("SELECT * FROM dishes");

    for (let dish of dishes) {
      const ingredients = await database.all("SELECT ingredient_name FROM dish_ingredients WHERE dish_id = ?", [dish.id]);
      dish.ingredients = ingredients.map(ingredient => ingredient.ingredient_name);
    }
    return dishes;
  }

  async findOneWithIngredients(id) {
    const database = await sqliteConnection();
    const dish = await database.get("SELECT * FROM dishes WHERE id = ?", [id]);

    if (dish) {
      const ingredients = await database.all("SELECT ingredient_name FROM dish_ingredients WHERE dish_id = ?", [id]);
      dish.ingredients = ingredients.map(ingredient => ingredient.ingredient_name);
    }

    return dish;
  }

  async update(id, dishData) {
    const database = await sqliteConnection();
    await database.run("UPDATE dishes SET image = ?, name = ?, category = ?, price = ?, description = ? WHERE id = ?", [dishData.image, dishData.name, dishData.category, dishData.price, dishData.description, id]);

    await database.run("DELETE FROM dish_ingredients WHERE dish_id = ?", [id]);

    for (let ingredient of dishData.ingredients) {
      await database.run("INSERT INTO dish_ingredients (dish_id, ingredient_name) VALUES (?,?)", [id, ingredient]);
    }

    return { id: id, ...dishData };
  }
}

module.exports = DishRepository;