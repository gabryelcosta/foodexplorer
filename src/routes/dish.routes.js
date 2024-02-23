const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const DishController = require('../controllers/Dishes/DishController');
const ImageController = require("../controllers/UploadImage/ImageController");
const dishController = new DishController();
const imageController = new ImageController();

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);


dishRoutes.post("/uploadImage", upload.single("imageFile"), imageController.uploadDishImage);
dishRoutes.delete("/deleteImage/:filename", imageController.deleteImage);
dishRoutes.post("/", upload.single('imageFile'), dishController.create);
dishRoutes.patch("/imageDish", upload.single("imageDish"), imageController.updateDishImage);


module.exports = dishRoutes;