import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './utils/logger';
import { connect } from './database';
import usersRoutes from './routes/users.routes';
import podcastsRoutes from './routes/podcasts.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use('/users', usersRoutes);
app.use('/podcasts', podcastsRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, async () => {
  logger.info(`Server running at http://localhost:${process.env.PORT}`);
  await connect();
});
