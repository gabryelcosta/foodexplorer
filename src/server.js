require('express-async-errors');
require('dotenv/config');

const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

migrationsRun();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 500,
    message: "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));