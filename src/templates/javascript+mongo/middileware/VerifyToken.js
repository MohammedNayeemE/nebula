import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "YOUR_KEY";
const verifyToken = async (req , res , next) =>{
    const auth = req.header('auth_token') || req.cookies['auth_token'];
    if(!auth){
        return res.status(401).json({
            statusCode : 401 , 
            err : 'No token provided'
        });
    }
    const token = auth.split(" ")[1];

    jwt.verify(token , SECRET , (err , decoded) =>{
        if(err){
            return res.status(401).json({
                statusCode : 401 , 
                err : 'Unauthorised Token'
            });
        }
        req.userId = decoded._id;
        next();
    })
}
export default verifyToken;
