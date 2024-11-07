import { body, validationResult } from 'express-validator';
const PORT = 3000;

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
const firebaseConfig = require(newFunction());
function newFunction() {
	return './firebaseConfig.js';
}

