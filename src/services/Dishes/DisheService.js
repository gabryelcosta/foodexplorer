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
      ingredients, // Adicione isto
    };

    const createdDish = await this.dishRepository.create(dish);

    return createdDish;
  }
}

module.exports = DishService;