const express = require("express");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");
const flash = require("connect-flash");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const publicDir = path.join(__dirname, "public");
const upload = multer({ dest: "uploads" });

// Middleware
app.set("view engine", "ejs");
app.use(express.static(publicDir));
app.get('/dashboard', (_req, res) => {
	res.render(join(publicDir, 'app', 'index.html'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
});
// Flash messages
app.use(session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.user = req.user || null;
    next();
});

// Root route
app.get("/", (req, res) => {
    res.render("index");
});

// Booking session route
app.post("/book-session", async (req, res) => {
    const { email } = req.body;
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Zoom 1:1 Session Booking",
        text: `Thank you for booking a session!`,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).send("Error booking session");
        }
        res.send("Session booked successfully");
    });
});

// Additional Routes
app.post("/purchase-bundle", (_req, res) => {
    res.status(200).send("Payment Successful");
});

app.post("/request-document", upload.single("document"), (req, res) => {
    const { name } = req.body;
    res.send(`Custom document request received from ${name}`);
});

app.post("/request-partnership", (req, res) => {
    const { companyName } = req.body;
    res.send(`Partnership request received from ${companyName}`);
});

// Register Route
app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", async (req, res) => {
    const { username, email, phoneNumber, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !phoneNumber || !password || !password2) {
        errors.push({ msg: "Fill in all required fields" });
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords do not match" });
    }
    if (password.length < 8) {
        errors.push({ msg: "Password should be at least 8 characters" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            username,
            email,
            phoneNumber,
            password,
            password2,
        });
    } else {
        try {
            // Check if user exists, and create new user logic here
            req.flash("success_msg", "Registration Successful!");
            res.redirect("/login");
        } catch (err) {
            console.error(err);
            res.render("register", {
                errors: [{ msg: "An error occurred during registration" }],
                username,
                email,
                phoneNumber,
                password,
                password2,
            });
        }
    }
});

// Login and Authentication Routes
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next);
});

app.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        req.flash("success_msg", "Logout Successful");
        res.redirect("/login");
    });
});

// Protected Routes
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Login Required");
    res.redirect("/login");
}

app.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render(join(__dirname, 'public', 'app', 'index.html'));
});
const PORT = process.env.PORT || 5001;
app.listen(5001, () => {
    console.log("Server running on port 5001");
});
