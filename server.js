import express from 'express';
import { json } from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import { response } from 'express';
import { handleRegister } from './controlers/register';
import { handleSignin } from './controlers/signin';
import { handleProfile } from './controlers/profile';
import { handleImage, handleApiCall } from './controlers/image';
import knex from 'knex';

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

app.use(cors());
app.use(json());



app.get('/', (req, res) => {res.send('it is working');})
app.post ('/signin', (req, res )=> {handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {handleRegister(req ,res, db, bcrypt)})
app.get('/profile/:id', (req, res)=> {handleProfile(req, res, db)} )
app.put('/image', (req,res) => {handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})


