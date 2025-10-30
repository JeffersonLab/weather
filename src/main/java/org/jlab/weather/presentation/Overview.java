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

    String remoteAddr = request.getRemoteAddr();

    // Check if the remote address is a localhost IP address
    boolean isLocalhost =
        remoteAddr.equals("127.0.0.1")
            || remoteAddr.equals("0:0:0:0:0:0:0:1"); // IPv4 and IPv6 localhost

    String apiKey = System.getenv("ACCUWEATHER_API_KEY");

    if (apiKey != null && !apiKey.isBlank()) {
      accuWeatherForecasts = true;
    }

    request.setAttribute("isLocalhost", isLocalhost);
    request.setAttribute("accuWeatherForecasts", accuWeatherForecasts);

    request.getRequestDispatcher("/WEB-INF/views/overview.jsp").forward(request, response);
  }
}
