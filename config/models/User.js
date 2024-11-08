const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
   fallback: {
       fs: false,
       net: false,
       tls: false,
       http: false,
       https: true,
       zlib: false,
       stream: false,
       crypto: false,
       path: false,
       os: false,
       assert: false,
       buffer: false,
       util: false,
       child_process: false,
       /* Add more as needed */
   }
}
}


const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6
   },
   email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
   },
   password: {
      type: String,
      required: true
   }
});

UserSchema.pre('save', async function(next) {
   try {
      if (!this.isModified('password')) return next(); 
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
      next();
   } catch (err) {
      next (err);
   }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.modle('User', UserSchema);