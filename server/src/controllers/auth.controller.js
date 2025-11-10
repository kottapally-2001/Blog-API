import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";

export async function register(req, res) {
  try {
    const { email, username, password, role } = req.body;
    if (!email || !username || !password)
      return res.status(400).json({ message: "email, username, password required" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, username, password: hashed, role: role === "ADMIN" ? "ADMIN" : "USER" }
    });
    return res.status(201).json({ id: user.id, email: user.email, username: user.username, role: user.role });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, user: { id: user.id, email: user.email, username: user.username, role: user.role } });
}
