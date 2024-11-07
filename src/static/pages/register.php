<!DOCTYPE php>
<php style="overflow: hidden;" lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    <link rel="stylesheet" type="text/css" href="/public/app/static/styles.css" />
    <title>Pdubbs Solutions | Registration</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
</head>
<body>
    <header>
        <img style="z-index: -999; position: relative; top: 5px; max-width: 200px; padding: 0; display: block; margin: 0 auto; cursor: pointer; max-height: 200px; top: 25px;" src="/public/app/static/images/Pdubbs-Logo.jpg" alt="logo" class="logo" onclick="goHome()" />
        <h1 style="text-align: center; position: inherit;" id="register">Registration</h1>
    </header>
    <section class="registation">
      <p style="text-align: center;">Already have an account? <a href="/public\app\static\pages\login.php" id="login" >Login here</a></p><br>
      <div class="register">
         <div >
            <% if (errors && errors.length > 0) { %>
                <ul>
                    <% errors.forEach(error => { %>
                        <li style="color: olivedrab;"> <% = error.msg %> </li>
                    <% }) %>
                </ul>
            <% } %>      
         </div> 
        <form id="registrationForm" action="/register" method="POST"> 
         <input type="text" name="username" value="" id="username" placeholder="Username"/>
         <span id="usernameCheck" class="checkmark"  style="display:none;">✔️</span>
         <input type="email" name="email" id="email" value="" placeholder="Email Address" required/> 
         <span id="emailCheck" class="checkmark" style="display:none;">✔️</span>              
            <input type="tel" name="phoneNumber" id="businessNumber" placeholder="Business Number" autocomplete="tel" value="" required>
            <span id="businessNumberCheck" class="checkmark"style="display:none;">✔️</span> 
            <input type="password" id="password" name="password" placeholder="Create a Password" required>
            <span id="passwordCheck" class="checkmark" style="display:none;">✔️</span>
            <input type="password" id="password2" name="password2" placeholder="Confirm Password" required>
            <span id="password2Check" class="checkmark" style="display:none;">✔️</span>
            <button  type="submit" onclick=>Register</button>
        </form>
        <script>
           document.getElementById('registrationForm').addEventListener('submit', function(event) {
           window.location.href= '/login.ejs';
           });
        </script>
      </div>
    </section>
    <footer><br>
      <div style="display: inline; margin-top: 0px; text-decoration: none;"  class="auth-buttons"><a href="/public\app\static\pages\login.php">Login</a> | <a href="public\app\static\pages\register.php">Register</a> | <a href="/public\app\static\pages\contact.php">Contact</a> | <a href="/public\app\static\pages\cart.php">Cart</a></div><br>
      <div class="ref-buttons">
         <a style="font-size: 12px; text-decoration: none; color:#aaafb2;" href="termsandconditions.php">Terms and Conditions</a> | <a style="font-size: 12px; text-decoration: none; color:#aaafb2;" href="accessibility.php">Accessibility</a> | <a style="font-size: 12px; text-decoration: none; color:#aaafb2;" href="sources">Sources</a>
      </div>
   </div>
      <span style="display:inline; margin-top: 20px;" >Pdubbs Solutions |  Administrative & Project Management Services</span><br>
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;"></div>
      <img style="position: absolute; max-width: 100px; padding: 0; max-height: 100px; margin-top: -20px; cursor: pointer;  z-index: -999; align-self: center; left: 400px; position:absolute;" src="/public/app/static/images/Pdubbs-Logo.jpg" alt="logo" class="logo" id="footer-logo" onclick="goHome()" />
   </footer>
   <script type="text/javascript" src="/public\app\static\index.mjs"></script>
   <script type="text/javascript" src="/src\app.mjs"></script>
   <script type="text/javascript" src="/public/app/static/js/express.mjs"></script>

</body>
</php>
