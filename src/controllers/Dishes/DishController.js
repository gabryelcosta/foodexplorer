// DishController.js
const DishService = require("../../services/Dishes/DisheService");
const ImageService = require("../../services/UploadImage/ImageService");

class DishController {
  constructor() {
    this.dishService = new DishService();
    this.imageService = new ImageService();
    this.create = this.create.bind(this);
    this.findAllWithIngredients = this.findAllWithIngredients.bind(this);
    this.findOneWithIngredients = this.findOneWithIngredients.bind(this);
    this.update = this.update.bind(this);
  }

  async create(request, response) {
    const { name, description, price, ingredients, category } = request.body;
    const imageFileName = request.file.filename;
    const parsedIngredients = JSON.parse(ingredients);

    if (!imageFileName) {
      return response.status(400).json({ error: 'Image is required' });
    }

    const filename = await this.imageService.uploadDishImage(imageFileName);
    const newDish = await this.dishService.create({ name, description, price, image: filename, ingredients: parsedIngredients, category });

    return response.json(newDish);
  }

  async findAllWithIngredients(request, response) {
    try {
      const dishes = await this.dishService.findAllWithIngredients();
      return response.json(dishes);
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while fetching dishes with ingredients' });
    }
  }

  async findOneWithIngredients(request, response) {
    try {
      const { id } = request.params;
      const dish = await this.dishService.findOneWithIngredients(id);
      if (!dish) {
        return response.status(404).json({ error: 'Dish not found' });
      }
      return response.json(dish);
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while fetching the dish' });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description, price, ingredients, category } = request.body;
    const imageFileName = request.file.filename;
    const parsedIngredients = JSON.parse(ingredients);

    if (!imageFileName) {
      return response.status(400).json({ error: 'Image is required' });
    }

    const oldDish = await this.dishService.findOneWithIngredients(id);
    if (!oldDish) {
      return response.status(404).json({ error: 'Dish not found' });
    }

    // Atualize a imagem do prato
    const filename = await this.imageService.updateDishImage(id, imageFileName);

    const updatedDish = await this.dishService.update(id, { name, description, price, image: filename, ingredients: parsedIngredients, category });

    return response.json(updatedDish);
  }
}

module.exports = DishController;