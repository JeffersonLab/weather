package org.jlab.weather.presentation;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author ryans
 */
@WebServlet(
    name = "Overview",
    urlPatterns = {"/overview"})
public class Overview extends HttpServlet {

  /**
   * Handles the HTTP <code>GET</code> method.
   *
   * @param request servlet request
   * @param response servlet response
   * @throws ServletException if a servlet-specific error occurs
   * @throws IOException if an I/O error occurs
   */
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    boolean accuWeatherForecasts = false;

    String apiKey = System.getenv("ACCUWEATHER_API_KEY");

    if (apiKey != null && !apiKey.isBlank()) {
      accuWeatherForecasts = true;
    }

    request.setAttribute("accuWeatherForecasts", accuWeatherForecasts);

    request.getRequestDispatcher("/WEB-INF/views/overview.jsp").forward(request, response);
  }
}
