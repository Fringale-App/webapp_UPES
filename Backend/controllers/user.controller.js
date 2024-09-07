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
      
      if (!password || !name) {
        return res.status(400).json({ msg: "All Fields are required", status: false });
      }
      
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10); // Ensure password is a string
  
      // Create a new user
      const user = await User.create({
        email,
        name,
        password: hashedPassword,
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
     // Location update after successful login
     const { latitude, longitude } = req.body;
     if (latitude && longitude) {
         validUser.location = { latitude, longitude };
         await validUser.save();
     }
        res.json({success:true,message:"Login Successful",data:rest})
     
 }catch(err){
    next(err);
}
  }

  export const updateLocation = async (req, res, next) => {
    try {
      const { userId, latitude, longitude } = req.body;
  
      if (!latitude || !longitude) {
        return res.status(400).json({ success: false, message: "Latitude and longitude are required." });
      }
  
      // Find the user by their ID and update their location
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      user.location = { latitude, longitude };
      await user.save();
  
      // Send success response
      res.status(200).json({ success: true, message: "Location updated successfully." });
    } catch (error) {
      next(error);
    }
  };
  
