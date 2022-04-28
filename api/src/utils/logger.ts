import pino from 'pino';
import pretty from 'pino-pretty';

const logger = pino(
  {},
  pretty({
    translateTime: 'yyyy-mm-dd HH:MM:ss',
    ignore: 'pid,hostname',
    colorize: true,
  })
);

export default logger;
