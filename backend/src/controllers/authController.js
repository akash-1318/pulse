import bcrypt from "bcryptjs";
import { Organization } from "../models/Organization.js";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { httpError } from "../utils/httpError.js";

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId.toString(),
  };
}

export async function registerOrganizationAdmin(req, res, next) {
  try {
    const { organizationName, name, email, password } = req.body;
    if (!organizationName || !name || !email || !password)
      return next(
        httpError(
          400,
          "organizationName, name, email and password are required",
        ),
      );

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return next(httpError(409, "Email already registered"));

    let organization = await Organization.findOne({
      name: organizationName.trim(),
    });
    if (!organization)
      organization = await Organization.create({
        name: organizationName.trim(),
      });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      organizationId: organization._id,
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "admin",
    });

    res.status(201).json({
      token: signToken(user),
      user: sanitizeUser(user),
      organization: {
        id: organization._id.toString(),
        name: organization.name,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(httpError(400, "email and password are required"));

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+passwordHash",
    );
    if (!user) return next(httpError(401, "Invalid credentials"));

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return next(httpError(401, "Invalid credentials"));

    res.json({ token: signToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(httpError(404, "User not found"));
    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}
