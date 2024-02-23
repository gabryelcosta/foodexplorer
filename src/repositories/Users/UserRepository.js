// UserRepository.js
const sqliteConnection = require("../../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    return user;
  }

  async findById(id) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    return user;
  }

  async create({ name, email, role, password }) {
    const database = await sqliteConnection();
    const { lastID } = await database.run("INSERT INTO users (name, email, role, password) VALUES (?,?,?,?)", [name, email, role, password]);
    return { id: lastID };
  }

  async update(user) {
    const database = await sqliteConnection();
    await database.run(`UPDATE users SET name = ?, email = ?, password = ?, theme_preference = ?, updated_at = DATETIME('now') WHERE id = ?`, [user.name, user.email, user.password, user.theme_preference, user.id]);
  }
}

module.exports = UserRepository;