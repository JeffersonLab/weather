package org.jlab.weather.business;

import javax.ejb.Singleton;

@Singleton
public class WeatherData {
    // Accuweather
    private String hourlyForcastJSON = "{}";
    // Accuweather
    private String dailyForcastJSON = "{}";

    // NWS
    private String hourlyForcastXML = "";

    // NWS
    private String dailyForcastXML = "";

    // NWS
    private String alertJSON = "{}";

    // NWS
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
