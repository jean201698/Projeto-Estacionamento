const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('./models/Usuario')
const hbs = require('express-handlebars')


//configurações dos pacotes instalados
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
   
}));app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: false}))



// usar Rotas Estáticas
app.use(express.static('public'))

//rotas

app.get('/', (req, res)=>{

    
    
     res.render('cadastroVeiculo')
    
})


app.get('/listagem', (req, res)=>{

    Usuario.findAll().then((dados)=>{
        
        res.render('listagem', {valores: dados.map((dados)=> dados.toJSON())})
      
    })
})


app.post('/editar', (req,  res)=>{
    let id = req.body.id
     Usuario.findByPk(id).then((dados)=>{
        return res.render('editar', {id:dados.id, placa:dados.placa, modelo: dados.modelo})
     })
})


app.post('/cad', (req, res)=>{

    if(!req.body.placa || !req.body.modelo){
        return res.redirect('/')
    }

    Usuario.create({

        placa: req.body.placa,
        modelo: req.body.modelo

    }).then(()=>{
        res.redirect('/')
    })
})


app.post('/del', (req, res)=>{

   Usuario.destroy({
    where: {
        id: req.body.id
    }
   }).then(()=>{
        return res.redirect('/listagem')
   })


})



app.post('/update', (req, res)=>{

    Usuario.update(
        {
         placa: req.body.placa,
         modelo: req.body.modelo
       },
       {
        where: {
          id: req.body.id
        }
       }).then((resultado)=>{
        return res.redirect('/listagem')
       }).catch((err)=>{
        console.log(err);
       })
    




})








app.listen(8080, ()=>{
    console.log('servidor rodando na porta 8080');
})