
import express from 'express';
import validateExample from '../validator/validateExample';
import { AuthController } from '../controller';
const router = express.Router() ;

const BASE = '/user';

router.get('/' , (req , res) =>{
    return res.status(200).send(`It is Workinggg....`)
})

router.post('/post' , validateExample , AuthController.RegisterUser);

const MODULE = {
    BASE , 
    router
}

export default MODULE;