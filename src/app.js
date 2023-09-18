import express from "express";
import MongoStore from 'connect-mongo';
import morgan from "morgan";
import session from 'express-session';
import passport from "passport";
import { Server } from 'socket.io';
import { routerProducts } from "./routes/productsRouters.js";
import { connectMongo } from "./utils/connections.js";
import { routerCarts } from "./routes/cartsRouter.js";
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js";
import { productsHtml } from "./routes/productsHtml.js";
import { cartstsHtml } from "./routes/cartsHtml.js";
import { loginRouter } from "./routes/login.router.js";
import { viewsRouter } from "./routes/views.routers.js";
import { iniPassport } from "./config/passportConfig.js";
import dotenv from "dotenv";
import { MsgModel } from "./DAO/Mongo/models/chat.model.js";
import { routerVistaChatSocket } from "./routes/chat-vista-router.js";
import errorHandler from "./middlewares/error.js";
import { routerMocking } from "./routes/mockingproducts.router.js";
import CustomError from "./services/error/custom-error.js";
import EErros from "./services/error/enums.js";
import { logger } from "./utils/logger.js";
import { loggerTest } from "./routes/loggerTest.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import   _path from './dirname.js';
import 'express-async-errors';

dotenv.config();
const app = express();
const port = process.env.PORT;
connectMongo();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({ mongoUrl:'mongodb+srv://admin:F3wBDRmov2yob7pt@ecommerce.eq2fgne.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 7200 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars',handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine","handlebars");

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));

// Rutas: API REST con Json
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

//Rutas : HTML render
app.use('/products',productsHtml);
app.use('/carts',cartstsHtml);
//chat-socket
app.use('/vista/chat', routerVistaChatSocket);
app.get('/test',async (req,res)=>{
   
});
//rutas-session
app.use('/api/sessions',loginRouter);
/* app.use('/api/sessions/current', (req, res) => {
  console.log(req.session.user)
  return res.status(200).json({
    status: 'success',
    msg: 'datos de la session',
    payload: req.session.user || {},
  });
}); */
app.use('/', viewsRouter);
app.use('/mockingproducts', routerMocking);
app.use('/loggerTest',loggerTest)
app.get('/testerror', async(req,res)=>{
  CustomError.createError({
        name: "User creation error",
        cause:'desconocido',
        message: "Error trying to create user",
        code: EErros.INVALID_TYPES_ERROR
      
    })
})

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de productos y carrito",
      description: "Ecommerce endpoint de productos y carrito",
    },
  },
  apis: [`${_path}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(errorHandler);

const httpServer = app.listen(port, () => {
    logger.info(`listening on http://localhost:${port}`);
  });

const socketServer = new Server(httpServer);
socketServer.on('connection', (socket) => {
   socket.on('msg_front_to_back', async (msg) => {
   const msgCreated = await MsgModel.create(msg);
   const msgs = await MsgModel.find({});
   socketServer.emit('todos_los_msgs', msgs);
  });
});