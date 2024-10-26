const express =require('express');
const app = express();

app.set('view engine', 'ejs');
app.get('profile', (req, res) =>{
    const user = {
        username: 'johndoe'
    };
    res.render('profile', {user:user});
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
pdubbs-final.web.app;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pdubbs-final.web.app/");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  