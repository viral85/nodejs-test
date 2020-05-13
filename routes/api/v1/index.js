const express = require('express');
const router = express.Router();
const moment = require('moment');


/**
 * @api {post} /api/v1/fetch-times  Fetch Times
 * @apiDescription  Fetch sunrise and sunset times from provided pair of latitude and longitude.
 * @apiName FetchSunsetSunriseTime
 * @apiGroup API
 * 
 * @apiParam {Object} Request Paylod for example, 
 * {
 *  	"latLongs": [
 *  		[17.3968289, 60.0071548],
 *  		[65.961221, 98.8531282],
 *  		[11.4575184, 135.6674499],
 *  		[72.1231112, 62.6833849],
 *  		[31.0381201, 23.6415639],
 *          ...
 *          ...
 *  		[64.9327807, 138.3228613]
 *  	]
 *  }
 * 
 * @apiSuccessExample Success-Response:
 * {
	"type": "success",
	"data": {
		"timings": [
			[17.3968289, 60.0071548, "1:28:16 AM", "2:24:22 PM", "12:56:06"],
			[65.961221, 98.8531282, "7:50:45 PM", "2:51:06 PM", "19:00:21"],
			[11.4575184, 135.6674499, "8:34:22 PM", "9:12:58 AM", "12:38:36"],
			[72.1231112, 62.6833849, "12:00:01 AM", "12:00:01 AM", "00:00:00"],
			[31.0381201, 23.6415639, "3:30:34 AM", "5:12:59 PM", "13:42:25"],
			...
            ...
            [64.9327807, 138.3228613, "5:26:32 PM", "11:59:34 AM", "18:33:02"]
		]
	},
	"code": "200"
}
 *     
 * @apiErrorExample Error-Response:
 * {
 *   type: 'error',
 *   code: '002',
 *   message:'Send proper latitude and longitude data'
 *  }
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
        let sunriseApiClass = require('../../../requirements/sunrise-api');
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
                return sendSuccess(req, res, { timings: req.body.latLongs });
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
 * @api {post} /api/v1/fetch-earliest  Fetch Earliest
 * @apiDescription  Fetch Earliest time from loaded Data from Sunrise an sunset from passed data.
 * @apiName FetchEarliestTime
 * @apiGroup API
 * 
 * @apiParam {Object} Request Paylod for example, 
 * {
 *  	"timings": [
 *  		[76.8310551, -16.2676327, "12:00:01 AM", "12:00:01 AM", "00:00:00"],
 *  		[77.4732284, 98.9666298, "12:00:01 AM", "12:00:01 AM", "00:00:00"],
 *  		[32.0126322, -89.2594243, "11:00:03 AM", "12:46:43 AM", "13:46:40"],
 *  		[4.1339426, -126.1776524, "2:11:50 PM", "2:30:16 AM", "12:18:26"],
 *          ...
 *          ...
 *          [24.3200837, 34.4865788, "2:59:17 AM", "4:17:30 PM", "13:18:13"]
 *  	]
 * }
 * 
 * @apiSuccessExample Success-Response:
 * {
 *  	"type": "success",
 *  	"data": {
 *  		"earliest": [76.8310551, -16.2676327, "12:00:01 AM", "12:00:01 AM", "00:00:00"]
 *  	},
 *  	"code": "200"
 * }
 *     
 * @apiErrorExample Error-Response:
 * {
 *   type: 'error',
 *   code: '004',
 *   message:'Send proper timing data'
 *  }
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
        return sendSuccess(req, res, { earliest: locationObject });
    } else {
        sendError(req, res, {}, "004");
    }
});

/**
 * @api {get} /api/v1/get-lat-longs  Get list of random LatLongs
 * @apiDescription  Returns radom 100 LatLongs
 * @apiVersion 1.0.0
 * @apiName GetLatLongs
 * @apiGroup API
 * 
 * @apiSuccessExample Success-Response:
 * {
 *   	"type": "success",
 *   	"data": {
 *   		"currentLatLongs": [
 *   			[76.8310551, -16.2676327],
 *   			[52.9271829, 39.3558386],
 *   			[37.6938488, 129.4181745],
 *   			[63.3477844, -81.6919944],
 *   			[48.1389459, -151.3762454],
 *   			[83.990709, 103.0304268],
 *   			[72.7636308, -20.5210687],
 *   			[15.6300935, 40.8436318],
 *   			[39.9412248, -164.8107895],
 *   			[22.0046754, 131.8937588],
 *              ...
 *              ...
 *   			[68.7704884, 5.9289852],
 *   			[8.1366491, -138.29682],
 *   			[19.8114186, 35.9438109],
 *   			[24.3200837, 34.4865788]
 *   		]
 *   	},
 *   	"code": "200"
 * }
 * 
 * @apiErrorExample Error-Response:
 * {
 *   type: 'error',
 *   code: '006',
 *   message:'Please provide count'
 *  }
 */

router.post('/get-lat-longs', function(req, res, next) {
    if (req.body.count != undefined) {
        return sendSuccess(req, res, { currentLatLongs: getLatLongs(req.body.count) });
    } else {
        sendError(req, res, {}, "006");
    }
});

module.exports = router;