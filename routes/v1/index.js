const express = require('express');
const router = express.Router();
const moment = require('moment');

/**
 * GET request for fetch timings from lat long object
 * 
 */
router.post('/fetch-times', function(req, res, next) {
    if (req.body.latLongs != undefined) {

        let fetch_timings_logs = createLog('fetch_timings_logs');
        fetch_timings_logs.info("=================");
        fetch_timings_logs.info("REQUEST : ");
        fetch_timings_logs.info(req.body.latLongs);

        //define variables for parallel requests
        let currentSuccessRequest = 0;

        //call sunrise api function for get detail data from lat long
        let sunriseApiClass = require('../../requirements/sunrise-api');
        let sunriseApi = new sunriseApiClass();

        //modify function for take maximum parallel request
        let modifiedGetSunRiseData = asyncLimit(sunriseApi.getSunRiseData, config.parallelReq);

        //callback function for each response of api
        let callback = function(error, response, inx) {
            if (error == null) {
                //assign sunrise, sunset timings and day length to object
                req.body.latLongs[inx].push(response["results"]["sunrise"]);
                req.body.latLongs[inx].push(response["results"]["sunset"]);
                req.body.latLongs[inx].push(response["results"]["day_length"]);
            } else {
                req.body.latLongs[inx].push("-");
                req.body.latLongs[inx].push("-");
                req.body.latLongs[inx].push("-");
            }
            currentSuccessRequest++;

            //if all request completed then response to client for request completion
            if (currentSuccessRequest >= req.body.latLongs.length) {
                fetch_timings_logs.info("RESPONSE : ");
                fetch_timings_logs.info(req.body.latLongs);
                return sendSuccess(req, res, { timings: req.body.latLongs }, "001");
            }
        }

        for (let inx in req.body.latLongs) {
            let lat = req.body.latLongs[inx][0];
            let long = req.body.latLongs[inx][1];
            modifiedGetSunRiseData(callback, inx, lat, long);
        }

    } else {
        sendError(req, res, {}, "002");
    }
});

/**
 * POST request for get earliest sunrise and its day length
 * 
 */
router.post('/fetch-earliest', function(req, res, next) {
    if (req.body.timings != undefined) {
        let fetch_earliest_logs = createLog('fetch_earliest_logs');
        fetch_earliest_logs.info("=================");
        fetch_earliest_logs.info("REQUEST : ");
        fetch_earliest_logs.info(req.body.timings);
        let minTime = null;
        let locationObject = null;
        //find earliest sunrise from lat long wise data
        for (let inx in req.body.timings) {
            let timestamp = moment(new Date("1970-01-01 " + req.body.timings[inx][2])).unix();
            if (minTime == null || minTime > timestamp) {
                minTime = timestamp;
                locationObject = req.body.timings[inx];
            }
        }
        fetch_earliest_logs.info("RESPONSE : ");
        fetch_earliest_logs.info(locationObject);
        return sendSuccess(req, res, { earliest: locationObject }, "003");
    } else {
        sendError(req, res, {}, "004");
    }
});

/**
 * POST request for get random lat-long as per count given in body
 * 
 */
router.post('/get-lat-longs', function(req, res, next) {
    if (req.body.count != undefined) {
        return sendSuccess(req, res, { currentLatLongs: getLatLongs(req.body.count) }, "005");
    } else {
        sendError(req, res, {}, "006");
    }
});

module.exports = router;