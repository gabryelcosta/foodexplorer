const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;

    const database = await sqliteConnection();

    const getUserById = async (id) => {
      const userData = await database.get("SELECT * FROM users WHERE id = ?", [id]);
      return userData;
    };

    const checkUserExists = await getUserById(user);

    if (!Array.isArray(checkUserExists) || checkUserExists.length === 0) {
      throw new AppError("Sem Autorização", 401);
    }

    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;