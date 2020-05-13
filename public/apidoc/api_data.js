define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/fetch-earliest",
    "title": "Fetch Earliest",
    "description": "<p>Fetch Earliest time from loaded Data from Sunrise an sunset from passed data.</p>",
    "name": "FetchEarliestTime",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Request",
            "description": "<p>Paylod for example, { &quot;timings&quot;: [ [76.8310551, -16.2676327, &quot;12:00:01 AM&quot;, &quot;12:00:01 AM&quot;, &quot;00:00:00&quot;], [77.4732284, 98.9666298, &quot;12:00:01 AM&quot;, &quot;12:00:01 AM&quot;, &quot;00:00:00&quot;], [32.0126322, -89.2594243, &quot;11:00:03 AM&quot;, &quot;12:46:43 AM&quot;, &quot;13:46:40&quot;], [4.1339426, -126.1776524, &quot;2:11:50 PM&quot;, &quot;2:30:16 AM&quot;, &quot;12:18:26&quot;], ... ... [24.3200837, 34.4865788, &quot;2:59:17 AM&quot;, &quot;4:17:30 PM&quot;, &quot;13:18:13&quot;] ] }</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \t\"type\": \"success\",\n \t\"data\": {\n \t\t\"earliest\": [76.8310551, -16.2676327, \"12:00:01 AM\", \"12:00:01 AM\", \"00:00:00\"]\n \t},\n \t\"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  type: 'error',\n  code: '004',\n  message:'Send proper timing data'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/v1/index.js",
    "groupTitle": "API"
  },
  {
    "type": "post",
    "url": "/api/v1/fetch-times",
    "title": "Fetch Times",
    "description": "<p>Fetch sunrise and sunset times from provided pair of latitude and longitude.</p>",
    "name": "FetchSunsetSunriseTime",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Request",
            "description": "<p>Paylod for example, { &quot;latLongs&quot;: [ [17.3968289, 60.0071548], [65.961221, 98.8531282], [11.4575184, 135.6674499], [72.1231112, 62.6833849], [31.0381201, 23.6415639], ... ... [64.9327807, 138.3228613] ] }</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\t\"type\": \"success\",\n\t\"data\": {\n\t\t\"timings\": [\n\t\t\t[17.3968289, 60.0071548, \"1:28:16 AM\", \"2:24:22 PM\", \"12:56:06\"],\n\t\t\t[65.961221, 98.8531282, \"7:50:45 PM\", \"2:51:06 PM\", \"19:00:21\"],\n\t\t\t[11.4575184, 135.6674499, \"8:34:22 PM\", \"9:12:58 AM\", \"12:38:36\"],\n\t\t\t[72.1231112, 62.6833849, \"12:00:01 AM\", \"12:00:01 AM\", \"00:00:00\"],\n\t\t\t[31.0381201, 23.6415639, \"3:30:34 AM\", \"5:12:59 PM\", \"13:42:25\"],\n\t\t\t...\n            ...\n            [64.9327807, 138.3228613, \"5:26:32 PM\", \"11:59:34 AM\", \"18:33:02\"]\n\t\t]\n\t},\n\t\"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  type: 'error',\n  code: '002',\n  message:'Send proper latitude and longitude data'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/v1/index.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/api/v1/get-lat-longs",
    "title": "Get list of random LatLongs",
    "description": "<p>Returns radom 100 LatLongs</p>",
    "version": "1.0.0",
    "name": "GetLatLongs",
    "group": "API",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \t\"type\": \"success\",\n  \t\"data\": {\n  \t\t\"currentLatLongs\": [\n  \t\t\t[76.8310551, -16.2676327],\n  \t\t\t[52.9271829, 39.3558386],\n  \t\t\t[37.6938488, 129.4181745],\n  \t\t\t[63.3477844, -81.6919944],\n  \t\t\t[48.1389459, -151.3762454],\n  \t\t\t[83.990709, 103.0304268],\n  \t\t\t[72.7636308, -20.5210687],\n  \t\t\t[15.6300935, 40.8436318],\n  \t\t\t[39.9412248, -164.8107895],\n  \t\t\t[22.0046754, 131.8937588],\n             ...\n             ...\n  \t\t\t[68.7704884, 5.9289852],\n  \t\t\t[8.1366491, -138.29682],\n  \t\t\t[19.8114186, 35.9438109],\n  \t\t\t[24.3200837, 34.4865788]\n  \t\t]\n  \t},\n  \t\"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  type: 'error',\n  code: '006',\n  message:'Please provide count'\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/index.js",
    "groupTitle": "API"
  }
] });
