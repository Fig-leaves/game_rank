var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'rank'
});

app.get('/rank', function (req, res) {
     connection.query('select * from rank order by score asc limit 20', function (err, rows) {
          console.log(rows)
          res.json(rows)
     });
});

app.get('/list', function(req, res) {
    connection.query('select * from rank ', function (err, rows) {
          console.log(rows)
          console.log(err)
          res.json(rows)
    });
})

app.get('/remove', function(req, res) {
    connection.query('delete from rank where id = ?', req.query.id , function (err, rows) {
        console.log(err)
        res.json("success")
    });
})

app.get('/insert', function(req, res) {
    if(req.query.name == undefined || req.query.score == undefined) {
        res.json("failed")
    }
    var post  = {name: req.query.name, score: req.query.score};
    var query = connection.query('INSERT INTO rank SET ?', post, function(err, result) {
        console.log(err)
        console.log(result)
        res.json("success")
    });
})

app.listen(5000);
