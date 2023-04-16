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
const signout = require('./routes/signout');

const create_user = require('./routes/create_user');
const delete_all_users = require('./routes/delete_all_users');
const delete_user = require('./routes/delete_user');
const show_all_users = require('./routes/show_all_users');
const show_user = require('./routes/show_user');
const update_user = require('./routes/update_user');

app.use(signin);
app.use(signup);
app.use(signout);

app.use(create_user);
app.use(delete_all_users);
app.use(delete_user);
app.use(show_all_users);
app.use(show_user);
app.use(update_user);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports = app;
