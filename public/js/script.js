$(document).ready(function() {
    let currentLatLongs = [];
    let currentTimings = [];

    //get random lat long button click event
    $("#get-lat-lng").click(function() {
        //call function for get random lat long from count
        currentLatLongs = getLatLongs(100);
        let object = {
            heading: [
                { title: "Latitude", width: "20%" },
                { title: "Longitude", width: "20%" }
            ],
            data: currentLatLongs
        }
        //create table html from lat long object
        let tableHtml = createTable(object);

        //display table and show next button for fetch timing for lat long
        $("#data-div").show();
        $("#data-div div").html(tableHtml);
        $("#get-lat-lng").attr("disabled", "disabled");
        $("#fetch-times").removeAttr("disabled");
    });

    //fetch timings from lat long button click event
    $("#fetch-times").click(async function() {
        let url = "/fetch-times"
        let data = { latLongs: currentLatLongs };
        try {
            //ajax request to server for get timings from lat long object
            let res = await ajaxRequest(url, data);
            currentTimings = res.data.timings;
            let object = {
                heading: [
                    { title: "Latitude", width: "20%" },
                    { title: "Longitude", width: "20%" },
                    { title: "Sunrise Time", width: "20%" },
                    { title: "Sunset Time", width: "20%" },
                    { title: "Day Length", width: "20%" }
                ],
                data: currentTimings
            }

            //create table for lat long with timings and day length
            let tableHtml = createTable(object);

            //display table and show next button for get earliest sunrise and its day length
            $("#data-div").show();
            $("#data-div div").html(tableHtml);
            $("#fetch-times").attr("disabled", "disabled");
            $("#find-earliest").removeAttr("disabled");
        } catch (error) {
            console.log(error);
        }
    });

    //get earliest sunrise and day length button click event
    $("#find-earliest").click(async function() {
        let url = "/fetch-earliest"
        let data = { timings: currentTimings };
        try {

            //ajax request to server for get earliest sunrise and day length from timing data
            let res = await ajaxRequest(url, data);

            let object = {
                heading: [
                    { title: "Latitude", width: "20%" },
                    { title: "Longitude", width: "20%" },
                    { title: "Sunrise Time", width: "20%" },
                    { title: "Sunset Time", width: "20%" },
                    { title: "Day Length", width: "20%" }
                ],
                data: [res.data.earliest]
            }

            //create table from response for earliest timing
            let tableHtml = createTable(object);

            //display table for earliest sunrise and its day length
            $("#earliest").show();
            $("#earliest div").html(tableHtml);
            $("#find-earliest").attr("disabled", "disabled");
        } catch (error) {
            console.log(error);
        }
    });

    //reset button for rest whole view for restart demo
    $("#reset").click(function() {
        //reset objects for restart demo
        currentLatLongs = [];
        currentTimings = [];

        //reset html structure for restart demo
        $("#earliest").hide();
        $("#data-div").hide();
        $("#earliest div").html("");
        $("#data-div div").html("");
        $("#get-lat-lng").removeAttr("disabled");
        $("#fetch-times").attr("disabled", "disabled");
        $("#find-earliest").attr("disabled", "disabled");
    });
})