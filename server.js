const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const { response } = require('express');
const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require ('./controlers/profile');
const image = require('./controlers/image');
const knex = require('knex');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
  
const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {res.send('it is working');})
app.post ('/signin', (req, res )=> {signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {register.handleRegister(req ,res, db, bcrypt)})
app.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)} )
app.put('/image', (req,res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})


