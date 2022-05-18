const express=require('express');
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let employeeList=[];
var employesCollection;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(`mongodb+srv://khushbu:${encodeURIComponent('khushbu#1986')}@cluster0.b7ada.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('employeesData')
    employesCollection = db.collection('employee')
  })   
  .catch(console.error) 

app.get('/employee',function(req,res){
    employesCollection.find().toArray()
    .then(results => {
    res.status(200).json(results)
      console.log(results)
    })
    .catch(error => console.error(error))  
})

app.post('/addEmployee',function(req,res){ 
    employesCollection.insertOne(req.body)
    .then(result => {
     res.status(201).json(result)
    })
    .catch(error => console.error(error))   
})
app.post('/login',function(req,res){
    employesCollection.findOne({email:req.body.email})
    .then(result => {
            res.status(204).json(result);
            })
           .catch(error => console.error(error))    
    })
    
app.put('/updateEmployee/',function(req,res){
    employesCollection.findOneAndUpdate({name:req.body.name},  {
        $set: {
          name: req.body.name,
          email: req.body.email,
          age:req.body.age,
          password:req.body.password,
          department:req.body.department,
        }
      },)
    .then(result => {
     res.status(204).json(result);
      console.log(result)
     })
    .catch(error => console.error(error))
    
})
app.delete('/employee',function(req,res){
    employesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          res.status(200).json(result)
        })
        .catch(error => console.error(error))
})

app.listen(3000, function() {
    console.log('listening on 3000')
  })

module.exports=app;

