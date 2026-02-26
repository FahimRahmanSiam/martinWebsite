import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

async function ensureDefaultAdmin() {
  const username = process.env.ADMIN_USER || "vmartin";
  const pass = process.env.ADMIN_PASS || "martin@1234";

  const existing = await Admin.findOne({ username });
  if (existing) return existing;

  const passwordHash = await bcrypt.hash(pass, 10);
  return Admin.create({ username, passwordHash });
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Make sure admin exists in DB (first run)
    await ensureDefaultAdmin();

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials." });

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: admin._id.toString(), username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token, username: admin.username });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
