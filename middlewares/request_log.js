var logger = require('../common/logger')

module.exports = function (req, res, next) {
    var t = new Date();
    res.on('finish', function () {
        var duration = ((new Date()) - t);
        logger.info('\n\n New request', t.toISOString())
        logger.info('requset Url:', req.ip);
        logger.info('Completed', res.statusCode, '(' + duration + 'ms)');
    });
    next();
}