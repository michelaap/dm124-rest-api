const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User');

module.exports = {
  async token(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const [error] = errors.array();
        return response
          .status(422)
          .json({ error: error.msg || 'Validation failed!' });
      }

      const { email, password } = request.body;
      const user = await User.findOne({ email });
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return response
          .status(422)
          .json({ message: 'Wrong password!' });
      }

      const token = jwt.sign({
        userId: user._id,
        email: user.email,
        role: user.role,
      }, process.env.ASSIGN_TOKEN, { expiresIn: '1h' });

      return response.json(token);
    }
    catch (error) {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: 'We are sorry, try again leter' });
    }
  }
}
