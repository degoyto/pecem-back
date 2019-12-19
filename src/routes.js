const AuthenticationController = require("./controllers/AuthenticationController")
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy")
const NoticiasController = require("./controllers/NoticiasController")
const multerConfig = require ("./config/multerConfig")
const multer = require("multer")


module.exports = (app) =>{
    app.post("/register", AuthenticationControllerPolicy.register,
    AuthenticationController.register)

    app.post('/login',
    AuthenticationController.login)

    app.get('/gnoticias',
    NoticiasController.index)
    
    app.get('/principais/:total',
    NoticiasController.principais)

    app.get('/principais2/:exceto',
    NoticiasController.principais2)

    app.get('/novas/:total',
    NoticiasController.novas)

    app.get('/filtro/:nome',
    NoticiasController.filtro)
// teste
    app.get('/resultado/:nome',
    NoticiasController.resultado)

    app.get('/outras/:exceto',
    NoticiasController.outras)

    app.get('/noticia/:noticiaId', 
    NoticiasController.show)

    app.put('/noticia/:noticiaId',
    NoticiasController.put)

    app.post('/gnoticias', 
    NoticiasController.post)

    app.post("/up", multer(multerConfig).single("file"), async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;
      
        
      
        return res.send(url);
      });
    
   


    
}