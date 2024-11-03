const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');
require('dotenv').config();
const firebaseConfig = require('./firebaseConfig.js');

app.set("view engine", "ejs");
app.use(express.static(publicDir));
app.get('/dashboard', (_req, res) => {
	res.render(join(publicDir, 'app', 'index.html'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
});
// Registration Route
router.post('/register', async (req, res) => {
    const { username, email, phoneNumber, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !phoneNumber || !password || !password2) {
        errors.push({ msg: 'Please fill in all required fields' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters.' });
    }
    if (errors.length > 0) {
        return res.render('register', { errors, username, email, phoneNumber, password, password2 });
    } else {
        try {
            const user = await User.findOne({ email });
            if (user) {
                errors.push({ msg: 'Email is already registered' });
                return res.render('register', { errors, username, email, phoneNumber, password, password2 });
            }

            const newUser = new User({ username, email, phoneNumber, password });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verify your email',
                html: `<p>Hi ${username}, please verify your email by clicking the link below:</p><a href="http://${req.headers.host}/verify-email/${token}">Verify Email</a>`
            };

            await transporter.sendMail(mailOptions);
            req.flash('success_msg', 'Verification email sent. Please check your inbox.');
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.render('register', { errors: [{ msg: 'An error occurred during registration' }] });
        }
    }
});

// Email Verification Route
router.get('/verify-email/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            req.flash('error_msg', 'Email verification failed or expired.');
            return res.redirect('/register');
        }
        user.isVerified = true;
        await user.save();
        req.flash('success_msg', 'Your email has been verified. You can now log in.');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Invalid or expired token.');
        res.redirect('/register');
    }
});

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('error_msg', 'Invalid credentials.');
            return res.redirect('/login');
        }
        if (!user.isVerified) {
            req.flash('error_msg', 'Please verify your email before logging in.');
            return res.redirect('/login');
        }
        req.logIn(user, err => {
            if (err) return next(err);
            res.redirect('/index');
        });
    })(req, res, next);
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error_msg', 'No account with that email found.');
            return res.redirect('/forgot-password');
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // One hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            html: `<p>You are receiving this message because you (or someone else) requested a password reset.</p>
                   <p>Please click on the following link, or paste it into your browser to complete the process:</p>
                   <a href="http://${req.headers.host}/reset-password/${resetToken}">Reset Password</a>`
        };

        await transporter.sendMail(mailOptions);
        req.flash('success_msg', 'An email with a reset link has been sent to your email address.');
        res.redirect('/forgot-password');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/forgot-password');
    }
});

// Reset Password Routes
router.get('/reset-password/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token, 
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot-password');
        }
        res.render('reset-password', { token: req.params.token });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/forgot-password');
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { password, password2 } = req.body;
    if (password !== password2) {
        req.flash('error_msg', 'Passwords do not match.');
        return res.redirect(`/reset-password/${req.params.token}`);
    }
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot-password');
        }
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        req.flash('success_msg', 'Your password has been reset. You can now login.');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/forgot-password');
    }
});

module.exports = router;
const PORT = process.env.PORT || 5001;
app.listen(5001, () => {
    console.log("Server running on port 5001");
});