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
    app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
    console.log("deu certo?")
})


        
   


