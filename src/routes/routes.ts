import express from 'express';
import authRoutes from './features/authRoutes';
import feedRoutes from './features/feedRoutes';
import followRoutes from './features/followRoutes';
import likeRoutes from './features/likeRoutes';
import replyRoutes from './features/replyRoutes';
import userRoutes from './features/userRoutes';

const app = express();

app.use('/auth', authRoutes);
app.use('/feeds', feedRoutes);
app.use('/follows', followRoutes);
app.use('/replies', replyRoutes);
app.use('/likes', likeRoutes);
app.use('/users', userRoutes);

export const router = app;
