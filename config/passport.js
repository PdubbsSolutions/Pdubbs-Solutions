const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
   passport.serializeUser((user, done) => {
      done(null, user.id);
   });
   passport.deserializeUser((user, done) => {
      User.findById(id, (err, user) => done(err, user));
   });
   passport.use(
      new LocalStrategy({ usernameField: 'email', }, (email, password, done) => {
         User.findOne({ email: email}, (err, user) => {
            if (err) return done (err);
            if (!user) {
               return done(null, false, { message: 'No user found with that email' });
            }
            user.comparePassword(password).then(isMatch => {
               if (isMatch) {
                  return done(null, user);
               } else {
                  return done (null, false, { message: 'Incorrect password'});
               }
            }).catch(err => done(err));
         });
      })
   );
};