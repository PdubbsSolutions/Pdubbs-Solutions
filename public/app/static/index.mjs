
app.get("/dashboard", ensureAuthenticated, (_req, res) => {
	res.render(join(__dirname, 'public', 'app', 'index.html'));
});

app.set("view engine", "ejs");
app.use(express.static(publicDir));
app.get('/dashboard', (_req, res) => {
	res.render(join(publicDir, 'app', 'index.html'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
});

document.addEventListener("DOMContentLoaded", function () {
   const customRequestForm = document.querySelector("#custom-request form");
	const sessionForm = document.querySelector("#book-session form");
	const partnershipForm = document.querySelector("#partnership form");

	// Handle custom request submission
	customRequestForm.addEventListener("submit", function (event) {
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

	// Handle session booking submission
	sessionForm.addEventListener("submit", function (event) {
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

	// Handle partnership request submission
	partnershipForm.addEventListener("submit", function (event) {
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
//*firebase*\\
import firebase from "firebaseapp";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAwwveYRqdPTsnLosZJzR8L-jk8DjzwvLo",
	authDomain: "pdubbs-final.firebaseapp.com",
	databaseURL: "https://pdubbs-final-default-rtdb.firebaseio.com",
	projectId: "pdubbs-final",
	storageBucket: "pdubbs-final.appspot.com",
	messagingSenderId: "980654735004",
	appId: "1:980654735004:web:9346cd6edee1080d203759",
};
if (!firebase.apps.length){
	firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
const database = database(app);

//*forms*\\
document.addEventListener("DOMContentLoaded", function () {
	const customRequestForm = document.querySelector("#custom-request form");
	const sessionForm = document.querySelector("#book-session form");
	const partnershipForm = document.querySelector("#partnership form");

	customRequestForm.addEventListener("submit", function (event) {
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
});

const header = document.querySelector('h1');
header.textContent ="New Heading";

document.querySelector('button').addEventListener('click', () => {
	alert('Button Clicked!');
});

document.querySelector('form').addEventListener('submit', (e) => {
	const name = document.querySelector('#name').value;
	if (name === " "){
		alert('Name is required');
		e.preventDefault();
	}
});
//*fetchData*\\
fetch('https://api.example.com/data')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error ('Error:', error));

localStorage.setItem('username', 'PDubb Solutions');
const username = localStorage.getItem('username');
console.log(username);

function debounce(func, delay){
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}
window.AbortController.addEventListener('scroll', debounce(() => {
	console.log('Scrolled!');
}, 200));

async function fetchData() {
	try{ 
		const repsonse = await fetch('https://api.example.com/data');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}
//*zoom*\\
app.post('/book-session', ensureAuthenticated, async (req, res) => {
	const { email, name, date, time } = req.body;
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass:process.env.EMAIL_PASS
		}
	});
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Zoom 1:1 Session Booking',
		text: 'Thank you ${name}, you have booked a session for ${date} at ${time}.'
	};
	transporter.sendMail(mailOptions, (error, _info) => {
		if (error) {
			return res.status(500).send('Error booking session');
		}
		res.send('Session booked successfully');
	});
});
app.post('/request-partnership', ensureAuthenticated, (req, res) => {
	const {companyName, email, phoneNmber, message} = req.body;
	res.send('Partnership request received from ${companyName}' );
});

document.addEventListener("DOMContentLoaded", function(){
	const navbar = documenr.getElementByID("navbar");
	navbar.innerHTML = `
	<a href="/dashboard" class="home-button">Home</a>`
});

const PORT = process.env.PORT || 5001;
app.listen(5001, () => {
    console.log("Server running on port 5001");
});
document.addEventListener("DOMContentLoaded", function() {
   const links = document.querySelectorAll("a");
   if (window.location.pathname.includes("accessibility")) {
       links.forEach(link => link.classList.add("accessibility-link"));
   } else {
       links.forEach(link => link.classList.remove("accessibility-link"));
   }
});
document.addEventListener("DOMContentLoaded", function() {
   const navbar = document.getElementById("navbar");
   navbar.innerHTML = `
       <a href="/public\app\index.html" class="home-button">Home</a>
   `;
});

function goBackOrDashboard() {
    if (userWantsDashboard) {
        window.location.href = '/public\app\index.html'; 
    } else {
        window.history.back();
    }
}
function toggleTextarea() {
	var sessionOptions = document.getElementById("sessionOptions");
	var recurringTextarea = document.getElementById("recurringTextarea");
	if (sessionOptions.value === "recurring") {
		 recurringTextarea.style.display = "block";
	} else {
		 recurringTextarea.style.display = "none";
	}
}

function toggleFilterItems(toggleElement) {
	const filterItem = toggleElement.nextElementSibling; // Get the next sibling (the .filter-item)

	if (filterItem.style.display === 'none' || filterItem.style.display === '') {
		 filterItem.style.display = 'block'; // Show the filter items
	} else {
		 filterItem.style.display = 'none'; // Hide the filter items
	}
}

// Ensure filter items are hidden on page load
window.onload = function() {
	const filterItems = document.querySelectorAll('.filter-item');
	filterItems.forEach(item => {
		 item.style.display = 'none'; // Set all filter items to hidden
	});
};




