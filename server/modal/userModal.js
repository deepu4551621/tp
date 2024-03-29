const mongoose =require('mongoose')
const bcrypt =require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,    
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update updatedAt timestamp before saving
userSchema.pre('save', async function(next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Replace the plain password with the hashed password
        this.password = hashedPassword;
        this.updatedAt = Date.now();
        // Continue with the save operation
        return next(); } 
        catch (error) {
            return next(error);
        }
        
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;