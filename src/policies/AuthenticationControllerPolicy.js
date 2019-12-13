const Joi = require("joi")

module.exports = {
    register (req,res, next){
        const schema ={
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,30}$')
            )
        }

        const {error, value} = Joi.validate(req.body, schema)

        if(error){
            switch (error.details[0].context.key){
                case "email":
                    res.status(400).send({
                        error: "coloque um email válido"
                    })
                    break
                case "password":
                    res.status(400).send({
                        error: `Senha não válida,
                        <br> 1. tenha no mínimo 6 caracteres e no maximo 30
                        `
                    })                  
                    break
                default:
                        res.status(400).send({
                            error: `Deu erro
                            `
                        })  
            }
        }else{
            next()
        }
        
    }
}