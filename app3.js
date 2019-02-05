var express=require('express');
const app=express();


app.get('/',function(req,res){

})
app.get('/books',function(req,res){
    res.render("addbooks")
})




app.listen(8001,function(req,res){
    console.log("server started listening")
})
