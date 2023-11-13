const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Schema/UserSchema');
const bcrypt = require('bcrypt');
require('dotenv').config();

const customFields = {
    usernameField: 'username',
    passwordField: "password"
}


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create a user based on the Google profile
        const user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const newUser = new User({
            email: profile.emails[0].value,
            // Add other relevant user data here
          });
          await newUser.save();
          return done(null, newUser);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


const verifyCallback = (username, password, done) => {
    User.findOne({ username: username }).then((user) => {
        if(!user) return done(null, false); //simply means error - null, user - null as well...

        const isValid = validPassword(password, user.hash, user.salt);

        if(isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch((error) => done(error));
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId).then((user) => {
        done(null, user);
    }).catch((err) => done(err));
})

module.exports = passport;
