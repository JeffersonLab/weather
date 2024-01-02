package org.jlab.weather.business;

import javax.ejb.Singleton;

@Singleton
public class WeatherData {
    // Accuweather
    private String hourlyAccuweatherForecastJSON = "{}";
    // Accuweather
    private String dailyForcastJSON = "{}";

    private String hourlyNWSForecastJSON = "{}";

    // NWS
    private String hourlyForcastXML = "";

    public String getHourlyNWSForecastJSON() {
        return hourlyNWSForecastJSON;
    }

    public void setHourlyNWSForecastJSON(String hourlyNWSForecastJSON) {
        this.hourlyNWSForecastJSON = hourlyNWSForecastJSON;
    }

    // NWS
    private String dailyForcastXML = "";

    // NWS
    private String alertJSON = "{}";

    // NWS
    private byte[] radarImage;

    public String getHourlyAccuweatherForecastJSON() {
        return hourlyAccuweatherForecastJSON;
    }

    public void setHourlyAccuweatherForecastJSON(String hourlyAccuweatherForecastJSON) {
        this.hourlyAccuweatherForecastJSON = hourlyAccuweatherForecastJSON;
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

    public String getHourlyForcastXML() {
        return hourlyForcastXML;
    }

    public void setHourlyForcastXML(String hourlyForcastXML) {
        this.hourlyForcastXML = hourlyForcastXML;
    }

    public String getDailyForcastXML() {
        return dailyForcastXML;
    }

    public void setDailyForcastXML(String dailyForcastXML) {
        this.dailyForcastXML = dailyForcastXML;
    }
}
