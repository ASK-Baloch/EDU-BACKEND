import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" })
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

export const authorizeSuperAdmin = (req, res, next) => {
  if (req.user?.role !== "superadmin")
    return res.status(403).json({ message: "Forbidden: SuperAdmin only" });

  next();
};
