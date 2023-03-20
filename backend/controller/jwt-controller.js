import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ msg: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: "Forbidden" }); // invalid token
        req.user = user;
        next();
    });
};
