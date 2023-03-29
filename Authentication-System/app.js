const express = require('express');
require('express-async-errors');
const cookieSession = require('cookie-session');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost3000', 'http://localhost3001'],
  })
);

app.use(cookieParser());
app.use(
  cookieSession({
    name: 'sessionIdCookie',
    secret: 'thisshouldbeasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true, // cookie is only accessible over HTTP, requires HTTPS
    },
  })
);

const signin = require('./routes/signin');
const signup = require('./routes/signup');

app.use(signin);
app.use(signup);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
