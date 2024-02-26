const ImageRepository = require("../../repositories/UploadImage/ImageRepository");
const DiskStorage = require("../../providers/DiskStorage");

class ImageService {
  constructor() {
    this.imageRepository = new ImageRepository();
    this.diskStorage = new DiskStorage();
  }

  async updateUserImage(user_id, imageFileName) {

    const userData = await this.imageRepository.findUserById(user_id);

    if (!userData) {
      throw new Error(`User not found`);
    }

    if (userData.avatar) { // Check if userData.avatar exists
      await this.diskStorage.deleteFile(userData.avatar); // Delete the existing image
    }

    const filename = await this.diskStorage.saveFile(imageFileName);
    userData.avatar = filename;

    await this.imageRepository.updateUser(userData);


    return userData;
  }

  async uploadDishImage(imageFile) {
    const filename = await this.diskStorage.saveFile(imageFile);

    return filename;
  }

  async updateDishImage(dish_id, imageFileName) {
    const dishData = await this.imageRepository.findDishById(dish_id);

    if (!dishData) {
      throw new Error(`Dish not found`);
    }

    if (dishData.image) {
      await this.diskStorage.deleteFile(dishData.image);
    }

    const filename = await this.diskStorage.saveFile(imageFileName);

    await this.imageRepository.updateDishImage(dish_id, filename);

    dishData.image = filename;
    return dishData;
  }

  async deleteImage(filename) {
    await this.diskStorage.deleteFile(filename);
  }
}

module.exports = ImageService;