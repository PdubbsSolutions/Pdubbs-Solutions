const firebaseConfig = require('./firebaseConfig.js');
const express =require('express');
const session = require('express-session');
const app = express();
const PORT = 5001;

app.set('view engine', 'ejs');
app.get('profile', (req, res) =>{
    const user = {
        username: 'pdubbs'
    };
    res.render('profile', {user:user});
});
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
pdubbs-final.web.app;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pdubbs-final.web.app/");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(session({
    secret: process.env.SESSION_SECRET || 'yoursecret', 
    resave: false,
    saveUnintialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}
  }));

app.use(passport.initializer());
app.use(passport.session());


