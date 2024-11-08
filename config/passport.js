const LocalStrategy = require('passport-local').Strategy;
const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /passport/,
            contextRegExp: /node_modules/
        })
    ]
};

module.exports = function (passport) {
   passport.serializeUser((user, done) => {
      done(null, user.id);
   });
   passport.deserializeUser((user, done) => {
      user.findById(id, (err, user) => done(err, user));
   });
   passport.use(
      new LocalStrategy({ usernameField: 'email', }, (email, password, done) => {
         user.findOne({ email: email}, (err, user) => {
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