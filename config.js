var path = require('path');
config = {
    hostname: '0.0.0.0',
    port: 3001,
    log_dir: path.join(__dirname, 'log_dir')
}

module.exports = config;