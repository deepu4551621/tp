const jwt = require('jsonwebtoken');
const ac_secretkey = process.env.AC_SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies.actk;
    console.log('middleware_Token', token);
    if (!token) {
        return res.json({ message: 'Access denied. No token provided.' }); // Return a response and exit the middleware
    } else {
        try {
            jwt.verify(token, ac_secretkey, (err, decoded) => {
                if (err) {
                    return res.json({ valid: false, message: 'Invalid token' }); // Return a response and exit the middleware
                } else {
                    req.user = decoded;
                    console.log('user', req.user)
                    res.json(req.user)
                    next(); // Call next() to proceed to the next middleware or route handler
                }
            });
        } catch (error) {
            console.log('error', error);
            return res.status(500).json({ message: 'Internal Server Error' }); // Return a response in case of an error and exit the middleware
        }
    }
}

module.exports = verifyToken;
