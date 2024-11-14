const passport = require('passport');
const app = express();
import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import pkg from 'passport';
const { initialize, session: _session, authenticate } = pkg;
import { join } from 'path';

app.use(express.static('./src/static'));
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
})

function someFunction() {
    console.log('This is some function');
  }
  export default someFunction;


import('passport' ) (passport);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use("static"(join(__dirname, 'src/static')));
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}));
app.use(initialize());
app.use(_session());

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
app.get(' / ', (_req, res) => {
    res.render('index');
});
app.get('/register', (_req, res) => {
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
            const user = await findOne({ email: email });
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
    app.get('/login', (_req, res) => {
        res.render('login');
    });
    
    app.post('/login', (req, res, next) => {
        authenticate('local', {
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
        const {email, name, date, time} =req.body
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
        transporter .sendMail(mailOptions, (error, _info) => {
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

    
    app.set('view engine', 'ejs');
    app.get('/reset password', function(_req, res) {
       res.render('views/reset-password');
    });
    
    app.get('/forgot password', function(_req, res) {
       res.render('views/forgot-password');
    });
    
    
    app.use('static'(join(__dirname, 'public' )));
    app.use('static'(join(__dirname, 'src', 'static)')));
    
    app.get('/dashboard', (_req, res) => {
            res.sendFile(join(__dirname, 'public', 'index.html'));
        });
    
    app.get('/error',function(_req, res) {
       res.sendFile(join(__dirname, 'public', '404.html'));
    })
    
    app.get('/contact', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'contact.html'));
    });
    
    app.get('/about', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'about.html'));
    });
    
    app.get('/login', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'login.html'));
    });
    
    app.get('/register', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'register.html'));
    });
    
    app.get('/logout', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'logout.html'));
    });
    
    app.get('/checkout', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'checkout.html'));
    });
    
    app.get('/templates', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'templates.html'));
    });
    
    app.get('/products', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'products.html'));
    });
    
    app.get('/projects', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'projects.html'));
    });
    
    app.get('/sources', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'sources.html'));
    });
    
    app.get('/accessibility', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'accessibility.html'));
    });
    
    app.get('/policies', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'csspolicy.html'));
    });
    
    app.get('/procedures', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'cssprocedures.html'));
    });
    
    app.get('/terms&conditions', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'termsandconditions.html'));
    });
    
    app.get('/profile', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'views', 'profile.html'));
    });
    
    app.get('/cart', function(_req,res) {
       res.sendFile(join(__dirname, 'src', 'static', 'pages', 'cart.html'));
    });

function toggleOptions(event) {
    const selectElement = document.getElementById("sessionOptions1");
    if (!selectElement.classList.contains("expanded")); {
        selectElement.classList.add("expanded");
}
event.stopPropagation();
}
document.getElementById("sessionOptions1").addEventListener("change", function() {
    this.classList.remove("expanded");
});

  
function toggleInput(event){
    const  inputElement = document.getElementById("multiCollapse1");
    if (!inputElement.classList.contains("expanded")); {
        inputElement.classList.add("expanded");
    }
    event.stopPropagation();
}
document.getElementById("multiCollapse1").addEventListener("click", function() {
    this.classList.remove("expanded");
    
  });  
  const directory = './source\repos\Pdubbs-final'
  
  function replacePaths(dir) {
    const files = fs.readdirSync(dir);
  
    files.forEach(file => {
      const filePath = join(dir, file);
      const stat = fs.statSync(filePath);
  
      if (stat.isDirectory()) {
        replacePaths(filePath);  
      } else if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
        let content = fs.readFileSync(filePath, 'utf-8');
 
        content = content.replace(/path\.join\((.*?)\)/g, (_match, p1) => {
          return `__dirname + ${p1}`;
        });
  
        content = content.replace(/path\.resolve\((.*?)\)/g, (_match, p1) => {
          return `__dirname + ${p1}`;
        });
  
        fs.writeFileSync(filePath, content, 'utf-8');
      }
    });
  }
  
  replacePaths(directory);
  

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}')
    })