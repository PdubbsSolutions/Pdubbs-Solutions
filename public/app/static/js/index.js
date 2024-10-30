const {body, validationResult} = require('express-validator');
const PORT = 5001;

document.addEventListener("DOMContentLoaded", function() {
	const customRequestForm = document.querySelector("#custom-request form");
	const sessionForm = document.querySelector("#book-session form");
	const partnershipForm = document.querySelector("#partnership form");

	customRequestForm.addEventListener("submit", function(event) {
		event.preventDefault();
		const formData = new FormData(customRequestForm);
		const data = Object.fromEntries(formData.entries());
		set(ref(database, "customRequests/" + Date.now()), data)
			.then(() => {
				alert("Custom request submitted successfully!");
				customRequestForm.reset();
			})
			.catch((error) => {
				console.error("Error submitting custom request:", error);
			});
	});

	sessionForm.addEventListener("submit", function(event) {
		event.preventDefault();
		const formData = new FormData(sessionForm);
		const data = Object.fromEntries(formData.entries());
		set(ref(database, "sessions/" + Date.now()), data)
			.then(() => {
				alert("Session booked successfully!");
				sessionForm.reset();
			})
			.catch((error) => {
				console.error("Error booking session:", error);
			});
	});

	partnershipForm.addEventListener("submit", function(event) {
		event.preventDefault();
		const formData = new FormData(partnershipForm);
		const data = Object.fromEntries(formData.entries());
		set(ref(database, "partnerships/" + Date.now()), data)
			.then(() => {
				alert("Partnership request submitted successfully!");
				partnershipForm.reset();
			})
			.catch((error) => {
				console.error("Error submitting partnership request:", error);
			});
	});
});

//*Flash*\\
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error;');
    res.locals.user = req.user || null;
    next();
});

const firebaseConfig = {
	apiKey: "AIzaSyAwwveYRqdPTsnLosZJzR8L-jk8DjzwvLo",
	authDomain: "pdubbs-final.firebaseapp.com",
	databaseURL: "https://pdubbs-final-default-rtdb.firebaseio.com",
	projectId: "pdubbs-final",
	storageBucket: "pdubbs-final.appspot.com",
	messagingSenderId: "980654735004",
	appId: "1:980654735004:web:9346cd6edee1080d203759",
};

const app = initializeApp(firebaseConfig);
const database = database(app);
//*forms*\\
document.addEventListener("DOMContentLoaded", function() {
	const customRequestForm = document.querySelector("#custom-request form");
	const sessionForm = document.querySelector("#book-session form");
	const partnershipForm = document.querySelector("#partnership form");

	customRequestForm.addEventListener("submit", function(event) {
		event.preventDefault();
		const formData = new FormData(customRequestForm);
		const data = Object.fromEntries(formData.entries());
		set(ref(database, "customRequests/" + Date.now()), data)
			.then(() => {
				alert("Custom request submitted successfully!");
				customRequestForm.reset();
			})
			.catch((error) => {
				console.error("Error submitting custom request:", error);
			});
	});

	sessionForm.addEventListener("submit", function(event) {
		event.preventDefault();
		const formData = new FormData(sessionForm);
		const data = Object.fromEntries(formData.entries());
		set(ref(database, "sessions/" + Date.now()), data)
			.then(() => {
				alert("Session booked successfully!");
				sessionForm.reset();
			})
			.catch((error) => {
				console.error("Error booking session:", error);
			});
	});

	partnershipForm.addEventListener("submit", function(event) {
		event.preventDefault();
		const formData = new FormData(partnershipForm);
		const data = Object.fromEntries(formData.entries());
		set(ref(database, "partnerships/" + Date.now()), data)
			.then(() => {
				alert("Partnership request submitted successfully!");
				partnershipForm.reset();
			})
			.catch((error) => {
				console.error("Error submitting partnership request:", error);
			});
	});
});

const header = document.querySelector('h1');
header.textContent = "New Heading";

document.querySelector('button').addEventListener('click', () => {
	alert('Button Clicked!');
});

document.querySelector('form').addEventListener('submit', (e) => {
	const name = document.querySelector('#name').value;
	if (name === " ") {
		alert('Name is required');
		e.preventDefault();
	}
});

fetch('https://api.example.com/data')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));

localStorage.setItem('username', 'PDubb Solutions');
const username = localStorage.getItem('username');
console.log(username);

