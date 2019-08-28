const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = {
  async token(request, response) {
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
}
