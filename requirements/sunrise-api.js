/**
 * This library is for get sunrise sunset timing from lat long, also for specific date
 * Also we can get day length for that day
 */
let sunrise_logs = createLog('sunrise_logs');
var _this;
class sunriseApi {

    constructor() {
        _this = this;
        this.url = "https://api.sunrise-sunset.org/json";
    }

    /**
     * Sand GET request to url for get values from sunrise API
     * @param {array object} params
     */
    sendRequest(params) {
        return new Promise(function(resolve, reject) {
            let qs = require('qs');
            let https = require('https');
            let baseUrl = _this.url;
            baseUrl += "?" + qs.stringify(params);
            https.get(baseUrl, function(response) {
                let body = '';
                response.on('data', function(chunk) {
                    body += chunk
                })
                response.on('end', function() {
                    sunrise_logs.info("=================");
                    sunrise_logs.info("---URL---");
                    sunrise_logs.info(baseUrl);
                    sunrise_logs.info("---REQUESTED DATA---");
                    sunrise_logs.info(params);
                    try {
                        body = JSON.parse(body);
                        if (body.status != "OK") {
                            sunrise_logs.info("---ERROR---");
                            sunrise_logs.info(body);
                            reject(body);
                        } else {
                            sunrise_logs.info("---SUCCESS---");
                            sunrise_logs.info(body);
                            resolve(body);
                        }
                    } catch (error) {
                        sunrise_logs.info("---CATCH ERROR---");
                        sunrise_logs.info(error);
                        reject(error);
                    }
                })
            }).on('error', reject)
        });
    }

    /**
     * This function use for get data from lat long
     * @param {float} lat
     * @param {float} lng
     */
    getSunRiseData(lat, lng) {
        return new Promise(async function(resolve, reject) {
            let params = {
                lat: lat,
                lng: lng
            };
            try {
                let response = await _this.sendRequest(params);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
}
module.exports = sunriseApi;