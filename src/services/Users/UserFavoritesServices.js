// favoriteDishesService.js
const FavoriteDishesRepository = require('../../repositories/Users/UsersFavoritesRepository');

class FavoriteDishesService {
  constructor() {
    this.favoriteDishesRepository = new FavoriteDishesRepository();
  }

  async getFavoriteDishesByUserId(userId) {
    try {
      return await this.favoriteDishesRepository.getFavoriteDishesByUserId(userId);
    } catch (error) {
      console.error('Erro no serviço:', error);
      throw error;
    }
  }

  async addFavoriteDish(data) {
    try {
      return await this.favoriteDishesRepository.addFavoriteDish(data);
    } catch (error) {
      console.error('Erro no serviço:', error);
      throw error;
    }
  }

  async deleteFavoriteDish(id) {
    try {
      return await this.favoriteDishesRepository.deleteFavoriteDish(id);
    } catch (error) {
      console.error('Erro no serviço:', error);
      throw error;
    }
  }
}

module.exports = FavoriteDishesService;