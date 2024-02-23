// DishController.js
const DishService = require("../../services/Dishes/DisheService");

class DishController {
  constructor() {
    this.dishService = new DishService();
    this.create = this.create.bind(this);
  }

  async create(request, response) {
    const { name, description, price, ingredients, category } = request.body;
    const imageFileName = request.file.filename;
    const parsedIngredients = JSON.parse(ingredients);

    if (!imageFileName) {
      return response.status(400).json({ error: 'Image is required' });
    }

    const newDish = await this.dishService.create({ name, description, price, image: imageFileName, ingredients: parsedIngredients, category });

    return response.json(newDish);
  }
}

module.exports = DishController;