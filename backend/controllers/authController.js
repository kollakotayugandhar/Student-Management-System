const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // 🔥 FIXED JWT (NO ENV REQUIRED)
        const jwtSecret = process.env.JWT_SECRET || "secretkey";
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });

        const tokenPreview = token ? `${token.slice(0, 10)}...` : null;
        console.log("Issued token preview (authController):", tokenPreview);

        res.json({
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};