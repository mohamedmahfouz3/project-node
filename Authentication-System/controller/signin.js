const jwt = require('jsonwebtoken');
const User = require('../models/users');
const dotenv = require('dotenv');
const BadRequestError = require('../errors/bad-request-error');

const bcrypt = require('bcrypt');

dotenv.config();

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid password ');
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).json({ id: user.id, email: user.email });

};

module.exports = {signin};
