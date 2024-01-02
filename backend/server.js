const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! 🔥 Shutting down...');
  console.log(err);

  process.exit(1);
});

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log('DB successfully connected'));

const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`),
);
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
