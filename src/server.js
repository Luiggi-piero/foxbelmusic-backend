import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router.js'
import musicRouter from './routes/music.router.js';
import { dbconnect } from './config/database.config.js';

dbconnect();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rutas
app.use('/api/v1/users', userRouter);
app.use('/api/v1/music', musicRouter);

app.listen(3000);
console.log('✅ Server on port', 3000);


/* 
  npm i express-async-handler
  npm i mongoose
  npm i dotenv
  npm i bcryptjs
  npm i jsonwebtoken
*/