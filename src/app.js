require('dotenv').config();

const express = require ("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const {sequelize} = require("./models")
const Sequelize = require("sequelize")
const config = require("./config/config")
const morgan = require("morgan")




const app = express();
app.use (morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())



//Rotas
    require("./routes")(app)

sequelize.sync({force:false}).then(()=>{
    app.listen(config.port)
    console.log("deu certo?")
})


        
   


