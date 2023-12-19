var jlab = jlab || {};
jlab.triCharMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
jlab.monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
jlab.triCharWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
jlab.weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
jlab.loadHourlyWeather = function() {
    var request = jQuery.ajax({
        url: "/weather/hourly-forecast.json",
        type: "GET",
        dataType: "json"
    });

    request.done(function(data) {
        var $tbody = $("#hourly-table tbody"),
        hourlyData = data,
        numHours = 8;
        var row = '<tr><th></th>';
        for(var i = 0; i < numHours; i++) {
                var d = new Date(hourlyData[i].EpochDateTime * 1000),
                    qualifier = (d.getHours() < 12) ? 'am' : 'pm',
                    hour = d.getHours() % 12,
                    hour = hour ? hour : 12;
                row = row + '<td>' + hour + qualifier + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td><img alt="' + hourlyData[i].IconPhrase + '" src="resources/img/weather-icons/' + hourlyData[i].WeatherIcon + '.png"/></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>'
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].IconPhrase + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Temp (°F)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Temperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Feels Like</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].RealFeelTemperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Precipitation</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].PrecipitationProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Wind (mph)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + Math.round(hourlyData[i].Wind.Speed.Value) + ' ' + hourlyData[i].Wind.Direction.English + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Wind Gusts (mph)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + Math.round(hourlyData[i].WindGust.Speed.Value) + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>UV Index</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].UVIndex + ' ' + hourlyData[i].UVIndexText +  '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row divider-row"><th></th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Dew Point (°F)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].DewPoint.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Relative Humidity</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].RelativeHumidity + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Wet Bulb Temp (°F)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].WetBulbTemperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Visibility (mi)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Visibility.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Cloud Cover</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].CloudCover + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Cloud Ceiling (ft)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Ceiling.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Rain (in)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Rain.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Snow (in)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Snow.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Ice (in)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Ice.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Total Liquid (in)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].TotalLiquid.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Rain Probability</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].RainProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Snow Probability</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].SnowProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Ice Probability</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].IceProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);


        /*for(var i = 0; i < numHours; i++) {
            var d = new Date(hourlyData[i].EpochDateTime * 1000),
                qualifier = (d.getHours() < 12) ? 'am' : 'pm',
                hour = d.getHours() % 12,
                hour = hour ? hour : 12;
            var row = '<tr><td>' + hour + qualifier +
                '</td><td>' + hourlyData[i].Temperature.Value +
                ' °F</td><td>' + hourlyData[i].RealFeelTemperature.Value +
                ' °F</td><td><img alt="' + hourlyData[i].IconPhrase + '" src="resources/img/weather-icons/' + hourlyData[i].WeatherIcon +
                '.png"/></td><td>' + hourlyData[i].IconPhrase +
                '</td><td>' + hourlyData[i].PrecipitationProbability +
                '%</td><td>' + hourlyData[i].Wind.Speed.Value + ' mph ' + hourlyData[i].Wind.Direction.English + '</td></tr>';
            $tbody.append(row);
        }*/

        var d = new Date(hourlyData[0].EpochDateTime * 1000);
        var $heading = $("#hourly-table-heading");
        $heading.text("8 Hour Forecast " + jlab.weekNames[d.getDay()] + " " + jlab.monthNames[d.getMonth()] + " " + d.getDate());


        if (window.location.search.indexOf('merz=awesome') > -1) {
            $("#detail-toggle").click();
        }
    });

    request.error(function(xhr, textStatus) {
        window.console && console.log('Unable to query weather server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

jlab.loadDailyWeather = function() {
    var request = jQuery.ajax({
        url: "/weather/daily-forecast.json",
        type: "GET",
        dataType: "json"
    });

    request.done(function(data) {
        var $tbody = $("#daily-table tbody"),
            dailyData = data.DailyForecasts,
            numDays = 5;
        var row = '<tr><th></th>';
        for(var i = 0; i < numDays; i++) {
            var d = new Date(dailyData[i].EpochDate * 1000),
                day = d.getDate(),
                weekDay = d.getDay(),
            row = row + '<td>' + jlab.triCharWeekNames[weekDay] + ' ' + day + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>';
        for(var i = 0; i < numDays; i++) {
            row = row + '<td><img alt="' + dailyData[i].Day.IconPhrase + '" src="resources/img/weather-icons/' + dailyData[i].Day.Icon + '.png"/></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>'
        for(var i = 0; i < numDays; i++) {
            row = row + '<td>' + dailyData[i].Day.ShortPhrase + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Temp (°F)</th>';
        for(var i = 0; i < numDays; i++) {
            row = row + '<td>' + dailyData[i].Temperature.Maximum.Value + '° / <span class="min-temp">' +  dailyData[i].Temperature.Minimum.Value + '°</span></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Precipitation</th>';
        for(var i = 0; i < numDays; i++) {
            row = row + '<td>' + dailyData[i].Day.PrecipitationProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Sun Rise/Set</th>';
        for(var i = 0; i < numDays; i++) {
            var rise = new Date(dailyData[i].Sun.EpochRise * 1000),
                riseQualifier = (rise.getHours() < 12) ? 'am' : 'pm',
                riseHour = rise.getHours() % 12,
                riseHour = riseHour ? riseHour : 12,
                riseMinutes = (rise.getMinutes() < 10 ? '0' : '') + rise.getMinutes(),
            set = new Date(dailyData[i].Sun.EpochSet * 1000),
                setQualifier = (set.getHours() < 12) ? 'am' : 'pm',
                setHour = set.getHours() % 12,
                setHour = setHour ? setHour : 12,
                setMinutes = (set.getMinutes() < 10 ? '0' : '') + set.getMinutes();
            row = row + '<td>' + riseHour + ':' + riseMinutes + riseQualifier + ' / ' + setHour + ':' + setMinutes + setQualifier + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        var d = new Date(dailyData[0].EpochDate * 1000);
        var $heading = $("#daily-table-heading");
        $heading.text("5 Day Forecast " + jlab.weekNames[d.getDay()] + " " + jlab.monthNames[d.getMonth()] + " " + d.getDate());
    });

    request.error(function(xhr, textStatus) {
        window.console && console.log('Unable to query weather server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

jlab.loadAlerts = function() {
    var request = jQuery.ajax({
        url: "/weather/alerts.json",
        type: "GET",
        dataType: "json"
    });

    request.done(function(data) {
        var $ticker = $(".ticker"),
            $tickerDetail = $("#ticker-detail");
        /*console.log(data);*/
        var alertText = '';
        for(var i = 0; i < data.features.length; i++) {
            alertText = alertText + 'NWS Alert: ' + data.features[i].properties.parameters.NWSheadline + '... ';
        }
        var alert = '<div class="alert"">' + alertText + '</div>';

        $ticker.append(alert);

        if(data.features.length > 0) {
            $tickerDetail.empty();
        }

        for(var i = 0; i < data.features.length; i++) {
            var detail = '<li class="alert-details"><b>' + data.features[i].properties.messageType +':</b> ' + data.features[i].properties.headline + '<br/><b>Instructions:</b> ' + (data.features[i].properties.instruction || 'None') + '<br/><b>Description:</b> ' + data.features[i].properties.description + '</li>';
            $tickerDetail.append(detail);
        }
    });

    request.error(function(xhr, textStatus) {
        window.console && console.log('Unable to query alerts server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

$(document).on("click", "#detail-toggle", function() {
    if($(this).text() === 'Show Details') {
        $(".detail-row").show();
        $("#detail-toggle").text("Hide Details");
    } else {
        $(".detail-row").hide();
        $("#detail-toggle").text("Show Details");
    }
    return false;
});

$(function() {
    jlab.loadHourlyWeather();
    jlab.loadDailyWeather();
    jlab.loadAlerts();
});



