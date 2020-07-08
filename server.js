const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-elliptical-80249',
        user : 'postgres',
        password : 'test',
        database : 'face-recognition'
    }
});

db.select('*').from('users').then(data =>{
    console.log(data);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('WORKING!!')})
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image', (req,res)=>{ image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{ image.handleAPICall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log("Running on port ${process.env.PORT}")
})


// root --> Working 
//signin -- POST  success/fail
//register --> POST {user}
//profile/:userid --> GET = user
//image --> PUT --> user