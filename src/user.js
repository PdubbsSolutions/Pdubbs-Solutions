const mongoose = require('mongoose');
const bcrypt = required('bcrypt');
const UserSchema = new mongoose.Schema ({
    username: {type: String, reuqired: true, unique: true, minlength: 6},
    email: {type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: {type: String, required: true,},
    isVerified: {type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    next();
});

UserSchema.methods.comparePassword=  function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model ('User', UserSchema);