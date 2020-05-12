const express = require('express');
const router = express.Router();
const moment = require('moment');

/**
 * GET request for start demo
 * 
 */
router.get('/', function(req, res, next) {
    res.render('index');
});

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
        let currentRequest = 0;
        let currentSuccessRequest = 0;
        let counter = 0;

        //function for parallel request to get sunrise data from lat long index wise
        let callAsyncFunction = async function(currentLatLong) {
            counter++;

            let lat = req.body.latLongs[currentLatLong][0];
            let long = req.body.latLongs[currentLatLong][1];

            try {
                //call sunrise api function for get detail data from lat long
                let sunriseApiClass = require('../requirements/sunrise-api');
                let sunriseApi = new sunriseApiClass();
                let response = await sunriseApi.getSunRiseData(lat, long);

                //assign sunrise, sunset timings and day length to object
                req.body.latLongs[currentLatLong].push(response["results"]["sunrise"]);
                req.body.latLongs[currentLatLong].push(response["results"]["sunset"]);
                req.body.latLongs[currentLatLong].push(response["results"]["day_length"]);
            } catch (error) {
                req.body.latLongs[currentLatLong].push("-");
                req.body.latLongs[currentLatLong].push("-");
                req.body.latLongs[currentLatLong].push("-");
            }

            counter--;
            currentSuccessRequest++;

            //if all request completed then response to client for request completion
            if (currentSuccessRequest >= req.body.latLongs.length) {
                fetch_timings_logs.info("RESPONSE : ");
                fetch_timings_logs.info(req.body.latLongs);
                return sendSuccess(req, res, { timings: req.body.latLongs }, "001");
            }
        }

        //timer function for frequent call parallel request as per parallelReq variable value
        let timerFunction = function() {
            if (counter < config.parallelReq) {
                callAsyncFunction(currentRequest++);
            }
            if (currentRequest >= req.body.latLongs.length) {
                return;
            } else {
                setTimeout(timerFunction, 10);
            }
        }

        timerFunction();
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

module.exports = router;