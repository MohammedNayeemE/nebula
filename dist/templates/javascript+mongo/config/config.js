
const config ={
    env : process.env.NODE_ENV || 'dev',
    port : process.env.PORT || 6969 ,
    jwtsecret : process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
    mongouri : process.env.MONGODB_URI ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (
        process.env.MONGO_PORT || '27017'
    ) + '/db_name'
}

export default config;