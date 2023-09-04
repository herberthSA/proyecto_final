import { logger } from "../utils/logger.js"

export const test = async (req,res)=>{
  logger.debug('logger dev');
  logger.http('logger http');
  logger.info('logger info');
  logger.warn('logger warn');
  logger.error('logger error');
  logger.verbose('logger verbose')
  res.status(200).send({msg:'ok'});
}