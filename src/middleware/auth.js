const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authHeader = request.get('Authorization');

  if (!authHeader) {
    return response
      .status(401)
      .json({ error: 'Not Authenticated!' });
  }

  const [, token] = authHeader.split(' ');
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.ASSIGN_TOKEN);
  }
  catch (error) {
    return response
      .status(500)
      .json({ error: 'We are sorry, try again lether!' });
  }

  if (!decodedToken) {
    return response
      .status(401)
      .json({ error: 'Not Authenticated!' });
  }

  const { userId, role } = decodedToken;
  request.user = { userId, role };
  next();
};
