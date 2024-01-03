package org.jlab.weather.business;

import javax.ejb.Singleton;

@Singleton
public class WeatherData {
    private String hourlyAccuweatherForecast = "{}";
    private String dailyAccuweatherForecast = "{}";
    private String hourlyNWSForecast = "{}";
    private String hourlyNWSForecastXML = "";
    private String dailyNWSForecast = "";
    private String alertJSON = "{}";
    private byte[] radarImage;

    public String getHourlyNWSForecast() {
        return hourlyNWSForecast;
    }

    public void setHourlyNWSForecast(String hourlyNWSForecast) {
        this.hourlyNWSForecast = hourlyNWSForecast;
    }

    public String getHourlyAccuweatherForecast() {
        return hourlyAccuweatherForecast;
    }

    public void setHourlyAccuweatherForecast(String hourlyAccuweatherForecast) {
        this.hourlyAccuweatherForecast = hourlyAccuweatherForecast;
    }

    public String getDailyAccuweatherForecast() {
        return dailyAccuweatherForecast;
    }

    public void setDailyAccuweatherForecast(String dailyAccuweatherForecast) {
        this.dailyAccuweatherForecast = dailyAccuweatherForecast;
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

    public String getHourlyNWSForecastXML() {
        return hourlyNWSForecastXML;
    }

    public void setHourlyNWSForecastXML(String hourlyNWSForecastXML) {
        this.hourlyNWSForecastXML = hourlyNWSForecastXML;
    }

    public String getDailyNWSForecast() {
        return dailyNWSForecast;
    }

    public void setDailyNWSForecast(String dailyNWSForecast) {
        this.dailyNWSForecast = dailyNWSForecast;
    }
}
