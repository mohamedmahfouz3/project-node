signout = (req, res) => {
  req.session = null;

  res.send({});
};

module.exports = { signout };
