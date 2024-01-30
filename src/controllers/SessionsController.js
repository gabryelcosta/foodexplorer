const authConfig = require('../configs/auth');
const AppError = require('../utils/AppError');
const sqliteConnection = require("../database/sqlite");
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class SessionsController {
  async create(request, response){
    const database = await sqliteConnection();
    const { email, password } = request.body;

    const user = await database.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      throw new AppError("email e/ou senha incorreta", 401);
    }

    const isPasswordHashed = user.password.startsWith('$2a$');

    let passwordMatched = false;

    if (isPasswordHashed) {
      // Senha já está hasheada, compara normalmente
      passwordMatched = await compare(password, user.password);
    } else {
      // Senha não está hasheada, compara diretamente
      passwordMatched = password === user.password;
    }

    if (!passwordMatched) {
      throw new AppError("email e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 8 * 60 * 60 * 1000
    });

    delete user.password;

    return response.json({ user });
  }
}
module.exports = SessionsController;