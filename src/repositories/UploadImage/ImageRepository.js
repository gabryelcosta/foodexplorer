// ImageRepository.js
const knex = require("../../database/knex");

class ImageRepository {
  findUserById(id) {
    return knex('users').where({ id }).first();
  }

  findDishById(id) {
    return knex('dishes').where({ id }).first();
  }

  updateUser(userData) {
    const { id, ...data } = userData;
    return knex('users').update(data).where({ id });
  }

  updateDish(dishData) {
    const { id, ...data } = dishData;
    return knex('dishes').update(data).where({ id });
  }

  updateDishImage(id, imageFileName) {
    return knex('dishes').update({ image: imageFileName }).where({ id });
  }

  async delete(id) {
    await knex('dishes').where({ id }).del();
  }
}

module.exports = ImageRepository;