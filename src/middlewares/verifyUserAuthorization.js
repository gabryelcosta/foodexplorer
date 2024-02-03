const AppError = require('../utils/AppError');

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {

    if (request.user && request.user.role) {
      const { role } = request.user;


      if (!roleToVerify.includes(role)) {
        throw new AppError("Sem Autorização", 401);
      }

      return next();
    } else {
      throw new AppError("Sem Autorização", 401);
    }
  };
}

module.exports = verifyUserAuthorization;