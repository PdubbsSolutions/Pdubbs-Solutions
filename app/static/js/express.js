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