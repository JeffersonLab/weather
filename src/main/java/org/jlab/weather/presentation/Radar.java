package org.jlab.weather.presentation;

import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jlab.weather.business.WeatherData;

/**
 * @author ryans
 */
@WebServlet(
    name = "Radar",
    urlPatterns = {"/radar.gif"})
public class Radar extends HttpServlet {

  private static final Logger logger = Logger.getLogger(Radar.class.getName());

  @EJB WeatherData data;

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    response.setContentType("image/gif");

    OutputStream out = response.getOutputStream();

    out.write(data.getRadarImage());

    out.flush();
  }
}
