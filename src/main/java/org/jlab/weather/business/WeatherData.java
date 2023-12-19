package org.jlab.weather.business;

import javax.ejb.Singleton;

@Singleton
public class WeatherData {
    private String hourlyForcastJSON = "{}";
    private String dailyForcastJSON = "{}";

    private String alertJSON = "{}";

    private byte[] radarImage;

    public String getHourlyForcastJSON() {
        return hourlyForcastJSON;
    }

    public void setHourlyForcastJSON(String hourlyForcastJSON) {
        this.hourlyForcastJSON = hourlyForcastJSON;
    }

    public String getDailyForcastJSON() {
        return dailyForcastJSON;
    }

    public void setDailyForcastJSON(String dailyForcastJSON) {
        this.dailyForcastJSON = dailyForcastJSON;
    }

    public String getAlertJSON() {
        return alertJSON;
    }

    public void setAlertJSON(String alertJSON) {
        this.alertJSON = alertJSON;
    }

    public byte[] getRadarImage() {
        return radarImage;
    }

    public void setRadarImage(byte[] radarImage) {
        this.radarImage = radarImage;
    }
}
