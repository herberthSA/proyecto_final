import { connect } from "mongoose";
import { logger } from "./logger.js";
import CustomError from "../services/error/custom-error.js";
import EErros from "../services/error/enums.js";


export async function connectMongo() {
  try {
    await connect(
      process.env.MONGO_URL_1,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DBNAME // Especifica el nombre de tu base de datos aquí
      }
    );
    logger.info("plug to mongo!");
  } catch (error) {
    logger.error(error);
    CustomError.createError({
      name: "connect to DB error",
      cause:'base de datos caidad',
      message: "Error trying to connect DB",
      code: EErros.DATABASES_ERROR
    
  })
    //throw "can not connect to the db";
  }
}

//F3wBDRmov2yob7pt