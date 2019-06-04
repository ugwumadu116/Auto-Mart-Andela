import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './routes/user.route';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3001;
const prefix = '/api/v1';

app.get('/', (req, res) => {
  res.status(200).send('welcome to Auto-Mart');
});

app.use(`${prefix}/`, userRouter);

app.listen(PORT, () => console.log(`Welcome ${PORT}`));

export default app;
