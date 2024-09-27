import express from 'express';
import mongoose from 'mongoose';
import app from './app';
import config from 'config';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = express();

server.use(app);

server.listen(port, () => {
  console.log(` 🔥 [ ready ] Listening on port:${port}`);
});

mongoose.connect(config.get('mongodb'));

mongoose.connection.on('error', (error) => {
  console.log(
    `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});
