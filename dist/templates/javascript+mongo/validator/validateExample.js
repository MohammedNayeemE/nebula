
const validateExample = async (req , res , next) =>{

    const {text} = req.body;
    if(!text || typeof text !=='string' || text.trim().length === 0){
        return res.status(401).json({
            statusCode : 401 , 
            err : 'Invalid Parameters'
        });
    }
    next();
}
export default validateExample;