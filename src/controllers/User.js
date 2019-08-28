const User = require('../models/User');

module.exports = {
  async createUser(request, response) {

  },
  async getUser(request, response) {
    const userId = request.params.id;
    const user = await User
      .findById(userId)
      .select('_id name email role');
    return response.json(user);
  },
  async getUsers(request, response) {
    const users = await User
      .find()
      .sort('-createdAt')
      .select('_id name email role');
    return response.json(users);
  },
  async updateUser(request, response) {
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
  },
  async deleteUser(request, response) {
    const userId = request.params.id;
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return response
        .status(404)
        .json({ message: 'User not found!' });
    }
    return response.json({ message: 'User deleted!' });
  }
}
