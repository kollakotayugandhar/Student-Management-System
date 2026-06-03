const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = process.env.JWT_SECRET || "secretkey";

// REGISTER
const registerUser = async (req, res) => {

    try {

        const { name, email, password, role, adminCode } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const normalizedRole = role === "admin" ? "admin" : "student";

        if (normalizedRole === "admin") {
            const adminSecret = process.env.ADMIN_SECRET || "admin123";
            if (adminCode !== adminSecret) {
                return res.status(401).json({ message: "Invalid admin code" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: normalizedRole
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            jwtSecret,
            { expiresIn: "1d" }
        );

        const tokenPreview = token ? `${token.slice(0, 10)}...` : null;
        console.log("Registration successful for user:", user.email, "Token preview:", tokenPreview);

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// LOGIN
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        let isMatch = false;

        // Detect bcrypt hash (starts with $2a$, $2b$, or $2y$)
        const looksLikeHash = typeof user.password === 'string' && /^\$2[aby]\$\d{2}\$/.test(user.password);

        if (looksLikeHash) {
            isMatch = await bcrypt.compare(password, user.password);
        } else {
            // Legacy plaintext password in DB — compare directly and upgrade to hashed password
            if (password === user.password) {
                isMatch = true;
                const newHash = await bcrypt.hash(password, 10);
                try {
                    user.password = newHash;
                    await user.save();
                    console.log("Upgraded legacy plaintext password to bcrypt for user:", user.email);
                } catch (e) {
                    console.log("Failed to upgrade password hash:", e.message);
                }
            }
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            jwtSecret,
            { expiresIn: "1d" }
        );

        const tokenPreview2 = token ? `${token.slice(0, 10)}...` : null;
        console.log("Login successful for user:", user.email, "Token preview:", tokenPreview2);

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

const promoteUser = async (req, res) => {
    try {
        const { id, email } = req.body;

        if (!id && !email) {
            return res.status(400).json({ message: "Please provide a user ID or email to promote." });
        }

        const filter = id ? { _id: id } : { email };

        const user = await User.findOneAndUpdate(
            filter,
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({
            message: "User promoted to admin successfully.",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, promoteUser };