// import fs from "fs";

// const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()} - ${logData}`;
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (err) {
//     console.log(err);
//   }
// }

// const loggerMiddleware = async (req, res, next) => {
//   // 1. Log request body.
//   if (!req.url.includes("signin")) {
//     const logData = `${req.url} - ${JSON.stringify(req.body)}`;
//     await log(logData);
//   }
//   next();
// };

// export default loggerMiddleware;

import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'log.txt', level: 'info' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

const loggerMiddleware = (req, res, next) => {
  // 1. Log request body.
  if (!req.url.includes("signin")) {
    const logData = {
      timestamp: new Date().toISOString(),
      url: req.url,
      body: req.body,
    };
    console.log(logData);
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
