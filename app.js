const express = require('express');
const morgan = require('morgan');

// ** import for security purposes
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
/** ----------------------------- **/

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ** make HTTP headers secure
app.use(helmet());

// ** set limit on request from same IP -> brute force handled
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

//  middlewares
// ** development logging
if (process.env.NODE_ENV === 'development') {
  // ** morgan is used to console information about the request
  app.use(morgan('dev'));
}

// ** here express.json is the middleware which is a function that can modify incomming request data
// ** here it is used to have access to body of the request
// ** body parser
app.use(
  express.json({
    limit: '10kb',
  })
);

// ** Data sanitization 
// ** 1) ->  NoSQL query injection handled
app.use(mongoSanitize());

// ** 2) -> XSS handled 
app.use(xss());

// ** prevent parameter pollution (same paramter with different value ?sort=duration&sort=price)
app.use(
  hpp({
    // ** List of properties which can have multiple values
    whiteList: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// ** It is for static file routing
app.use(express.static(`${__dirname}/public`));

// ** a middleware to connect date to the incommming request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// ** all other routes than the defined above will lead to this error route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
