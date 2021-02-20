const express=require('express')
const mysql=require('mysql')
const bcrypt=require('bcrypt')
const router=express.Router()



//database configuration

     const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'yourdatabasename'    //create your mysql database and place its name hapo qwa quotes
      })
      connection.connect(()=>{
          console.log('Database connected...')
      })




router.get('/user',(req,res)=>{
    res.render('/user')
})

//handle everything to with admin sign in
router.post('/signin',(req,res)=>{
    //get the values from the form
    const {email,password}=req.body

    //query the database for this particular person if they exist
    connection.query('SELECT password FROM yourdatabasename WHERE email=?',[email], async function(err,result){
        if(err){
            console.log(err)
             return res.sendStatus(500)
        }
        else if(result.length<=0){
            console.log('Invalid email')
           return res.status(404).send({
               ErrorMessage:'Invalid email'
           })
        }else{
        const isValid=await bcrypt.compare(req.body.password,result[0].password)
       
        if(isValid){
            console.log('Logged in successful!')
            res.redirect('/admin/dashboard')
        }
        else{
            console.log('Invalid Password!')
         res.redirect('./signup')
        } 
        } 
            })  
    
})

router.get('/addproperty',(req,res)=>{
    res.render('addproperty')
})


//handles everything to do with user signup
router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.post('/signup',(req,res)=>{
    const {username,email,phone,password,confirm_password}=req.body;
    //if passwords do not match redirect him or her to the same page to reenter the values
    if(password !== confirm_password){
        console.log('Password mismatch')
        res.redirect('./signup')
    }
    //if validation passes then show the dashboard
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
             if(err){
                 console.log(err)
             }else{
                
            var userdata={username,email,phone,password:hash}
            //console.log(hash);
           connection.query('INSERT INTO yourtablename SET ?',userdata,function(err,result){
             if(err){
                 console.log(err)
             }
             else{
                   console.log('Data insertion  sucessful')
             }
         }) 
    
             }
            });
        });
        res.redirect('/admin/dashboard')
    }
})

module.exports=router