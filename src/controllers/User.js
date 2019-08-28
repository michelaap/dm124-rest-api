const User = require('../models/User');

module.exports = {
  async createUser(request, response) {

  },
  async getUser(request, response) {

  },
  async getUsers(request, response) {
    const users = await User
      .find()
      .sort('-createdAt')
      .select('_id name email role');
    return response.json(users);
  },
  async updateUser(request, response) {

  },
  async deleteUser(request, response) {

  }
}
