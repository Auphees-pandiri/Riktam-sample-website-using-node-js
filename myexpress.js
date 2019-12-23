var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = 3000;
var app = express();
var mysql = require('mysql');
var url = require('url');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'contactdb'
});

con.connect((err)=>{
    if (!err){
        console.log('Db connection succeeded');
        /*var sql = "INSERT INTO contact(name,email,message) VALUES ('sandy', 'sandy@gmail.com','hello riktam')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

        con.query("DELETE FROM contact where name='qdata.name'",function(err,result){
            if(err) throw err;
            console.log("number of deleted records"+result.affectedRows);
        });

        con.query("UPDATE contact SET message='hiiiiii riktam technologies' where name='kiran'",function(err,result){
            if(err) throw err;
            console.log(result.affectedRows+"records updated.");
        });

        con.query("SELECT * FROM contact ORDER BY name", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            console.log(result[0].email);
          });*/
    }
    else{
        console.log('db connection failed\n error:'+ JSON.stringify(err,undefined,2));
    }

});
  
app.get('/employees', (req, res) => {
    var q = url.parse(req.url, true);
    var qdata = q.query; 
    console.log(qdata.name);
    console.log(qdata.Email);
    console.log(qdata.message);
    con.query("INSERT INTO contact(name,email,message) VALUES (?,?,?)",[qdata.name,qdata.Email,qdata.message],(err, result, fields) => {
        if (!err){
            console.log("1 row inserted");
            res.send("Your message is received and we will contact you soon");
        }
        else
            console.log(err);
    })
});

/*
const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        false.readFile(
            path.join(__dirname,'public','index.html'),(err,content)=>{
                if(err) throw err;
                res.writeHead(200,{'Content-Type':'text/html'})
                res.end(content);
            }
        );
    }
});

const PORT=process.env.PORT || 5000;
server.listen(PORT,()=> console.log('server running on port ${PORT}'));*/



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


/*
app.set('view engine','twig');
app.set('views','./public/views')
app.get('/',(req,res)=>{
    res.render('index',{title:"hello",message:'hello riktam'});
})
*/

app.use(express.static(path.join(__dirname,'public')));

app.listen(port);
console.log('server startes on port'+port);
module.exports = app;
