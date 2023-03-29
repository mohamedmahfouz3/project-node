


const signup = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

}

  module.exports = {signup}