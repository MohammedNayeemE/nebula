import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDb } from '../config/connect';
import { errorHandler } from '../middileware/Errorhandler';
import { UserRoute } from '../router';
dotenv.config();

const app = express() ;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 6969 ;

app.use('/' , (req , res) =>{
    res.send('working and truly alive');
})

app.use(UserRoute.BASE , UserRoute.router);

app.use(errorHandler) ;

const isConnected = await connectToDb();
if(isConnected){
    app.listen(PORT , () =>{
    console.log(`Server is running at ${PORT}`);
})

}
export default app;