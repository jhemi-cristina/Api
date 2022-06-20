/**
 * index - Get para listar vários registros.
 * show - Get para exibir um registros especifico.
 * create - post para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - delete para remover um registro
 */
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExits = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExits) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuario não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já esta em uso.");
    }

    user.name = name;
    user.email = email;

    await database.run(
      `
    UPDATE users SET 
    name = ?,
    email = ?,
    updated_at = ?
    WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );
    return response.status(200).json();
  }
}

module.exports = UsersController;
