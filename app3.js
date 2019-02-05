var express=require('express');
var bodyparser=require('body-parser')
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url="mongodb://127.0.0.1:27017";
const app=express();
app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine","ejs");
app.get('/',function(req,res){

})
app.get('/books',function(req,res){
    res.render("addbooks")
})
app.post("/actionPage",function(req,res){
    var BookID = req.body.field1;
    var Bname = req.body.field2;
    var Bauthor = req.body.field3;
    var Bpublisher = req.body.field4;
    var Bprice = req.body.field5;

    var insertData = {BookId:BookID,Bookname:Bname,Bookauthor:Bauthor,Bookpublisher:Bpublisher,Bookprice:Bprice}
    mongoclient.connect(url,function(err,database){
        var dtb=database.db('sample');
        var empcol=dtb.collection('Books');
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
    var empcol=dtb.collection('Books');
    empcol.find().toArray(function(err,tbdata){
        console.log(tbdata)
        if(err){
        res.send("no data");
               }
        else{
            res.render('Bookview',{data:tbdata});
            }
     })  
        }
    }) 
})


app.listen(1234,function(req,res){
    console.log("server started listening")
})
