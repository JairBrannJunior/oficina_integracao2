import 'dotenv/config';
import express from 'express';
import logger from './utils/logger';
import { connect } from './database';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, async () => {
  logger.info(`Server running at http://localhost:${process.env.PORT}`);
  await connect();
});
