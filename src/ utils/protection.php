$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
}
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');