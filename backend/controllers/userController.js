const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/user");
require("dotenv").config();

const signupController = {
  async createUser(req, res) {
    try {
      const { userid, email, name, password, confirmPassword } = req.body;

      // Check if userid or email already exists
      const existingUser = await User.findOne({ $or: [{ userid }, { email }] });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "userid or email is already exist" });
      }

      // Check if all required fields are provided
      if (!userid || !email || !name || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      // Generate a salt
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user with the hashed password
      const user = await User.create({
        userid,
        email,
        name,
        password: hashedPassword,
      });

      // Exclude confirmPassword from the response
      const { confirmPassword: _, ...userData } = user.toJSON();

      // Send success message with status 201
      res.status(201).json({ message: "User created successfully", userData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

const loginController = {
  async loginUser(req, res) {
    try {
      const { identifier, password } = req.body;

      // Find the user by either userid or email
      const user = await User.findOne({
        $or: [{ userid: identifier }, { email: identifier }],
      });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Send success message with status 200
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = { signupController, loginController };
