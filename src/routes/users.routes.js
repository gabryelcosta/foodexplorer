const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/Users/UsersController");
const ImageController = require("../controllers/UploadImage/ImageController");
const UsersValidatedController = require('../controllers/Users/UsersValidatedController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const imageController = new ImageController();
const usersValidatedController = new UsersValidatedController();

// usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.get("/theme", ensureAuthenticated, usersController.getTheme);
usersRoutes.patch("/:id/avatar", ensureAuthenticated, upload.single("avatar"), imageController.updateUserImage);

module.exports = usersRoutes;