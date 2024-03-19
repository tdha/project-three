module.exports = function(req, res, next) {
    if (!req.user) return res.status(401).json('Unauthorized'); // Status code of 401 is Unauthorized
    next(); // A okay
  };