import Restaurant from "../models/restaurant.model.js"

export const registerRes = async (req,res,next)=>{
    try{
    const resta = await Restaurant.create(req.body)
    res.status(201).json(resta)
    }catch(err){
        next(err)
    }
}