const fs = require('fs');
const { format } = require('date-fns');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');
const morgan = require('morgan');

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(
    // `${app.use(morgan('dev'))}`,
    `${req.method}\t${res.Status}\t${req.headers.origin}\t${req.url}`,
    'reqLoger.txt'
  );
  // console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
