import { use } from "react";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// Placing order using COD
const placeOrder = async (req,res) => {
    try {
        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            address,
            // date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// Placing order using Stripe method
const placeOrderStripe = async (req,res) => {}

// Placing order using Razorpay Method
const placeOrderRazorpay = async (req,res) => {}

// All orders data for Admin Panel
const allorders = async (req,res) => {}

// User Order data for Frontend
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// Update order status from Admin Panel
const updateStatus = async (req,res) => {}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allorders,userOrders,updateStatus}