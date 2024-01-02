<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <title>Weather</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/weather.css"/>
</head>
<body>
<ul class="ticker">
</ul>
<div id="page">
    <h1>Newport News, VA Weather</h1>
    <div class="responsive-container">
        <div class="card large">
            <h2 id="hourly-table-heading">8 Hour Forecast</h2>
            <table id="hourly-table">
                <tbody>
                </tbody>
            </table>
            <div class="link-div"><a id="detail-toggle" href="#">Show Details</a> | <a id="provided-by-link"
                                                                                    href="https://www.accuweather.com/en/us/newport-news-va/23606/hourly-weather-forecast/336210">Provided
                by AccuWeather</a></div>
            <div id="detail-wrap">
            </div>
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
            <div class="link-div">
            <a href="https://www.weather.gov/akq/">Provided
                by NWS</a>
            </div>
    </div>
        <div class="card">
            <h2>NWS Alerts</h2>
            <ul id="ticker-detail"><li>None</li></ul>
        </div>
    </div>
</div>
<script type="text/javascript" src="//ace.jlab.org/cdn/jquery/3.6.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/weather.js"></script>
<div>Version: <c:out value="${initParam.releaseNumber}"/>, <c:out value="${initParam.releaseDate}"/></div>
</body>
</html>
