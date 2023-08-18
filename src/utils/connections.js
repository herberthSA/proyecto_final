import { connect } from "mongoose";
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
    console.log("plug to mongo!");
  } catch (error) {
    console.log(error);
    throw "can not connect to the db";
  }
}

//F3wBDRmov2yob7pt