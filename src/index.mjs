const express = require('express');
const { static: static_, urlencoded, json } = express;
const { join: _join } = require('path');
const multer = require('multer');
const { createTransport } = require('nodemailer');
const flash = require('connect-flash');
const session = require('express-session');
const { config } = require('dotenv');
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
config();

const firebaseConfig = {
	apiKey: "AIzaSyAwwveYRqdPTsnLosZJzR8L-jk8DjzwvLo",
	authDomain: "pdubbs-final.firebaseapp.com",
	databaseURL: "https://pdubbs-final-default-rtdb.firebaseio.com",
	projectId: "pdubbs-final",
	storageBucket: "pdubbs-final.firebasestorage.app",
	messagingSenderId: "980654735004",
	appId: "1:980654735004:web:14e135cb19c59fa3203759"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
const app = express();
const database = firebase.firestore();


document.addEventListener("DOMContentLoaded", function () {
	const customRequestForm = document.querySelector("#requestDocument form");
	const bookSessionForm = document.querySelector("#bookSession form");
	const partnershipForm = document.querySelector("#requestPartnership form");


	if (customRequestForm) {
		customRequestForm.addEventListener("submit", function (event) {
			event.preventDefault();

		});
	}

	if (bookSessionForm) {
		bookSessionForm.addEventListener("submit", function (event) {
			event.preventDefault();
		});
	}

	if (partnershipForm) {
		partnershipForm.addEventListener("submit", function (event) {
			event.preventDefault();
		});
	}
});

function toggleForm(requestDocumentForm) { 
	const requestDocument = document.getElementById(requestDocument)
}
function toggleForm(requestPartnershipForm){
	const requestPartnership = document.getElementById(requestPartnership)
}

function toggleForm(bookSessionForm){
	const requestSession = document.getElementById(requestSession)
}

function toggleTextarea(){
	const sessionOptions = document.getElementById("sessionOptions");
}
	customRequestForm.addEventListener("submit", function (event) {
		event.preventDefault();
		const formData = new FormData(customRequestForm);
		const data = Object.fromEntries(formData.entries());
		firebase.firestore().collection("customRequests").add(data)
			.then(() => {
				alert("Custom request submitted successfully!");
				customRequestForm.reset();
			})
			.catch((error) => {
				console.error("Error submitting custom request:", error);
			});
	});

const header = document.querySelector('h1');
header.textContent = "New Heading";

document.querySelector('button').addEventListener('click', () => {
	alert('Button Clicked!');
});

document.querySelector('form').addEventListener('submit', (e) => {
	const name = document.querySelector('#name').value;
	if (name === "") {
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
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}

window.addEventListener('scroll', debounce(() => {
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

app.post('/bookSession', ensureAuthenticated, async (req, res) => {
	const { email, name, date, time } = req.body;
	let transporter = createTransport({
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
		text: `Thank you ${name}, you have booked a session for ${date} at ${time}.`
	};
	transporter.sendMail(mailOptions, (error, _info) => {
		if (error) {
			return res.status(500).send('Error booking session');
		}
		res.send('Session booked successfully');
	});
});

app.post('/requestPartnership', ensureAuthenticated, (req, res) => {
	const { companyName, email, phoneNumber, message } = req.body;
	res.send(`Partnership request received from ${companyName}`);
});

document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = `<a href="/dashboard" class="home-button">Home</a>`;
});

document.addEventListener("DOMContentLoaded", function () {
	const links = document.querySelectorAll("a");
	if (window.location.pathname.includes("accessibility")) {
		links.forEach(link => link.classList.add("accessibility-link"));
	} else {
		links.forEach(link => link.classList.remove("accessibility-link"));
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.getElementById("navbar");
	navbar.innerHTML = `<a href="/public/app/index.html" class="home-button">Home</a>`;
});

function goBackOrDashboard() {
	if (userWantsDashboard) {
		window.location.href = "/public/index.html";
	} else {
		window.history.back();
	}
}

function toggleTextarea() {
	const sessionOptions = document.getElementById("sessionOptions");
	const recurringTextarea = document.getElementById("recurringTextarea");
	if (sessionOptions.value === "recurring") {
		recurringTextarea.style.display = "block";
	} else {
		recurringTextarea.style.display = "none";
	}
}

function toggleFilterItems(toggleElement) {
	const filterItem = toggleElement.nextElementSibling;
	if (filterItem.style.display === 'none' || filterItem.style.display === '') {
		filterItem.style.display = 'block';
	} else {
		filterItem.style.display = 'none';
	}
}

window.onload = function () {
	const filterItems = document.querySelectorAll('.filter-item');
	filterItems.forEach(item => {
		item.style.display = 'none';
	});
};


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
