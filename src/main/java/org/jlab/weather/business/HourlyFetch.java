package org.jlab.weather.business;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
@Startup
public class HourlyFetch {
    private static final Logger LOGGER = Logger.getLogger(
            HourlyFetch.class.getName());

    private Timer timer;
    @Resource
    private TimerService timerService;

    @PostConstruct
    private void init() {
        clearTimer();
        startTimer();
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
    }
}
