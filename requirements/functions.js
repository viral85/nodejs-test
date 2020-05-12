//function for create log file for specific module
global.createLog = function(log_name) {
    return require('simple-node-logger').createRollingFileLogger({
        logDirectory: 'logs',
        fileNamePattern: log_name + '_<DATE>.log',
        dateFormat: 'YYYY_MM_DD',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    });
};

//function for send success object to response
global.sendSuccess = function(req, res, data, code) {
    res.send({
        type: "success",
        message: config.messages[code],
        data: data,
        code: code,
    });
}

//function for send error object to response
global.sendError = function(req, res, data, code) {
    res.send({
        type: "error",
        message: config.messages[code],
        data: data,
        code: code,
    });
}