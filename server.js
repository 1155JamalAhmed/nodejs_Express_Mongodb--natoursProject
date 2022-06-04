const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! Shutting down');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// ** connecting to mongodb
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful...!'));

// ** Environment variables are global variables that are used to define the environment in which
//  ** the node application is running
// console.log('This is the environment: ', app.get('env'));
console.log('Environment: ', process.env.NODE_ENV);

const port = process.env.PORT;

// Start server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting down');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

