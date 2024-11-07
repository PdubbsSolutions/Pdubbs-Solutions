
const app = express();
const publicDir = _join(__dirname, 'public');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('../config/models/User.js');

require('dotenv').config();

require(' ./config/passport' ) (passport);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src/static')));
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

const upload = multer({ dest: 'uploads/' });
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
}
app.get(' / ', (req, res) => {
    res.render('index');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.post(' /register', async (req, res) => {
    const { username, email, phoneNumber, password, password2 } = req.body;
    let errors = [ ];

    if ( !username || !email || !phoneNumber || !password || !password2) {
        errors.push({ msg: 'Fill in all required fields' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 8) {
        errors.push({ msg: 'Password should be at least 8 characters' });
    };
    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            phoneNumber,
            password,
            password2,
        });
    } else {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                errors.push({ msg: 'Email is already registered' });
                res.render('register', {
                    errors,
                    username,
                    email,
                    password,
                    password2
                });
            } else { 
                const newUser = new User({ username, email, password });
                await newUser .save();
                req.flash('success_msg', 'You are now registered and can now log in.');
                res.redirect('/login');
            }
        } catch (err) {
            console.error(err);
            res.render('register', {
                errors: [{ msg: 'An error occured during registration' }],
                username,
                email,
                password,
                password2
            });
        }
    }
});
    app.get('/login', (req, res) => {
        res.render('login');
    });
    
    app.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next);
    });
    
    app.get('/logout', (req, res) => {
        req.logout(err => {
            if (err) { return next(err); }
            req.flash('success_msg', 'Logout Successful');
            res.redirect('/login');
        });
    });  
app.get( '/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

app.post(' /purchase-bundle', ensureAuthenticated, async (req, res) => {
    const  { bundleId, token } = req.body;
    try {
        const charge = await stripe.charges.create({
            amount: 150,
            currency: 'cad',
            description: 'Purchase for bundle ${bundleId}',
            source: token
            });
            res.status(200) .send('Payment successful' );
        }   catch (err) {
            res.status(500) .send('Payment failed');
        }
    });
    app.post(' /request-document', ensureAuthenticated, 
        upload.single('document'), (req, res) => { 
        const { name, email, details } = req.body;
        const documentPath = req.file.path;

        res.send('Custom document request received from ${name}');
    });
    app.post ('/book-session', ensureAuthenticated, async (req, res) => {
        const {email, name, date, time} = req.body;
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Zoom 1:1 Session Booking',
            text: 'Thank you ${name}, you have booked a session for ${date} at ${time}.'
        };
        transporter .sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500) .send('Error booking session');
            }
            res.send('Session booked successfully');
        });
    });
    app.post('/request-partnership', ensureAuthenticated, (req, res) => {
        const {companyName, email, message } = req.body;
        res.send('Partnership request received from ${companyName} ');
    });
    
app.get('/login', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname,'src\static\pages\login.html'));
});

app.get('/register', ensureAuthenticated, ( _req, res) => {
	res.sendFile(_join(__dirname,'src\static\pages\register.html' )); 
});

app.get('/templates', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\templates.html'));
});

app.get('/accessibility', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\accessibility.html'));
})
app.get('/checkout', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname,'src\static\pages\checkout.html'));
});
app.get('/products', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\products.html' ));
});

app.get('/Privacy Policy', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\privacypolicy.html' ));
});

app.get('/projects', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\projects.html' ));
});

app.get('/reports', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\reports.html' ));
});

app.get('/logout', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\logout.html' ));
});

app.get('/contact', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\contact.html' ));
});

app.get('/sources', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\sources.html' ));
});

app.get('/about', ensureAuthenticated, (_req, res) => {
	res.sendFile(_join(__dirname, 'src\static\pages\about.html' ));
});

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}')
    })