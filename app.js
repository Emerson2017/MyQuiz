const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();


app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/assets', express.static('assets'));

//Config Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


require('./controllers/authController')(app);

app.get('/', function(req, res){
    res.render('home')         
})

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/register', function(req, res){
    res.render('register')
})

app.post('/loginUser', function(req, res){
    console.log('login')         
})

// app.post('/registerUser', function(req, res){
//     console.log(req.body.email)         
// })


app.listen(3000)