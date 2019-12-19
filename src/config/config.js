module.exports = {
    // teste
    // teste
    port: process.env.PORT || 8081,
    db:{
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
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