const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://story-hub.vercel.app/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, name } = profile;
        console.log(profile);
        const newUser = {
          googleId: id,
          displayName: displayName,
          firstName: name.givenName,
          lastName: name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ googleId: id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  );

  // Serialized and deserialized User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
