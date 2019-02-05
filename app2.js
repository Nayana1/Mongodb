var express=require('express');
var bodyparser=require('body-parser')
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url="mongodb://127.0.0.1:27017";
const app = express();
app.use(bodyparser.urlencoded({extended:true}))


app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home2")
})
app.get("/add",function(req,res){
    res.render("add2")
})

app.post("/actionPage",function(req,res){
    var name = req.body.field1;
    var password = req.body.field2;
    var insertData = {userName:name,userPassword:password}
    mongoclient.connect(url,function(err,database){
        var dtb=database.db('sample');
        var empcol=dtb.collection('users');
        empcol.insert(insertData,function(err,successResult){
            if(err){
                res.send("Not insert")
            }
            else{
                res.send("Inserted")
            }
        })
    })

})
app.get("/view",function(req,res){
    mongoclient.connect(url,function(err,database){
        if(err){console.log("Database connection error" +err)}
        else{
            var dtb=database.db('sample');
    var empcol=dtb.collection('users');
    empcol.find().toArray(function(err,tbdata){
        console.log(tbdata)
        if(err){
        res.send("no data");
               }
        else{
            res.render('empview2',{data:tbdata});
            }
     })  
        }
    }) 
})

    app.get("/edit",function(req,res){
    mongoclient.connect(url,function(err,database){
        if(err){console.log("Not abl to edit" +err)}
        else{
            var dtb=database.db('sample');
    var empcol=dtb.collection('users');
    empcol.find().toArray(function(err,tbdata){
        console.log(tbdata)
        if(err){
        res.send("no data");
               }
        else{
            res.render('edit2',{data:tbdata});
            }
     })  
        }
    }) 
})
app.get("/update2",function(req,res){
    mongoclient.connect(url,function(err,database){
        if(err){console.log("Not abl to update" +err)}
        else{
            var dtb=database.db('sample');
    var empcol=dtb.collection('users');
    empcol.find().toArray(function(err,tbdata){
        console.log(tbdata)
        if(err){
        res.send("no data");
               }
        else{
            res.render('update2',{data:tbdata});
            }
     })  
        }
    }) 
})

app.listen(8000,function(req,res){
    console.log("server started listening")
})