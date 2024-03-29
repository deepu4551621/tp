const User = require('../../modal/userModal');
const jwt =require('jsonwebtoken')
const {comparePassword} = require('../../helpers/auth')
const ac_secretToken = process.env.AC_SECRET_KEY;


// Register user
const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    //  let hPassword =   hashPassword(password)
        const exist = await User.findOne({ email });

        // Email error
        if (exist) {
            return res.json({ error: 'Email already exists' }); 
        }       
        // Create new user 
        const user = await User.create({
            name, email, password
        });
        return res.json(user);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: 'No user found' });
        }
        
        if (comparePassword(password, user.password)) {
            jwt.sign({email:user.email, id:user._id, name:user.name},ac_secretToken, 
                {expiresIn:'1m'}, (err, token)=>{
                    if(err) throw err;
                    res.cookie('token', token).json(user)
                } )
            // return res.json({ success: true, message: 'Password matched' });
        } else {
            return res.json({ error: 'Password does not match' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (token) {
            const user = await jwt.verify(token, ac_secretToken, {});
            res.json({ authUser: user });
        } else {
            res.json('Token not provided');
        }
    } catch (err) {
        // Handle any errors that occur during token verification or JSON response sending
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { Register, loginUser, getProfile };
