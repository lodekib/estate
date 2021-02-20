const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const app=express()
const PORT= 5002

//set up ejs view engine
//app.use(expressLayouts)
app.set('views','views')
app.set('view engine','ejs')

app.use(express.static(__dirname +'/public'))


//configure express to use the bodyparser
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())


//routes
app.use('/',require('./routes/index'))
app.use('/admin',require('./routes/admin'))
app.use('/user',require('./routes/user'))

app.listen(PORT,()=>{
    console.log('Server is up and running...')
})




