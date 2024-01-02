package org.jlab.weather.business;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.*;
import javax.ejb.Timer;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.URI;
import java.net.http.HttpResponse;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import static java.time.temporal.ChronoUnit.SECONDS;

@Singleton
@Startup
public class HourlyFetch {
    private static final Logger LOGGER = Logger.getLogger(
            HourlyFetch.class.getName());

    @EJB
    WeatherData data;

    private Timer timer;
    @Resource
    private TimerService timerService;

    @PostConstruct
    private void init() {
        clearTimer();
        startTimer();

        fetchData();
    }

    private void clearTimer() {
        LOGGER.log(Level.FINEST, "Clearing Hourly Timer");
        for (Timer t : timerService.getTimers()) {
            LOGGER.log(Level.INFO, "Found timer: " + t);
            if("WeatherHourlyTimer".equals(t.getInfo())) {
                t.cancel();
            }
        }
        timer = null;
    }

    private void startTimer() {
        LOGGER.log(Level.INFO, "Starting Hourly Timer");
        ScheduleExpression schedExp = new ScheduleExpression();
        schedExp.second("0");
        schedExp.minute("0");
        schedExp.hour("*");

        TimerConfig config = new TimerConfig("WeatherHourlyTimer", false);  // redeploy --keepstate=true might be messing up persistent timers?
        timer = timerService.createCalendarTimer(schedExp, config);
    }

    @Timeout
    private void handleTimeout(Timer timer) {
        LOGGER.log(Level.INFO, "handleTimeout: Fetching weather data");

        fetchData();
    }

    private void fetchData() {
        fetchNWSHourlyForecast();
        fetchNWSDailyForecast();
        fetchNWSAlerts();
        fetchNWSRadar();
    }

    private void fetchAccuweatherHourlyForecast() {
        String ACCUWEATHER_API_KEY = System.getenv("ACCUWEATHER_API_KEY");

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/336210?apikey=" + ACCUWEATHER_API_KEY + "&details=true"))
                    .timeout(Duration.of(10, SECONDS))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            data.setHourlyForcastJSON(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void fetchAccuweatherDailyForecast() {
        String ACCUWEATHER_API_KEY = System.getenv("ACCUWEATHER_API_KEY");

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://dataservice.accuweather.com/forecasts/v1/daily/5day/336210?apikey=" + ACCUWEATHER_API_KEY + "&details=true"))
                    .timeout(Duration.of(10, SECONDS))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            data.setDailyForcastJSON(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void fetchNWSHourlyForecast() {

        // Newport News zip code 23606 maps to latitude="37.08" longitude="-76.51"
        // https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?whichClient=NDFDgen&lat=37.08&lon=-76.51&product=time-series&begin=2024-01-02T15%3A00%3A00&end=2024-01-04T00%3A00%3A00&Unit=e&temp=temp&qpf=qpf&snow=snow&wspd=wspd&wdir=wdir&sky=sky&wx=wx&icons=icons&rh=rh&conhazo=conhazo&ptotsvrtstm=ptotsvrtstm&wwa=wwa&wgust=wgust

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");

        Date start = new Date();
        Date end = new Date(); // TODO: Add 10 hours;

        Map<String, List<String>> paramMap = new HashMap<>();

        paramMap.put("whichClient", Arrays.asList("NDFDgen"));
        paramMap.put("lat", Arrays.asList("37.08"));
        paramMap.put("lon", Arrays.asList("-76.51"));
        paramMap.put("product", Arrays.asList("time-series"));
        paramMap.put("begin", Arrays.asList(formatter.format(start)));
        paramMap.put("end", Arrays.asList(formatter.format(end)));
        paramMap.put("Unit", Arrays.asList("e"));
        paramMap.put("temp", Arrays.asList("temp"));

        String queryString = buildQueryString(paramMap, "UTF8");

        String url = "https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php" + queryString;

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .timeout(Duration.of(10, SECONDS))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            data.setHourlyForcastXML(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void fetchNWSDailyForecast() {

        // Newport News zip code 23606 maps to latitude="37.08" longitude="-76.51"
        // See also textual summary here: https://api.weather.gov/zones/forecast/VAZ524/forecast
        // https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdBrowserClientByDay.php?whichClient=NDFDgenByDay&lat=37.08&lon=-76.51&format=24+hourly&startDate=2024-01-02&numDays=7&Unit=e

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Map<String, List<String>> paramMap = new HashMap<>();

        paramMap.put("whichClient", Arrays.asList("NDFDgenByDay"));
        paramMap.put("lat", Arrays.asList("37.08"));
        paramMap.put("lon", Arrays.asList("-76.51"));
        paramMap.put("format", Arrays.asList("24 hourly"));
        paramMap.put("startDate", Arrays.asList(formatter.format(new Date())));
        paramMap.put("numDays", Arrays.asList("5"));
        paramMap.put("Unit", Arrays.asList("e"));

        String queryString = buildQueryString(paramMap, "UTF8");

        String url = "https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdBrowserClientByDay.php" + queryString;

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .timeout(Duration.of(10, SECONDS))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            data.setDailyForcastXML(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void fetchNWSAlerts() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://api.weather.gov/alerts/active?zone=VAC700"))
                    .timeout(Duration.of(10, SECONDS))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            data.setAlertJSON(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private void fetchNWSRadar() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://radar.weather.gov/ridge/standard/KAKQ_loop.gif"))
                    .timeout(Duration.of(10, SECONDS))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<byte[]> response = client.send(request, HttpResponse.BodyHandlers.ofByteArray());

            data.setRadarImage(response.body());

        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static String buildQueryString(Map<String, List<String>> params, String encoding) {
        StringBuilder builder = new StringBuilder();

        for (String key : params.keySet()) {
            if (key == null || key.isEmpty()) {
                continue;
            }
            List<String> values = params.get(key);
            for (String value : values) {
                if (value == null) {
                    value = "";
                }
                builder.append("&");
                try {
                    builder.append(URLEncoder.encode(key, encoding));
                    builder.append("=");
                    builder.append(URLEncoder.encode(value, encoding));
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException("JVM doesn't support encoding: " + encoding, e);
                }
            }
        }

        if (builder.length() > 0) {
            builder.replace(0, 1, "?");
        }

        return builder.toString();
    }
}
