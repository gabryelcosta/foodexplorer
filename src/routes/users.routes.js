const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UsersAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UsersValidatedController = require('../controllers/UsersValidatedController');

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const usersValidatedController = new UsersValidatedController();

// usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

module.exports = usersRoutes;