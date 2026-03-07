import express from 'express';
import type { Express } from 'express';
import userRoute from './routes/userRoute.js';  
import productRoute from './routes/productRoute.js';
import mongoose from 'mongoose';
import { seedinitialproduct } from './services/Productservice.js';

const app: Express = express();
const PORT = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('mango connected!'))
  .catch((err) => console.log("there problem", err))

seedinitialproduct()
app.use(express.json());
app.use('/product',productRoute)
app.use('/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

