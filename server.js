var express = require('express');

var app = express();

var mysql = require('mysql');

app.use(express.urlencoded());
app.use(express.json());

var con = mysql.createConnection({
    
    host:'localhost',
    user:'root',
    password:'root',
    database:'new_schema'
});

var server = app.listen(4545,function(){
    var host = server.address().address
    var port = server.address().port
})
con.connect(function(err){
    if (err) throw err;
    console.log('Connected!');
    
})
app.get('/users',function(req,res){

    var sql = 'SELECT * FROM users';
    con.query(sql,function(err,rows,fields){
        if (err) throw err;
        console.log(rows);
        res.send(rows);//Passasa
    })
})
app.post('/register',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    var sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    con.query(sql,[username,password],function(err,rows,fields){
        if (err) throw err;
        if(rows.length >0)
        {
            res.send('User' + username +' already registered!');
        }else{
            var register = 'INSERT INTO users(username,password) VALUES ?'
            con.query(register,[username,password],function(err,result,fields){
                if(err) throw err;
                res.send('success');
            })

        }
    })
})