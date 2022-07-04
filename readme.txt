Key Points:

************ server.js ***************
1) Environment variables are global variables that are used to define the environment in which the node application is running
        1.1) install dotenv
        1.2) create config.env file
        1.3) dotenv.config({path: './config.env})
        1.4) use it like process.env.DATABASE

2) Catch uncaughtException and unhandledRejection and exit smoothly

*********** app.js ********************
1) Security is that your app should stay stable in case of any threat, to do so we handles some common vulnerabilities.
        1.1) make HTTP headers secure by using helmet
        1.2) use rateLimit for brute force
        1.3) limit body size to your need
        1.4) Data sanitization againts Injection i.e., "email": {"$gt": ""} and XSS
        1.5) Parameter Pollution by hpp

2) AppError is the class for generating our own Errors

3) globalErrorHandler is the errorHandler which runs whenever you run next with some arguement i.e., next(error), it takes error and show different messages in developement and prduction environment 

4) we have used express to create routes and used req, res cycle by express...

5) an all route middle ware is present to handle all other routes than the defined above.

The env vaiables are:

NODE_ENV=development
PORT=3000
USER=
password=

DATABASE=
DATABASE_LOCAL=
DATABASE_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_HOST=
EMAIL_PORT=

EMAIL_FROM=

SENDGRID_USERNAME=
SENDGRID_PASSWORD=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=


THIS WEBSITE IS HOSTED ON:
https://awesomenatrous.herokuapp.com/