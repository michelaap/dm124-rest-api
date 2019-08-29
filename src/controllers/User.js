const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');

module.exports = {
  async createUser(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const { name, email, password } = request.body;
      const hashPassword = await bcrypt.hash(password, 8);

      const user = new User({
        name,
        email,
        password: hashPassword,
      });

      const userData = await user.save();
      return response
        .status(201)
        .json({ message: 'User created!', userId: userData._id });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async getUser(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const userId = request.params.id;
      const user = await User
        .findById(userId)
        .select('_id name email role');
      return response.json(user);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async getUsers(request, response) {
    try {
      const users = await User
        .find()
        .sort('-createdAt')
        .select('_id name email role');
      return response.json(users);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async updateUser(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const userId = request.params.id;
      const { role } = request.body;
      const user = await User.findById(userId);

      if (!user) {
        return response
          .status(404)
          .json({ message: 'User not found!' })
      }

      user.role = role;
      await user.save();

      const userUpdated = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
      return response.json(userUpdated);
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  },
  async deleteUser(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const userId = request.params.id;
      const user = await User.findByIdAndRemove(userId);

      if (!user) {
        return response
          .status(404)
          .json({ message: 'User not found!' });
      }
      return response.json({ message: 'User deleted!' });
    }
    catch(error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again lether' });
    }
  }
}
