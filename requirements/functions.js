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

//function for modify any function to take max parallel request
global.asyncLimit = function(fn, n)  {
    let pendingPromises = [];
    return async function(...args) {
        while (pendingPromises.length >= n) {
            await Promise.race(pendingPromises).catch(() => {});
        }
        const p = fn.apply(this, args);
        pendingPromises.push(p);
        await p.catch(() => {});
        pendingPromises = pendingPromises.filter(pending => pending !== p);
        return p;
    };
};

//function for get random number between range with decimal
global.getRandomInRange = function(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}

//get random lat-longs as per count
global.getLatLongs = function(count) {
    let latLongs = [];
    for (let i = 0; i < count; i++) {
        latLongs.push([
            getRandomInRange(0, 90, 7),
            getRandomInRange(-180, 180, 7)
        ]);
    }
    return latLongs;
}