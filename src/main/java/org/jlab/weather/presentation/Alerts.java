package org.jlab.weather.presentation;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;
import org.jlab.weather.business.WeatherData;

/**
 * @author ryans
 */
@WebServlet(
    name = "Alerts",
    urlPatterns = {"/alerts.json"})
public class Alerts extends HttpServlet {

  private static final Logger logger = Logger.getLogger(Alerts.class.getName());

  @EJB WeatherData data;

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    response.setContentType("application/json");

    OutputStream out = response.getOutputStream();

    out.write(data.getAlertJSON().getBytes(StandardCharsets.UTF_8));

    out.flush();
  }
}
