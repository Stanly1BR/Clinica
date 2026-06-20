import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import router from './controllers/index.controller.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});