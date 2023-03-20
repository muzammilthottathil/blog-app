import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../model/token.js";
import User from "../model/user.js";

export const signupUser = async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashPassword = await bcrypt.hash(user.password, salt);

        if (!req.body.username || !req.body.password || !req.body.name) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) return res.status(422).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newuser = new User({
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword,
            role: "user",
        });
        await newuser.save();

        res.status(200).json({ msg: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while creating user" });
    }
};

export const loginUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        let user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(400).json({ msg: "User not found" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) return res.status(400).json({ msg: "Invalid Password" });

        // jwt auth

        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET);

        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        return res.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error While logging user" });
    }
};
