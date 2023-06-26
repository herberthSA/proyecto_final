import express from "express";
import morgan from "morgan";
import { routerProducts } from "./routes/productsRouters.js";
import { connectMongo } from "./utils/connections.js";
import { routerCarts } from "./routes/cartsRouter.js";
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js";
import { productsHtml } from "./routes/prductsHtml.js";
import { cartstsHtml } from "./routes/cartsHtml.js";

connectMongo();
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars',handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine","handlebars");

app.use(express.static(__dirname + "/public"));
console.log(__dirname + '/public')
app.use(morgan('dev'));

// Rutas: API REST con Json
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

//Rutas : HTML render
app.use('/products',productsHtml);
app.use('/carts',cartstsHtml)


app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });