import { httpError } from "../utils/httpError.js";

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(httpError(403, "You do not have permission for this action"));
    }
    next();
  };
}
