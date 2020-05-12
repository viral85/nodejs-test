module.exports = {
    /**
     * Site title for display title in head section of html
     */
    site_title: "Day Length Demo", 
    /**
     * Varible for number of parallel request for get sunrise sunset data
     */
    parallelReq: 5, 

    /**
     * Code and messages mapping for api response
     */
    messages: { 
        "001": "Get sunrise/sunset timings successfully",
        "002": "Send proper latitude and longitude data",
        "003": "Get earliest sunrise timings successfully",
        "004": "Send proper timing data",
        "005": "Get lat long array",
        "006": "Please provide count",
    }
}