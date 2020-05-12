function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1
}

function startLoading() {
    $(".loading").show();
}

function stopLoading() {
    $(".loading").hide();
}

function getLatLongs(count) {
    let latLongs = [];
    for (let i = 0; i < count; i++) {
        latLongs.push([
            getRandomInRange(0, 90, 7),
            getRandomInRange(-180, 180, 7)
        ]);
    }
    return latLongs;
}

function createTable(object) {
    if (object != undefined) {
        let tableWidth = "";
        if (object.heading != undefined) {
            tableWidth = (object.heading.length * 20);
        }
        let html = '<table class="table table-sm" style="width:' + tableWidth + '%">';
        if (object.heading != undefined) {
            html += '<thead><tr>';
            for (inx in object.heading) {
                html += '<th width="' + object.heading[inx]["width"] + '">' + object.heading[inx]["title"] + '</th>';
            }
            html += '</thead></tr>';
        }
        if (object.data != undefined) {
            html += '<tbody>';
            for (inx in object.data) {
                html += '<tr><td>';
                html += object.data[inx].join('</td><td>');
                html += '</td></tr>';
            }
            html += '</tbody>';
        }
        html += '</table>';
        return html;
    }
    return '<table class="table table-sm" style="width:100%"><thead><tr><th>Invalid data</th></tr></thead></table>';
}

function ajaxRequest(url, data) {
    return new Promise(async function(resolve, reject) {
        startLoading();
        $.ajax({
            url: url,
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(data),
            type: "post",
            success: function(res) {
                stopLoading();
                if (res.type == "success") {
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            error: function(xhr, status, error) {
                stopLoading();
                reject(xhr);
            }
        });
    });
}