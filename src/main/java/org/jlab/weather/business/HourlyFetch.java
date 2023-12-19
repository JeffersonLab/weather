package org.jlab.weather.business;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.*;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.URI;
import java.net.http.HttpResponse;
import java.time.Duration;
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
        fetchHourlyForecast();
        fetchDailyForecast();
        fetchAlerts();
        fetchRadar();
    }

    private void fetchHourlyForecast() {
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

    private void fetchDailyForecast() {
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

    private void fetchAlerts() {
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

    private void fetchRadar() {
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
}
