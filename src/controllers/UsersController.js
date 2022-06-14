const AppError = require("../utils/AppError");
class UsersController {
  /**
   * index - Get para listar vários registros.
   * show - Get para exibir um registros especifico.
   * create - post para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - delete para remover um registro
   */

  create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError("Nome é obrigatório");
    }

    res.status(201).json({ name, email, password });
  }
}

module.exports = UsersController;
