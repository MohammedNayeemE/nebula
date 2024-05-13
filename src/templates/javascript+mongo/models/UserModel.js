import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema({
    username :{
        type : String ,
        required : true ,
        trim : true ,
        minlength : 4 ,
        maxlength : 255
    },
    email :{
        type : String ,
        required : true ,
        unique : true ,
        trim : true ,
        minlength : 4 , 
        maxlength : 255
    },
    password : {
        type : String ,
        unique : true ,
        trim : true ,
        minlength : 4 , 
        maxlength : 255       
    },
    date : {
        type : Date , 
        default : Date.now()
    }
});

const UserModel = mongoose.model('User' , UserSchema);

export default UserModel;
