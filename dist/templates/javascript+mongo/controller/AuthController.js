
import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import * as bcrypt from 'bcryptjs';
const SECRET = process.JWT_SECRET || "YOUR_KEY";

const RegisterUser = async (req , res) =>{
    const {username , password , email} = req.body;
    const hashed = bcrypt.encodeBase64(password);
    const user = new UserModel({
        username : username ,
        password : hashed ,
        email : email
    });

    try{
        const res_user = await user.save();

        if(res_user){
            return res.status(201).json({
                statusCode : 201,
                message : 'User Signed up successfully'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            statusCode : 500 , 
            err : 'Internal Server Error'
        })
    }
}

const MODULE = {
    RegisterUser ,
}
export default MODULE;

