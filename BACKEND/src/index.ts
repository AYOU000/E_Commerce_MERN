import dotenv from 'dotenv';
import express from 'express';
import type { Express } from 'express';
import userRoute from './routes/userRoute.js';  
import productRoute from './routes/productRoute.js';
import mongoose from 'mongoose';
import { seedinitialproduct } from './services/Productservice.js';
import cartRoute from './routes/cartRoute.js';
import cors from 'cors';
import orderRoute from './routes/orderRoute.js';

dotenv.config();

const app: Express = express();

app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.DATA_BASEURL || '')
  .then(() => {
    console.log('MongoDB connected!');
    seedinitialproduct(); // Seed after connection is successful
  })
  .catch((err) => console.log("Database connection problem:", err));

app.use('/product', productRoute);
app.use('/users', userRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});