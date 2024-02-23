const ImageService = require("../../services/UploadImage/ImageService");

class ImageController {
  constructor() {
    this.imageService = new ImageService();
    this.updateUserImage = this.updateUserImage.bind(this);
    this.updateDishImage = this.updateDishImage.bind(this);
    this.uploadDishImage = this.uploadDishImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  async uploadDishImage(request, response) {
    const imageFile = request.file.filename;

    if (!imageFile) {
      return response.status(400).json({ error: 'Image file is required' });
    }

    const filename = await this.imageService.uploadDishImage(imageFile);

    return response.json({ filename });
  }

  async updateUserImage(request, response){
    const { id: user_id } = request.params;
    const imageFileName = request.file.filename;

    const updatedUser = await this.imageService.updateUserImage(user_id, imageFileName);

    return response.json(updatedUser);
  }

  async updateDishImage(request, response){
    const { id: dish_id } = request.params;
    const imageFileName = request.file.filename;

    const updatedDish = await this.imageService.updateDishImage(dish_id, imageFileName);

    return response.json(updatedDish);
  }

  async deleteImage(request, response) {
    const { filename } = request.params;

    await this.imageService.deleteImage(filename);

    return response.status(204).send();
  }
}

module.exports = ImageController;