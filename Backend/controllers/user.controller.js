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
  

  export const signin = async (req,res,next)=>{

    try { 
    const {email,password} = req.body;
    console.log("Request Body:", req.body);
     const validUser = await User.findOne({email})
     if(!validUser){
         return next("Not a valid email")
     }
     
     const isPassword = bcrypt.compareSync(password,validUser.password)
     console.log(validUser);
     const {password:pass ,...rest} = validUser._doc
     if(!isPassword){
         return next("Not a valid password")
     }
        res.json({success:true,message:"Login Successful",data:rest})
     
 }catch(err){
    next(err);
}
  }
