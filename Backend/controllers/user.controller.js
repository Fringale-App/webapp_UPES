const User = require('../models/user.model');

module.exports.register = async (req, res, next) => {
    try {
      const { name, email, password,type } = req.body;    
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        name,
        password: hashedPassword,
        type,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };
