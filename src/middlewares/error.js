import EErros from "../services/error/enums.js";
import { logger } from "../utils/logger.js";

export default (error, req, res, next) => {
  logger.error(error.cause);

  switch (error.code) {
    case EErros.ROUTING_ERROR:
        res
        .status(404)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EErros.INVALID_TYPES_ERROR:
        res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EErros.DATABASES_ERROR:
        res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    default:
        res.status(500).send({ status: "error", error: "Unhandled error" });
      break;
  }
};