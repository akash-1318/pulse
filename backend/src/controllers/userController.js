import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { httpError } from "../utils/httpError.js";

export async function createUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return next(
        httpError(400, "name, email, password and role are required"),
      );
    if (!["viewer", "editor", "admin"].includes(role))
      return next(httpError(400, "Invalid role"));

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return next(httpError(409, "Email already registered"));

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      organizationId: req.user.organizationId,
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
    });

    res.status(201).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    const users = await User.find({ organizationId: req.user.organizationId })
      .select("name email role organizationId createdAt")
      .sort({ createdAt: -1 });

    res.json({
      users: users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId.toString(),
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}
