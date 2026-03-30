import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";
import { httpError } from "../utils/httpError.js";

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const [, bearerToken] = header.split(" ");
    const token = bearerToken || req.query.access_token;
    if (!token) return next(httpError(401, "Authentication required"));

    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).select("+passwordHash");
    if (!user) return next(httpError(401, "User not found"));

    req.user = {
      id: user._id.toString(),
      role: user.role,
      organizationId: user.organizationId.toString(),
      email: user.email,
      name: user.name,
    };
    next();
  } catch (error) {
    next(httpError(401, "Invalid or expired token", error.message));
  }
}
