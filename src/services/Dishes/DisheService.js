// DishService.js
const DishRepository = require("../../repositories/Dishes/DishRepository");

class DishService {
  constructor() {
    this.dishRepository = new DishRepository();
  }

  async create({ image, name, category, ingredients, price, description }) {
    const dish = {
      name,
      image,
      category,
      price,
      description,
      ingredients,
    };

    const createdDish = await this.dishRepository.create(dish);

    return createdDish;
  }

  async findAllWithIngredients() {
    const dishes = await this.dishRepository.findAllWithIngredients();

    return dishes;
  }

  async findOneWithIngredients(id) {
    const dish = await this.dishRepository.findOneWithIngredients(id);
    return dish;
  }

  async update(id, { image, name, category, ingredients, price, description }) {
    const dish = {
      name,
      image,
      category,
      price,
      description,
      ingredients,
    };

    const updatedDish = await this.dishRepository.update(id, dish);

    return updatedDish;
  }

  async delete(id) {
    await this.dishRepository.delete(id);
  }
}


module.exports = DishService;