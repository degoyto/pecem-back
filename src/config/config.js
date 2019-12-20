module.exports = {
    // teste
    
    port: process.env.PORT,
    db:{
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: GIGANTE1@ff1 ,
        options:{ 
            dialect: process.env.DIALECT,
            host: process.env.HOST,
            storage:".tabtracker.sql"
        }
    },
    authentication :{
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}  
