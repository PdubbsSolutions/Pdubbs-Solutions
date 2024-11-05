
function togglePriorityTextBox() {
   const select = document.getElementById("priority");
   const textBox = document.getElementById("otherDetailsInput");
   textBox.style.display = select.value === "details" ? "block" : "none";
   }

function toggleBusinessSizeTextBox() {
   const select = document.getElementById("businessSize");
   const textBox = document.getElementById("otherDetailsInput");
   textBox.style.display = select.value === "other-size" ? "block" : "none";
}

function highlightPriorityOptions() {
   const options = document.querySelectorAll('#priority option');
   options.forEach(option => {
      option.style.backgroundColor = 'rgba(209, 224, 191, 1)';
});
}

function removePriorityHighlight() {
   const options = document.querySelectorAll('#priority option');
   options.forEach(option => {
      option.style.backgroundColor = '';
   });
}

function highlightBusinessSizeOptions() {
   const options = document.querySelectorAll('#businessSize option');
   options.forEach(option => {
      option.style.backgroundColor = 'rgba(209, 224, 191, 1)';
   });
}

function removeBusinessSizeHighlight() {
   const options = document.querySelectorAll('#businessSize option');
   options.forEach(option => {
      option.style.backgroundColor = '';
   });
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
   e.preventDefault();
   const name=document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const businessSize = document.getElementById('businessSize').value;
   const priority = document.getElementById('priority').value;
   const message=document.getElementById('message').value;
   const subject = 'New Contact Request - ${priority} Priority';
   const body = `
      Name: ${name}\n
      Email: ${email}\n
      Business Size: ${businessSize}\n
      Priority: ${priority}\n
      Message: ${message}`;

   console.log('Email sent to pdubbssolutions#gmail.com\nSubject: ${subject}\nBody: ${body} ');
   document.getElementById('submittedName').innerText = name;
   document.getElementById('confirmationMessage').style.display = 'block';
   document.getElementById('contactForm').style.display= 'none';
});