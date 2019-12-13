
module.exports = (sequelize, DataTypes) => {
  const Noticia = sequelize.define('Noticia', {
    title:DataTypes.STRING,
    conteudo: DataTypes.TEXT,
    resumo: DataTypes.TEXT,
    fotoUrl: DataTypes.STRING,
    legenda: DataTypes.STRING,
    tipo: DataTypes.STRING,
    autor: DataTypes.STRING,
    destaque:DataTypes.BOOLEAN
    
    })

  

 

  return Noticia
}


