var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

app.get("/getusers", (req, res)=>{
    mongoClient.connect(connectionString,(err, clientObj)=>{
        if(!err){
            var database = clientObj.db("reactdb");
            database.collection("tblusers").find({}).toArray((err, documents)=>{
                if(!err) {
                    res.send(documents);
                }
            })
        }
    })
});

app.post("/registeruser",(req, res)=>{
    var userdetails = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Age: parseInt(req.body.Age),
        Mobile: req.body.Mobile,
        Subscribed:(req.body.Subscribed=="true")?true:false
    }
    mongoClient.connect(connectionString,(err, clientObj)=>{
        if(!err){
            var database = clientObj.db("reactdb");
            database.collection("tblusers").insertOne(userdetails,(err, result)=>{
                if(!err){
                    console.log("Record Inserted");
                    res.redirect("/getusers");
                }
            })
        }
    })
});

app.get("/getproducts", (req, res)=> {
    mongoClient.connect(connectionString, (err, clientObj)=> {
        if(!err) {
            var database = clientObj.db("reactdb");
            database.collection("tblproducts").find({}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                }
            })
        }
    })
});
app.get("/getcategories", (req, res)=> {
    mongoClient.connect(connectionString, (err, clientObj)=> {
        if(!err) {
            var database = clientObj.db("reactdb");
            database.collection("tblcategories").find({}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                }
            })
        }
    })
});

app.get("/getproduct/:id", (req, res)=> {
    let productId = parseInt(req.params.id);

    mongoClient.connect(connectionString, (err, clientObj)=> {
        if(!err) {
            var database = clientObj.db("reactdb");
            database.collection("tblproducts").find({id:productId}).toArray((err,documents)=>{
                if(!err) {
                    res.send(documents);
                }
            })
        }
    })
});



app.listen(4000);
console.log("Server Started : http://127.0.0.1:4000");
