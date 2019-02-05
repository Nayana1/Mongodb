var express=require('express');
var bodyparser=require('body-parser')

const app=express();

app.use(bodyparser.urlencoded({extended:true}))

var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url="mongodb://127.0.0.1:27017";//should copy this url else error
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("home");
})
app.get("/delEmp",function(req,res){
    mongoclient.connect(url,function(err,database){

        if(err){console.log("Database connection error" +err)
        }
        else{
            var dtb=database.db('sample');
            var empcol=dtb.collection('empl');
            empcol.find().toArray(function(err,tbdata){
                console.log(tbdata)
                if(err){
                res.send("no data");
                }
                else{
                    res.render('empdel',{data:tbdata});
                }
            })  
        }
    }) 
})
app.post("/delete",function(req,res){
    mongoclient.connect(url,function(err,database){
        if(err){console.log("Database connection error" +err)
        }
        else{
            var dtb=database.db('sample');
            var empcol=dtb.collection('empl');
            var condition = {name:req.body.empName}
            console.log(condition)
            empcol.remove(condition,function(err,tbdata){
                console.log(tbdata)
                if(err){
                res.send("no data");
                }
                else{
                    res.render('empdel',{data:tbdata});
                }
            })  
        }
    }) 
})
app.get("/insert",function(req,res){
   mongoclient.connect(url,function(err,database)
   {
       var dtb=database.db('sample');
    var col=dtb.collection("empl");
    var data={name:req.body.empid,salary:req.body.salary}
   col.insert(data,function(err,rslt){
        if(err){
            res.send("some things went wrong")
        }
        else{
            res.send("data inserted successfully")}
    })
})
})
app.get("/view",function(req,res){      

mongoclient.connect(url,function(err,database){

    if(err){console.log("Database connection error" +err)}
    else{
    var dtb=database.db('sample');
    var empcol=dtb.collection('empl');
    empcol.find().toArray(function(err,tbdata){
        console.log(tbdata)
        if(err){
        res.send("no data");
               }
        else{
            res.render('empview',{data:tbdata});
            }
     })  
        }
    }) 
})   
    app.listen(8000,function(req,res){
        console.log("server started listening")
    })
