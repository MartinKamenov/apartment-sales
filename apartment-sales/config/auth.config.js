/* eslint max-len: ["error",  { "ignoreRegExpLiterals": true } ]*/
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
//const Crypto = require('../models/crypto');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUsername(username) {
    const re = /^[0-9A-Za-z\s\-]+$/;
    return re.test(username);
}

const configAuth = (app, adminRepository, registeredUser) => {
    passport.use(new Strategy({
            passReqToCallback: true,
        },
        (req, username, password, done) => {

            if (!username || !password) {
                return done(null, false, {
                    message: 'Missing username or password',
                });
            }
            // This is the Login, because no e-mail is sent
            //const cryptoPassword = Crypto.encrypt(password).toString();
            return adminRepository.findAdmin(username, password)
                .then((admins) => {
                    if (admins.length < 1) {
                        return done(null, false, {
                            message: 'Wrong username or password',
                        });
                    } else if (admins.length > 1) {
                        return done(null, false, {
                            message: 'Problem with duplicate user',
                        });
                    }
                    return done(null, admins[0]);
                })
                .catch((ex) => {
                    return done(ex);
                });

        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((admin, done) => {
        done(null, admin._id);
    });

    passport.deserializeUser((id, done) => {
        adminRepository.findAdminById(id)
            .then((admins) => {
                if (admins.length < 1) {
                    return done('No such user found.----');
                } else if (admins.length > 1) {
                    return done('There is more than one user with this id');
                }
                return done(null, admins[0]);
            })
            .catch((ex) => done(ex));
    });
};

module.exports = configAuth;
