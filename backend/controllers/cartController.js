import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Add products to user cart
const addToCart = async (req,res) => {
    // console.log('user id',userId);
    try {
        const {itemId, userId, size} = req.body;
        const userData = await userModel.findById(userId);
        // console.log('user data',userData);
        let cartData = await userData.cartData; 

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        } else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        } 

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true,message:"Item added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// update user cart
const updateCart = async (req,res) => {
    const token = req.headers.token;
    // console.log(token);
    const userId = jwt.decode(token).id;
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId,{cartData});
        res.json({success:true,message:"Cart updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// get user cart data
const getUserCart = async (req,res) => {
    try {
        const {userId} = req.body;

        const userData = await userModel.findById(userId);
        // console.log(userId);
        
        let cartData = await userData.cartData;
        // console.log(cartData);
        
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


export {addToCart, updateCart, getUserCart}