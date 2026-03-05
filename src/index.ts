import express from 'express';
import type { Express } from 'express';
import userRoute from './routes/userRoute.js';  
import mongoose from 'mongoose';

const app: Express = express();
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('mango connected!'))
  .catch((err) => console.log("there problem", err))

app.use(express.json());
app.use('/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

