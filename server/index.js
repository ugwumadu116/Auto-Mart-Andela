import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import userRouter from './routes/user.route';
import carRouter from './routes/cars.route';
import orderRouter from './routes/orders.route';
import kabinetRouter from './routes/kabinet.route';

const app = express();
dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;
const prefix = '/api/v1';

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  data: 'welcome to Auto-Mart',
}));

app.use(`${prefix}/`, userRouter);
app.use(`${prefix}/`, kabinetRouter);
app.use(`${prefix}/car`, carRouter);
app.use(`${prefix}/order`, orderRouter);

app.use(async (req, res) => {
  try {
    throw new Error('Route does not exist');
  } catch (error) {
    return res.status(error.status || 404).json({
      status: error.status || 404,
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Welcome ${PORT}`));

export default app;
