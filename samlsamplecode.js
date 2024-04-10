// app.js
const express = require('express');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const session = require('express-session');
const ejs = require('ejs');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// SAML Configuration
const samlConfig = {
    entryPoint: 'http://localhost:5000/login',
    issuer: 'http://www.okta.com/exkgbgbfp3sToWpQz5d7',
    cert: 'MIIDqDCCApCgAwIBAgIGAY7BhapoMA0GCSqGSIb3DQEBCwUAMIGUMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi02MDcwMDkzNjEcMBoGCSqGSIb3DQEJ ARYNaW5mb0Bva3RhLmNvbTAeFw0yNDA0MDkwNjIxMjZaFw0zNDA0MDkwNjIyMjZaMIGUMQswCQYD VQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsG A1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi02MDcwMDkzNjEc MBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC ggEBAMkXykx47O7J1jYL4d29rez2Sqn0PtcNfDlgNpQqKaZFR5bHed+Ue9TgSdRMdOwo+Wca8Cg4 HqWbskovPV+pAhRkerkr3Cw9ezFIZz6sfs/1qxA3sm58eG8LhYOhg2Lu3xBUZjPL4oNrEOwshYDV vjGafoeLFb0u8RWYYzLBfNheedkb4HRG+7OiVzfxJiwNUOQN3JzcNZsxExnDTRB7CEQLUDhPUNjc MByNYoihwY/efnuQ82DTz7nhaNumZBLG9dmwma0WtTKl+jPJPvkHM9hhtJCIYjRN3mT8rGtpv3bt iewMe1BgPZTkJfp2U07TZvR2r4iSfxFDx6UjKVMfNJUCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEA Yi2bWESUa7tMZZiRRQ+/9Fixw8QVGZz3eXX1YGE5de6hfJdkudrYI/rIdzmolD+6vmnDHn7H9veu KdWePhlD0P3CzWeQERJuBsuPgAm7h+nuEF6uaqZVnGy1qtFi51tWcT19Lf4hI4A8AoRioqaGn3Y5 Uy+HzEmb7Aew4La4U9DlE1ftmi7cIEXOG54wmkgEEH7Has3+K/c0I7d+bqbHYAcKEOQBfn8+h7cT 3bkZuk8p0fC13YGzPLJwnWMYRSp5qCFDmqPXttqMhdDQCIIKtQqsX+HYal+gaYJtS7NISMviekKz m7I9gzgsEYu09AL63wjW/6douAxXjlc+Et7QgA=='
};

// Passport SAML strategy
passport.use(new SamlStrategy({
        callbackUrl: 'http://localhost:3000/login/callback',
        entryPoint: samlConfig.entryPoint,
        issuer: samlConfig.issuer,
        cert: samlConfig.cert
    },
    (profile, done) => {
        return done(null, profile);
    }
));

// Serialize user object to the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user object from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Login route
app.get('/login', passport.authenticate('saml'));

// Callback route
app.post('/login/callback', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res) => {
    res.redirect('/');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Protected route
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('You are authenticated!');
    } else {
        res.redirect('/login');
    }
});

// Render login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});