function debounce(func, delay) {
	let timeout;
	return function(...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}
window.AbortController.addEventListener('scroll', debounce(() => {
	console.log('Scrolled!');
}, 200));

async function fetchData() {
	try {
		const response = await fetch('https://api.example.com/data');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

const metadataStoreUrl = "https://us-central1-aiplatform.googleapis.com/v1/projects/pdubbs-solutions/locations/us-central1/metadataStores?metadata_store_id=default";
console.log("Metadata Store URL:", metadataStoreUrl);

fetch(metadataStoreUrl)
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error("Error:", error));

const filterItems = document.querySelectorAll('.filter-item h2');
filterItems.forEach(item => {
	item.addEventListener('click', function() {
		const section = this.nextElementSibling;
		const arrow = this.querySelector('.arrow');
		if (section.style.display === 'block') {
			section.style.display = 'none';
			arrow.classList.remove('open');
		} else {
			section.style.display = 'block';
			arrow.classList.add('open');
		}
	});
});

document.addEventListener('click', function(event) {
	const filterSection = document.querySelector('.filter-section');
	const isClickInside = filterSection.contains(event.target);
	if (!isClickInside) {
		document.querySelectorAll('.filter-item.active').forEach(item => {
			item.classList.remove('active');
		});
	}
});
//*register*\\
app.get('/register', (req, res) => {
	res.render('register');
});
app.post('/register', async (req, res) => {
	const {username, email, phoneNumber, password, password2 } = req.body;
	let errors = [ ];
	if (!username || !email || !phoneNumber || !password || !password2) {
		errors.push({ msg: 'Fill in the required fields'});
	}
	if (password !== password2) {
		errors.push({msg: 'Passwords do not match'});
	}
	if (password.length < 8 ){
		errors.push({ msg: 'Password should be at least 8 characters'});
	}
	if(errors.length > 0 ) {
		res.render('register' , {
			errors, username, email, phoneNumber, password, password2
		});
	}else {
		try {
			const user = await user.findOne({email: email});
			if (user) {
				errors.push ({msg: 'This email address is already associated with an account. Please enter a new address or Login'});
				res.render('register', {
					errors, username, email, phoneNumber, password, password2
				});
			}else {
				const newUser = new user ({ username, email, phoneNumber, password, password2});
				await newUser.save();
				req.flash('success_msg', 'Registration Successful!');
				res.redirect('/login');
			}
		} catch (err) {
			console.error(err);
			res.render('register', {
				errors: [{ msg: 'An error occured during registration' }],
				username, email, phoneNumber, password, password2
			});
		}
	}
});
//*login*\\
app.get('/login', (req, res) => {
	res.render('login');
});
app.post('/login', (req, res)=> {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	})(req, res, next);
});
app.get('/logout', (req, res) => {
	req.logout(err => {
		if (err) { return next(err); }
		req.flash('success_msg', 'Logout Successful');
		res.redirect('/login')
	})
})
//*file uploads*\\
const upload = multer({ dest: 'uploads/' });

//*autthentication*\\
function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'Login Required');
    res.redirect('/login');
}
app.get(' / ', (req, res) =>{
    res.render('index');
});
//*routes*\\
app.get('/logout', (req, res) => {
    res.sendFile(path.join(__direname, 'public\app\static\pages\logout'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\index.html'));
});
app.get('register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\register.html'));
});
app.post('/register', (req, res) => {
    res.redirect('/register');
});
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\login.html'));
});
app.get('/cart', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\cart.html'));
});
app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\about.html'));
});
app.get('/checkout', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\checkout.html'));
});
app.get('/products', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\products.html'));
});
app.get('/reports', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\reports.html'));
});
app.get('/templates', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\templates.html'));
});
app.get('/accessibility', (req,res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\accessibility.html'));
});
app.get('/TermsandConditions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public\app\static\pages\termsandconditions.html'));
})
app.listen(5001, () => {
    console.log ('Server running on port 5001');
});

app.post('/register', (req, res) => {
	const { username, email, phoneNumber} = req.body;
	res.render( 'remoteconfig.template.json', {
		Username: username || '',
		Email: email || ' ',
		phoneNumber: phoneNumber || ' ',
	});
	res.send('Registration Successful');
});

document.addEventListener("DOMContentLoaded", function() {
	const username = document.getElementById("username");
	const email = document.getElementById("email");
	const businessNumber = document.getElementById("businessNumber");
	const pasword = document.getElementById("password");
	const password2 = document.getElementById("password2");

	const usernameCheck = document.getElementById("usernameCheck");
	const emailCheck = document.getElementById("emailCheck");
	const businessNumberCheck = document.getElementById("businessNumberCheck");
	const passwordCheck = document.getElementById("passwordCheck");
	const password2Check = document.getElementById("password2Check");

	function validateFiles() {
		usernameCheck.style.display = username.value ? 'inline' : 'none';
		emailCheck.style.display = email.value ? 'inline' : 'none';
		businessNumberCheck.style.display = businessNumber.value ? 'inline' : 'none';

		if (password.value && password.value){
			if (password.value === password2.value) {
				passwordCheck.style.display = 'inline';
				password2Checkstyle.display = 'inline';
			} else {
				passwordCheck.style.display = 'none';
				password2Check.style.display = 'none';
			}
		}else {
			passwordCheck.style.display = 'none';
			password2Check.style.display = 'none';
		}
	}
	username.addEventListener("input" , validateFields);
	email.addEventListener("input" , validateFields);
	businessNumber.addEventListener("input" , validateFields);
	password.addEventListener("input" , validateFields);
	password2.addEventListener("input" , validateFields);
});
app.get('/dashboard', ensureAuthenticated, (req, res) => {
	res.render('dashboard', {user: req.user});
})
//*Purchase bundles*\\
app.post ('/upload-document', ensureAuthenticated, upload.single('document'), (req, res) => {
	const {name, email, details} = req.body; 
	const documentPath = req.file.path;

	res.send('Custom document request received from ${name}');
});


