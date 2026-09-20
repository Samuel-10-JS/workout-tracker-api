const errorNames = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error"
};

/**
 * Función auxiliar para estandarizar respuestas de error según RFC 7807
 */
const sendError = (res, req, status, message) => {
  return res.status(status).json({
    status,
    error: errorNames[status] || "Error",
    message,
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};

module.exports = { sendError };
