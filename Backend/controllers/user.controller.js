import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const updateUser = async (req,res,next)=>{
  if(req.user.id !== req.params.id) return next(401,"not the correct token")

  try{
      if(req.body.password){
          req.body.password = bcrypt.hashSync(req.body.password,10)
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
          $set:{
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              avatar:req.body.avatar,
          }
      },{new:true})

      const {password,...rest} = updatedUser._doc
      res.status(200).json(rest)
  }catch(err){
      next(err)
  }
 

}

export const deleteUser = async (req,res,next)=>{

    
  if(req.user.id !== req.params.id) return next()
  try{

  await User.findByIdAndDelete(req.params.id)
  res.clearCookie('access_token')
  res.status(200).json("User deleted Successfully")
  }catch(err){
      next(err)
  }
}

export const signup = async (req, res, next) => {
  try {
      const { name, email, password } = req.body;

      console.log("Request Body:", req.body); // For debugging

      // Check if all fields are provided
      if (!name || !email || !password) {
          return res.status(400).json({ msg: "All fields are required", status: false });
      }

      // Check if email is already in use
      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
          return res.status(400).json({ msg: "Email already used", status: false });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10); // Ensure password is a string

      // Create a new user
      const user = await User.create({
          email,
          name,
          password: hashedPassword,
      });

      // Return success response with status 201 (created)
      return res.status(201).json({ status: true, message: "User Created Successfully" });

  } catch (ex) {
      // Handle errors
      console.error("Error during user signup:", ex); // For debugging
      return res.status(500).json({ status: false, msg: "Server error, please try again later" });
  }
};

  

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Validate password
    const isPassword = bcrypt.compareSync(password, validUser.password);
    if (!isPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Remove the password from the response object
    const { password: pass, ...rest } = validUser._doc;

    // Generate token
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET);

    // Set token as HTTP-only cookie
    res.cookie('access_token', token, { 
      httpOnly: true, 
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Send user data in response (excluding password)
    res.status(200).json({
      success: true,
      user: rest
    });

  } catch (err) {
    console.error("Error in signin:", err);
    next(err);
  }
};
  export const google = async (req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.SECRET)
            const {password:pass ,...rest} = user._doc
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
        
        }else{
            const {name,email,avatar} = req.body;
            const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(generatedPassword,10)
            const newUser = new User({name,email,password:hashedPassword ,avatar:avatar})
        
            await newUser.save()
            const token = jwt.sign({id:newUser._id},process.env.SECRET)
            const {password:pass,...rest} = newUser._doc
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
        
        }      
    }catch(err){
        next(err)
    }
    
}
  

  export const updateLocation = async (req, res, next) => {
    try {
      const { userId, latitude, longitude } = req.body;
  
      console.log('Request Body:', req.body);  // Log request body for debugging
  
      if (!latitude || !longitude || !userId) {
        console.log("No lattitudes",latitude,longitude,userId)
        return res.status(400).json({ success: false, message: "Latitude, longitude and Id are required." });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        console.log("user not found ", userId)
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      user.location = { latitude, longitude };
      const updatedUser = await user.save();
      console.log("updated user",updatedUser)
      // console.log('Updated User:', updatedUser);  // Log updated user for debugging
  
      res.status(200).json({ success: true, message: "Location updated successfully." });
    } catch (error) {
      console.error('Update Location Error:', error);  // Log any error
      next(error);
    }
  };

  export const signOut = (req,res,next)=>{
    try{
        res.clearCookie('access_token')
        res.status(200).json("User Sign Out Successfully")
    }catch(err){
        next(err)
    }
}
  
  
  
