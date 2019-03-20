var path = require('path');
config = {
    hostname: '0.0.0.0',
    port: 3001,
    log_dir: path.join(__dirname, 'log_dir'),
    allowOrigin: 'http://localhost:8080',
    credentials: true
}

module.exports = config;