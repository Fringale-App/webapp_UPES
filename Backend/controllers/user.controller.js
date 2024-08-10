import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const register = async (req, res, next) => {
    try {
      const { name, email, password, type } = req.body;
    //   console.log("Request Body:", req.body);
  
      // Check if email is already used
      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.json({ msg: "Email already used", status: false });
      }
      
      if (!password || !name||!type) {
        return res.status(400).json({ msg: "All Fields are required", status: false });
      }
      
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10); // Ensure password is a string
  
      // Create a new user
      const user = await User.create({
        email,
        name,
        password: hashedPassword,
        type: type || 'customer', // Default type to 'customer' if not provided
      });
  
      // Log user to ensure the object is correct
    //   console.log(user);
  
      // Return success response
      return res.json({ status: true, message: "User Created Successfully" });
    } catch (ex) {
      next(ex);
    }
  };
  

export const signin = async (req, res, next) => {
    try {
      const { name,email,type } = req.body;
      const user = await User.findOne({ email });
      //checking for  user type
      
      if (!user)
        return res.json({ msg: "Incorrect name or email", status: false });
       
      if(user.type !== type){
            return res.json({ msg: `You don't have ${type} access `, status: false });
        }

      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  }