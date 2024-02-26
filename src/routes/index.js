const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishRouter = require("./dish.routes");
const orderRouter = require("./order.routes");
const shoppingCartRoutes = require("./shoppingcart.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishRouter);
routes.use("/orders", orderRouter);
routes.use("/shoppingcart", shoppingCartRoutes);


module.exports = routes;