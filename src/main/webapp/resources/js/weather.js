var jlab = jlab || {};
jlab.triCharMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
jlab.monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
jlab.triCharWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
jlab.weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
jlab.loadAccuweatherHourlyWeather = function() {
    var request = jQuery.ajax({
        url: "/weather/hourly-accuweather-forecast.json",
        type: "GET",
        dataType: "json"
    });

    request.done(function(data) {
        var $tbody = $("#hourly-table tbody"),
        hourlyData = data,
        numHours = 8;

        if(Array.isArray(hourlyData) && hourlyData.length > 0 && hourlyData[0].hasOwnProperty("EpochDateTime")) {
            // good to go.
        } else {
            console.log("Accuweather hourly response is not an array with positive length with first object containing EpochDataTime");
            return;
        }

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
            row = row + '<td title="' + hourlyData[i].IconPhrase + '">' + hourlyData[i].IconPhrase + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Temp (°F)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Temperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Feels Like (°F)</th>';
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

        var d = new Date(hourlyData[0].EpochDateTime * 1000);
        var $heading = $("#hourly-table-heading");
        $heading.text("8 Hour Forecast " + jlab.weekNames[d.getDay()] + " " + jlab.monthNames[d.getMonth()] + " " + d.getDate());

        var $linkDiv = $("#hourly-table-link");
        $linkDiv.html('<a id="detail-toggle" href="#">Show Details</a> | <a id="provided-by-link" href="https://www.accuweather.com/en/us/newport-news-va/23606/hourly-weather-forecast/336210">Provided by AccuWeather</a>');

        if (window.location.search.indexOf('merz=awesome') > -1) {
            $("#detail-toggle").click();
        }
    });

    request.fail(function(xhr, textStatus) {
        window.console && console.log('Unable to query weather server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

jlab.loadAccuweatherDailyWeather = function() {
    var request = jQuery.ajax({
        url: "/weather/daily-forecast.json",
        type: "GET",
        dataType: "json"
    });

    request.done(function(data) {
        if(Array.isArray(data.dailyForecasts) && data.DailyForecasts.length > 0 && data.DailyForecasts[0].hasOwnProperty("EpochDate")) {
            // good to go.
        } else {
            console.log("Accuweather daily response does not include a DailyForecasts array with positive length with first object containing EpochData");
            return;
        }

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
            row = row + '<td>' + dailyData[i].Temperature.Minimum.Value + '° - ' +  dailyData[i].Temperature.Maximum.Value + '°</td>';
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

        var $linkDiv = $("#daily-table-link");
        $linkDiv.html('<a href="https://www.accuweather.com/en/us/newport-news-va/23606/daily-weather-forecast/336210">Provided by AccuWeather</a>');
    });

    request.fail(function(xhr, textStatus) {
        window.console && console.log('Unable to query weather server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

jlab.loadNWSHourlyWeather = function() {
    var request = jQuery.ajax({
        url: "/weather/hourly-nws-forecast.json",
        type: "GET",
        dataType: "json"
    });

    request.done(function(data) {
        var $tbody = $("#hourly-table tbody"),
            hourlyData = data,
            numHours = 8;
        var row = '<tr><th></th>';
        for (var i = 0; i < numHours; i++) {
            var d = new Date(hourlyData[i].EpochDateTime * 1000),
                qualifier = (d.getHours() < 12) ? 'am' : 'pm',
                hour = d.getHours() % 12,
                hour = hour ? hour : 12;
            row = row + '<td>' + hour + qualifier + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td><img alt="' + hourlyData[i].IconPhrase + '" src="resources/img/weather-icons/' + hourlyData[i].WeatherIcon + '.png"/></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>'
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].IconPhrase + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Temp (°F)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Temperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Feels Like</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].RealFeelTemperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Precipitation</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].PrecipitationProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Wind (mph)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + Math.round(hourlyData[i].Wind.Speed.Value) + ' ' + hourlyData[i].Wind.Direction.English + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Wind Gusts (mph)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + Math.round(hourlyData[i].WindGust.Speed.Value) + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>UV Index</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].UVIndex + ' ' + hourlyData[i].UVIndexText + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row divider-row"><th></th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Dew Point (°F)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].DewPoint.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Relative Humidity</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].RelativeHumidity + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Wet Bulb Temp (°F)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].WetBulbTemperature.Value + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Visibility (mi)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Visibility.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Cloud Cover</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].CloudCover + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Cloud Ceiling (ft)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Ceiling.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Rain (in)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Rain.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Snow (in)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Snow.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Ice (in)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].Ice.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Total Liquid (in)</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].TotalLiquid.Value + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Rain Probability</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].RainProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Snow Probability</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].SnowProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Ice Probability</th>';
        for (var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].IceProbability + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        var d = new Date(hourlyData[0].EpochDateTime * 1000);
        var $heading = $("#hourly-table-heading");
        $heading.text("8 Hour Forecast " + jlab.weekNames[d.getDay()] + " " + jlab.monthNames[d.getMonth()] + " " + d.getDate());

        var $linkDiv = $("#hourly-table-link");
        $linkDiv.html('<a href="https://www.weather.gov/akq/">Provided by NWS</a>');

        if (window.location.search.indexOf('merz=awesome') > -1) {
            $("#detail-toggle").click();
        }
    });

    request.fail(function (xhr, textStatus) {
        window.console && console.log('Unable to query weather server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

jlab.loadNWSHourlyWeatherXml = function() {
    var request = jQuery.ajax({
        url: "/weather/hourly-nws-forecast.xml",
        type: "GET",
        dataType: "xml"
    });

    request.done(function(data) {
        console.log(data);

        let timeArray = new Array(),
            iconArray = new Array(),
            phraseArray = new Array(),
            tempArray = new Array(),
            precipArray = new Array();

        let $xmlData = $(data).find("data"),
            $parameters = $xmlData.find("parameters");

        $xmlData.find("time-layout").find("start-valid-time").each(function() {
            timeArray.push($(this).text());
        });

        $parameters.find("conditions-icon icon-link").each(function() {
            iconArray.push($(this).text());
        });

        $parameters.find("weather weather-conditions").each(function() {
            phraseArray.push($(this).attr("weather-summary"));
        });

        $parameters.find("temperature value").each(function() {
            tempArray.push($(this).text());
        });

        var $tbody = $("#hourly-table tbody"),
            numHours = 5;
        var row = '<tr><th></th>';
        for(var i = 0; i < numHours; i++) {
            var d = new Date(timeArray[i]),
                qualifier = (d.getHours() < 12) ? 'am' : 'pm',
                hour = d.getHours() % 12,
                hour = hour ? hour : 12;
            row = row + '<td>' + hour + qualifier + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td><img alt="' + iconArray[i] + '" src="' + iconArray[i] + '"/></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>'
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + phraseArray[i] + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Temp (°F)</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + tempArray[i] + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="detail-row"><th>Cloud Cover</th>';
        for(var i = 0; i < numHours; i++) {
            row = row + '<td>' + hourlyData[i].CloudCover + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        var d = new Date(timeArray[0]);
        var $heading = $("#hourly-table-heading");
        $heading.text("8 Hour Forecast " + jlab.weekNames[d.getDay()] + " " + jlab.monthNames[d.getMonth()] + " " + d.getDate());


        if (window.location.search.indexOf('merz=awesome') > -1) {
            $("#detail-toggle").click();
        }
    });

    request.fail(function(xhr, textStatus) {
        window.console && console.log('Unable to query weather server: Text Status: ' + textStatus + ', Ready State: ' + xhr.readyState + ', HTTP Status Code: ' + xhr.status);
    });

    request.always(function() {
    });
};

jlab.loadNWSDailyWeather = function() {
    var request = jQuery.ajax({
        url: "/weather/daily-forecast.xml",
        type: "GET",
        dataType: "xml"
    });

    request.done(function(data) {
        let timeArray = new Array(),
            iconArray = new Array(),
            phraseArray = new Array(),
            maxTempArray = new Array(),
            minTempArray = new Array(),
            precipArray = new Array();

        let $xmlData = $(data).find("data"),
            $parameters = $xmlData.find("parameters");

        // There are two summarization=24hourly.  Take first one
        $xmlData.find("time-layout[summarization=24hourly]").first().find("start-valid-time").each(function() {
            timeArray.push($(this).text());
        });

        $parameters.find("conditions-icon icon-link").each(function() {
            iconArray.push($(this).text());
        });

        $parameters.find("weather weather-conditions").each(function() {
            phraseArray.push($(this).attr("weather-summary"));
        });

        $parameters.find("temperature[type=maximum] value").each(function() {
            maxTempArray.push($(this).text());
        });

        $parameters.find("temperature[type=minimum] value").each(function() {
            minTempArray.push($(this).text());
        });

        // precipitation probability is every 12 hours.  So we take odd indexes only and ignore overnight 18:00-6:00...
        $parameters.find("probability-of-precipitation value").odd().each(function() {
            precipArray.push($(this).text());
        });

        var $tbody = $("#daily-table tbody"),
            dailyData = data.DailyForecasts,
            numDays = 5;
        var row = '<tr><th></th>';
        for(var i = 0; i < numDays; i++) {
            var d = new Date(timeArray[i]),
                day = d.getDate(),
                weekDay = d.getDay(),
                row = row + '<td>' + jlab.triCharWeekNames[weekDay] + ' ' + day + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>';
        for(var i = 0; i < numDays; i++) {
            row = row + '<td><img alt="' + iconArray[i] + '" src="' + iconArray[i] + '"/></td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr><th></th>'
        for(var i = 0; i < numDays; i++) {
            row = row + '<td>' + phraseArray[i] + '</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Temp (°F)</th>';
        for(var i = 0; i < numDays; i++) {
            row = row + '<td>' + minTempArray[i] + '° - ' +  maxTempArray[i] + '°</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        row = '<tr class="info-row"><th>Precipitation</th>';
        for(var i = 0; i < numDays; i++) {
            row = row + '<td>' + precipArray[i] + '%</td>';
        }
        row = row + '</tr>';
        $tbody.append(row);

        var d = new Date(timeArray[0]);
        var $heading = $("#daily-table-heading");
        $heading.text("5 Day Forecast " + jlab.weekNames[d.getDay()] + " " + jlab.monthNames[d.getMonth()] + " " + d.getDate());

        var $linkDiv = $("#daily-table-link");
        $linkDiv.html('<a href="https://www.weather.gov/akq/">Provided by NWS</a>');
    });

    request.fail(function(xhr, textStatus) {
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

    request.fail(function(xhr, textStatus) {
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
    if (accuWeatherForecasts) {
        jlab.loadAccuweatherHourlyWeather();
        jlab.loadAccuweatherDailyWeather();
    } else { // use NWS Forecasts
        jlab.loadNWSHourlyWeather();
        jlab.loadNWSDailyWeather();
    }

    jlab.loadAlerts();
});



