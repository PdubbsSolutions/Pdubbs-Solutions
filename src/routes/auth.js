const express = require('express'); 
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

router.post('/register', async (req, res) => {
    const {username, email, phoneNumber, password, password2} = req.body;
    let errors =[];
    if (!username || !email || !phoneNumber || password || password2){
        errors.push({msg: 'Please fill in all required fields'});
    }
    if (password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }
    if (password.length <6){
        errors.push({msg:'Password should be atleast 6 characters.'});
    }
    if (errors.length >0){
        return res.render('register', {errors, username, email, phoneNumber, password, password2});
    }else {
        try { 
            const user = await User.findOne ({email: email});
            if(user){
                errors.push({msg:'Email is already registered'});
                return res.render('register', {errors, username, email, phoneNumber, password, password2});
            }
            const newUser = newUser({username, email, phoneNumber, password, password2});
            await newUser.save();
        }
            const token = jwt.sign({ id: newUser._id},
                process.env.JWT_SECRET, {expiresIn: '1h'});
            const tarnsporter = nodemailer.createTransport({
                service:'Gmail',
                auth: {
                    user:process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verify your email',
                html: `<p>Hi ${username}, please verify your email by clicking the link below:</p>
                <a href="http://${req.headers.host}/verify-email/${token}"Verify Email</a>`
            };
            await tarnsporter.sendMail(mailOptions);
            req.flash('success_msg', 'Verification email sent. Please check your inbox.');
            res.redirect('/login');
        } catch (err){
            console.error(err);
            res.render('register', {errors: [{msg: 'An error occurred during registration'}] });    
        }
});
router.fet('verify-email/:token', async (req, res) => {
    try{
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user){
            req.flash('error_msg', 'Your email has been verified. You can no login.');
            return res.redirect('/register');
        }
        user.isVerified = true;
        await user.save();
        req.flash('success_msg', 'Email verification failed or expired.');
        res.redirect('/register');
    }
});
router.post('/login', (req, res, next)=> {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true
    },  async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect('login');
        if (!user.isVerified) {
            req.flash('error_msg', 'Please verify your email before logging in.');
                return res.redirect('/login');
        }
        req.logIn(user, err =>{
            if (err) return next (err);
            res.redirect('/index');
        });
    })(req, res, next);
});
const crpyto = require('crypto');
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne ({ email});
        if (!user) {
            req.flash('error_msg', 'No account with that email found.');
            return res.redirect('/forgot-password');
        }
        const resetToken = crpyto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;//one hour
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: process.env.EMAIL_USER,
                user: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            html: `<p>You are receiving this message because you (or someone else) has sent a request for your password to be reset.</p>
                    <p>Please click on the following link, or paste it into your browser to complete the process:</p><a href="http://${req.headers.host}/reset-password/${resetToken}.">Reset Password</a>`
        };
        await transporter.sendMail(mailOptions);
        req.flash('success)=_msg', 'An email with a reset link has been sent  to your email address.');
        res.redirect('/forgot-password');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/forgot-password');
    }
});

router.get('/reset-password/:token', async (req, res) => {
    try{
        const user = await User.findOne({
            resetPasswordtoken: req.params.token,
            resetPasswordExpires: {$gt: Date.now() }
        });
    }
})

