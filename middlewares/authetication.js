module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token Invalido' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
