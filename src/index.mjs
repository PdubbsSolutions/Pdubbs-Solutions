const express = require('express');
const { createTransport } = require('nodemailer');
const { config } = require('dotenv');
const app = express();

// Load environment variables
config();

// Middleware for parsing JSON body
app.use(express.json());

// Authentication middleware
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).send('Unauthorized');
	}
}

// Route for booking session
app.post('/bookSession', ensureAuthenticated, async (req, res) => {
	const { email, name, date, time } = req.body;

	// Set up the transporter
	let transporter = createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	// Define the mail options
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Session Booking Confirmation',
		text: `Hello ${name},\n\nYour session has been booked for ${date} at ${time}.\n\nThank you!`
	};

	// Send the email
	try {
		await transporter.sendMail(mailOptions);
		res.send('Session booked successfully');
	} catch (error) {
		res.status(500).send('Error booking session');
	}
});

// Route for partnership request
app.post('/requestPartnership', ensureAuthenticated, (req, res) => {
	const { companyName } = req.body;
	if (!companyName) {
		return res.status(400).send('Company name is required');
	}
	res.send(`Partnership request received from ${companyName}`);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

//*Client Side*\\
document.addEventListener("DOMContentLoaded", function () {
	const customRequestForm = document.querySelector("#requestDocument form");
	const bookSessionForm = document.querySelector("#bookSession form");
	const partnershipForm = document.querySelector("#requestPartnership form");

	// Handle form submissions
	if (customRequestForm) {
		customRequestForm.addEventListener("submit", function (event) {
			event.preventDefault();
			// Add your form submission logic here (e.g., AJAX)
		});
	}

	if (bookSessionForm) {
		bookSessionForm.addEventListener("submit", function (event) {
			event.preventDefault();
			// Add your form submission logic here (e.g., AJAX)
		});
	}

	if (partnershipForm) {
		partnershipForm.addEventListener("submit", function (event) {
			event.preventDefault();
			// Add your form submission logic here (e.g., AJAX)
		});
	}

	// Toggle visibility of request sections
	const requestDocument = document.getElementById('requestDocument');
	const requestPartnership = document.getElementById('requestPartnership');
	const requestSession = document.getElementById('requestSession');

	if (requestDocument) requestDocument.classList.toggle('active');
	if (requestPartnership) requestPartnership.classList.toggle('active');
	if (requestSession) requestSession.classList.toggle('active');

	// Update page content dynamically
	const header = document.querySelector('h1');
	if (header) header.textContent = "Pdubbs Solutions";

	// Handle button click
	const button = document.querySelector('button');
	if (button) {
		button.addEventListener('click', () => {
			alert('Button Clicked!');
		});
	}

	// Form validation for name
	const form = document.querySelector('form');
	if (form) {
		form.addEventListener('submit', (e) => {
			const name = document.querySelector('#name').value;
			if (name === "") {
				alert('Name is required');
				e.preventDefault();
			}
		});
	}

	// Fetch example data
	fetch('https://api.example.com/data')
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));

	// Store username in localStorage
	localStorage.setItem('username', 'PDubb Solutions');
	const username = localStorage.getItem('username');
	console.log(username);

	// Debounced scroll event
	function debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}

	window.addEventListener('scroll', debounce(() => {
		console.log('Scrolled!');
	}, 200));

	// Logout functionality
	document.getElementById('logoutButton').addEventListener('click', () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userId');
		window.location.href = 'login.php';
	});
});

//a #hoverable
