const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');
const { verify } = require('jsonwebtoken');

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers;

  if(!authHeader.cookie){
    throw new AppError('JWT token não informado', 401);
  }

  const [, token] = authHeader.cookie.split('token=');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { role, sub: user_id } = decoded;

    request.user = {
      id: Number(user_id),
      role
    };

    return next();
  } catch (error) {
    throw new AppError('Token JWT invalido', 401);
  }
}

module.exports = ensureAuthenticated;