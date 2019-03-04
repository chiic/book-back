var log4js = require('log4js');
var config = require('../config')
var path = require('path');

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    cheese: {
      type: 'file',
      filename: path.join(config.log_dir, 'cheese.log')
    }
  },
  categories: {
    default: {
      appenders: ['cheese', 'console'],
      level: 'error'
    }
  }
});

const logger = log4js.getLogger('cheese');
logger.level = 'debug';

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

module.exports = logger;