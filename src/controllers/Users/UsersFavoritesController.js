// favoriteDishesController.js
const FavoriteDishesService = require('../../services/Users/UserFavoritesServices');

class FavoriteDishesController {
  constructor() {
    this.favoriteDishesService = new FavoriteDishesService();
    this.addFavoriteDish = this.addFavoriteDish.bind(this);
    this.getFavoriteDishesByUserId = this.getFavoriteDishesByUserId.bind(this);
    this.deleteFavoriteDish = this.deleteFavoriteDish.bind(this);
  }

  async getFavoriteDishesByUserId(req, res) {
    const { userId } = req.params;
    try {
      const favoriteDishes = await this.favoriteDishesService.getFavoriteDishesByUserId(userId);
      res.json(favoriteDishes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pratos favoritos' });
    }
  }

  async addFavoriteDish(req, res) {
    const data = req.body;
    try {
      const favoriteDish = await this.favoriteDishesService.addFavoriteDish(data);
      res.json(favoriteDish);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar prato aos favoritos' });
    }
  }

  async deleteFavoriteDish(req, res) {
    const { id } = req.params;
    try {
      await this.favoriteDishesService.deleteFavoriteDish(id);
      res.json({ message: 'Prato removido dos favoritos' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover prato dos favoritos' });
    }
  }
}

module.exports = FavoriteDishesController;