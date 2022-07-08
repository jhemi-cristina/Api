const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsRouter.post("/", sessionsController.create);

module.exports = sessionsRoutes;
