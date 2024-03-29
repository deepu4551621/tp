const jwt = require('jsonwebtoken');
const ac_secretkey = process.env.AC_SECRET_KEY

const generateToken = async (req, res, next) => {
    
    const { email, password } = req.body;
    // Validate input fields
    if (!email || !password) {
        return res.json({ message: 'Please fill in all fields' });
    }
    try {
            // Generate access token
     const accessToken = jwt.sign({ email }, ac_secretkey, { expiresIn: '10m' });
    
            // Set refresh token in cookie
    res.cookie('actk', accessToken, { maxAge: 600000, httpOnly: true, secure: true, sameSite: 'strict' });
          
            // Send access token in response header or body
    res.json({ login: true, message: 'Login successful', token:accessToken });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
    
    next();
};

module.exports = generateToken;
