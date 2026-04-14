import dotevn from 'dotenv';
import express from 'express';
import type { Express } from 'express';
import userRoute from './routes/userRoute.js';  
import productRoute from './routes/productRoute.js';
import mongoose from 'mongoose';
import { seedinitialproduct } from './services/Productservice.js';
import cartRoute from './routes/cartRoute.js';
import cors from 'cors';
import orderRoute from './routes/orderRoute.js';
dotevn.config();
const app: Express = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
mongoose.connect(process.env.DATA_BASEURL || '')
  .then(() => console.log('mango connected!'))
  .catch((err) => console.log("there problem", err))

seedinitialproduct()
app.use('/product',productRoute)
app.use('/users', userRoute);
app.use('/cart',cartRoute);
app.use('/order',orderRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

