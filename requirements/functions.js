/**
 * Wrapper Function for add logs into log files using Simple Node Logger package.
 * @param       log_name  String   File name of log file where you want to add logs.
 * 
 * @returns     Void
 */
global.createLog = function(log_name) {
    return require('simple-node-logger').createRollingFileLogger({
        logDirectory: 'logs',
        fileNamePattern: log_name + '_<DATE>.log',
        dateFormat: 'YYYY_MM_DD',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    });
};

/**
 * API response helper for send success response in JSON format
 * @param   req     Object  Request object
 * @param   res     Object  Response Object 
 * @param   data    Object  JSON object of data which need to pass in response
 * 
 * @returns Void
 */
global.sendSuccess = function(req, res, data) {
    res.send({
        type: "success",
        data: data,
        code: "200",
    });
}

/**
 * API response helper for send error response in JSON format
 * @param   req     Object  Request object
 * @param   res     Object  Response Object 
 * @param   data    Object  JSON object of data which need to pass in response
 * @param   code    String  Error code wich is used for identify reason of error 
 * 
 * @returns  Void
 */
global.sendError = function(req, res, data, code) {
    res.send({
        type: "error",
        message: config.messages[code],
        data: data,
        code: code,
    });
}

/**
 * Function for modify any function to take max parallel request
 * @param   fn     Function  Reference function
 * @param   n      Object    Counter of parrellal request
 *
 */

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

/**
 * Function for get random number between range with decimal
 * @param   from    Number  Lower bound number of the range 
 * @param   to      Number  Upper bound number of the range
 * @param   fixed   Number  Integer value of numbers decimal points
 * 
 * @returns Number  Random generated number
 * 
 */
global.getRandomInRange = function(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}

/**
 * Generate Latitude and Longitude randomly.
 * @param   count   Number      Number of pairs need to generate
 * 
 * @returns Array   Set of generated latitude and longitude
 */
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