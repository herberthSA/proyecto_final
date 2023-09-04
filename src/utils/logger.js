import winston from "winston";
import dotenv, { configDotenv } from "dotenv";
dotenv.config();
const loggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.colorize({ all: true }),
    }),
   ],
});

const loggerProduct = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.colorize({ all: true }),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "info",
        format: winston.format.simple(),
      }),
    ],
  });
  const getLogger = () => {
    
    if (process.env.LOGGER == 'dev') {
        
      return loggerDev;
    } else {
        
      return loggerProduct;
    }
  };
export const logger = getLogger()