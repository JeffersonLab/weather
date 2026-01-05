<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html>
<head>
    <title>Weather</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/v${initParam.releaseNumber}/css/weather.css"/>
</head>
<body>
<ul class="ticker">
</ul>
<div id="page">
    <h1>Newport News, VA Weather</h1>
    <div class="responsive-container">
        <div class="card large">
            <h2 id="hourly-table-heading">Hourly Forecast</h2>
            <table id="hourly-table">
                <tbody>
                </tbody>
            </table>
            <div class="link-div" id="hourly-table-link"></div>
        </div>
        <div id="radar-card" class="card medium">
            <h2>Wakefield Radar</h2>
            <div id="radar-wrap">
                <img src="${pageContext.request.contextPath}/radar.gif" alt="Wakefield Radar"/>
            </div>
        </div>
        <div class="card large">
            <h2 id="daily-table-heading">5 Day Forecast</h2>
            <table id="daily-table">
                <tbody>
                </tbody>
            </table>
            <div class="link-div" id="daily-table-link">
            </div>
    </div>
        <div class="card">
            <h2>NWS Alerts</h2>
            <ul id="ticker-detail"><li>None</li></ul>
            <div class="link-div" id="alert-table-link"></div>
        </div>
    </div>
</div>
<script>
    let accuWeatherForecasts = ${accuWeatherForecasts};
</script>
<script src="${isLocalhost ? pageContext.request.contextPath.concat('/resources/js/jquery-3.6.1.min.js') : '//ace.jlab.org/cdn/jquery/3.6.1.min.js'}"></script>
<script src="${pageContext.request.contextPath}/resources/v${initParam.releaseNumber}/js/weather.js"></script>
<div>Version: <c:out value="${initParam.releaseNumber}"/>, <c:out value="${initParam.releaseDate}"/>, <a href="https://github.com/JeffersonLab/weather">Home</a></div>
</body>
</html>
