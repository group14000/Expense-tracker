const bcrypt = require("bcrypt");
const User = require("../modals/user");

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
        confirmPassword,
      });

      // Exclude confirmPassword from the response
      const { confirmPassword: _, ...userData } = user.toJSON();

      res.status(201).json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = signupController;
