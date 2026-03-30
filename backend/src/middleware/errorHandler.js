export function notFound(_req, _res, next) {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  res.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong",
    details: error.details || null,
  });
}
