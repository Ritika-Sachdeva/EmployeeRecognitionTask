import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // Read token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token found." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
