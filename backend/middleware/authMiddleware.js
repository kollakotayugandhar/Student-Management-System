const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        const token = authHeader.split(" ")[1];

        const tokenPreview = token ? `${token.slice(0, 10)}...` : null;
        console.log("TOKEN PREVIEW:", tokenPreview);

        const jwtSecret = process.env.JWT_SECRET || "secretkey";
        const secretSource = process.env.JWT_SECRET ? "env" : "fallback";
        console.log("JWT secret source:", secretSource);

        const decoded = jwt.verify(token, jwtSecret);

        console.log("DECODED:", decoded);

        const userData = {
            id: decoded.id,
            role: decoded.role
        };

        if (!userData.role) {
            const user = await User.findById(decoded.id).select("role email");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            userData.role = user.role;
            userData.email = user.email;
        }

        req.user = userData;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: error.message
        });

    }
};

module.exports = protect;