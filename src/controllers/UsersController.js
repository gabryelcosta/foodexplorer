// UsersController.js
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const UserUpdateService = require("../services/UserUpdateService");

class UsersController {

  async create(request, response) {
    const { name, email, role, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, role, password });

    return response.status(201).send();
  }

  async update(request, response) {
    const { name, email, password, old_password, theme_preference } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);
    await userUpdateService.execute({ user_id, name, email, password, old_password, theme_preference });

    return response.status(200).json();
  }

  async getTheme(request, response) {
    const { id: user_id } = request.user;

    const userRepository = new UserRepository();
    const { theme_preference } = await userRepository.findById(user_id);

    if (!theme_preference) {
      throw new AppError("Usuário não encontrado.");
    }

    return response.json({ theme: theme_preference });
  }
}

module.exports = UsersController;