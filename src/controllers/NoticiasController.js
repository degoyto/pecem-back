const {Noticia} = require('../models')
const Sequelize = require("sequelize")

module.exports = {
  async index (req, res) {
    try {
      
      const noticia = await Noticia.findAll({
        
      })
      res.send(noticia)
      
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async principais (req, res) {
    try {
      console.log(req.params.total)
      const total = parseInt(req.params.total)
      const noticia = await Noticia.findAll({
        limit: total,
        order: [['createdAt', 'DESC']],
        where:{
          destaque:1

        }
      })
      res.send(noticia)
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async principais2 (req, res) {
    try {
      console.log(req.params.exceto)
      const exceto = parseInt(req.params.exceto)
      const Op = Sequelize.Op;
      const noticia = await Noticia.findAll({
        limit: 3,
        
        where:{
          id:{[Op.ne]:exceto},
          destaque:1
        },
        order: [['createdAt', 'DESC']],
      })
      res.send(noticia)
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async novas (req, res) {
    try {
      console.log(req.params.total)
      const total = parseInt(req.params.total) 
      const noticia = await Noticia.findAll({
        limit: total,
        order: [['createdAt', 'DESC']]
      })
      res.send(noticia)  
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async filtro (req, res) {
    try {
      const Op = Sequelize.Op;
      const nome = req.params.nome
      if (nome=="noticias"){
        const noticia = await Noticia.findAll({
          where: {
            [Op.or]: [{tipo: 'internacionais'}, {tipo: 'nacionais'}]
          },
          order: [['createdAt', 'DESC']]
        })
        res.send(noticia)  
      }
      else{
        const noticia = await Noticia.findAll({
          where: {
            tipo: nome
          },
          order: [['createdAt', 'DESC']]
        })
        res.send(noticia)  
      }
      
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async resultado (req, res) {
    try {
      const Op = Sequelize.Op;
      var nome = `%${req.params.nome}%`;
      
      console.log(nome)
        const noticia = await Noticia.findAll({
          where: {
            title: {
              [Op.like]: nome
            }
          },
          order: [['createdAt', 'DESC']]
        })
        console.log(noticia)
        res.send(noticia)   
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  async outras (req, res) {
    try {
      const Op = Sequelize.Op;
      
      const exceto = parseInt(req.params.exceto) 
      const noticia = await Noticia.findAll({
        limit: 5,
        order: [
          Sequelize.fn( 'RAND' ),
        ],
        where:{
          id:{[Op.ne]:exceto} 
          
        }
      })
      
      res.send(noticia)  
    } catch (err) {
      res.status(500).send({
        error: "Erro get"
      })
    }
  },
  
  async show (req, res) {
    try {
      const noticia = await Noticia.findByPk(req.params.noticiaId)
      res.send(noticia)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },
  async post (req, res) {
    try {
      const noticia = await Noticia.create(req.body)
      res.send(noticia)
      
    } catch (err) {
      res.status(500).send({
        error: "Erro post"
      })
    }},
    async put (req, res) {
      try {
        await Noticia.update(req.body, {
          where: {
            id: req.params.noticiaId
          }
        })
        res.send(req.body)
      } catch (err) {
        res.status(500).send({
          error: 'an error has occured trying to update the song'
        })
      }
    }
  }