const express = require('express');
const path = require('path');
const mutler = require('mutler');
const nodemailer = require('nodemailer');
const { authProxyOrigin } = require('firebase-tools/lib/api');
const { EmailAuthCredential } = require('firebase/auth/web-extension');
const { stripVTControlCharacters } = require('util');
const app = express();
require('dotenv').config();

app.set('view engine', ejs);
app.use(express.static(path.joint(__dirname, 'static')));
app.use(express.urlencodeed({extended: true}));
app.use(express.json());

const upload = multer({ dest: 'uploads/'});

app.get('/', (req, res) =>{
    res,render('index');
});

app.post('/book-session', async(req, res) => {
    const {emil, name, phoneNumber, date, time} = requ.body;
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: process.env .EMAIL_USER,
            pass: process.env .EMAIL_PASS
        }
    });
const mailOptions = {
    from: process.env .EMAIL_USER,
    to: email,
    subject: 'Zoom 1:1 Session Booking',
    test: 'Thank you ${name}, you have be=ooked a session for ${date} at ${time} with PDubbs Solutions'
};
transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
        return res.status(500).send('Error booking session');
    }
    res.send('Session booked successfully');
});
});

app.post('/purchase-bundle', async(req, res) => {
    const { bundleId, token} = req.body;
    try{
        const charge = await stripe.charges.create ({
            amount: 5000,
            currency: 'cad',
            description: 'Purchase for bundle ${bundleID}',
            source: token
        });
        res.status(200).send('Payment Successful');
    } catch (err) {
        res.status(500).send('Payment Failed');
    }  
});

app.post('/request-document', upload.single('document'), (req,res) => {
    const {name, email, details} = req.body;
    const documentPath = req.filter.path;
    res.send('Custom document request received from ${name}');
});

app.post('/request-partnership', (req, res) => {
    const { companyName, email, phoneNumber, message } = req.body;
    res.send('Partnerhsip request received from ${companyName}');
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
})