#!/bin/sh

export http_proxy="http://jprox.jlab.org:8080"

curl --silent --show-error -m 60 "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/336210?apikey=${ACCUWEATHER_API_KEY}&details=true" -o /var/www/html/weather-data/hourly-weather.json

curl --silent --show-error -m 60 "http://dataservice.accuweather.com/forecasts/v1/daily/5day/336210?apikey=${ACCUWEATHER_API_KEY}&details=true" -o /var/www/html/weather-data/daily-weather.json

export https_proxy=http://jprox.jlab.org:8081

curl --silent --show-error -m 60 "https://api.weather.gov/alerts/active?zone=VAC700" -H "accept: application/geo+json" -o /var/www/html/weather-data/alerts.json

curl --silent --show-error -m 60 "https://radar.weather.gov/lite/N0R/AKQ_loop.gif" -o /var/www/html/weather-data/radar.gif

# NWS two week forecast: https://api.weather.gov/zones/forecast/VAZ524/forecast
# See Also: https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdBrowserByDay.htm
