const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const { db, jwtSecret } = require('./conf');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (formMail, formPassword, done) => {
      try {
        const [[user]] = await db.query(
          `SELECT 
            id, lastname, firstname, email, password, credits, city, gender, budget, birthday, animals, aboutme, hobbies, phone, avatarUrl 
          FROM 
            users 
          WHERE 
            email = ?`,
          [formMail]
        );
        if (!user || !bcrypt.compareSync(formPassword, user.password))
          return done(null, false, 'Bad email or password');
        delete user.password;
        return done(null, { ...user });
      } catch (e) {
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
