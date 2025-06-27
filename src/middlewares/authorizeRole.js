const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(403).json({ message: 'Access denied. No role provided.' });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }

    next();
  };
};
