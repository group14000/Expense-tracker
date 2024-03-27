const User = require('../modals/user');

const signupController = {
  async createUser(req, res) {
    try {
      const { userid, email, name, password } = req.body;
      const user = await User.create({ userid, email, name, password });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = signupController;
