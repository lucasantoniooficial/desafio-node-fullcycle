const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const connection = mysql.createConnection(config)

connection.query("CREATE TABLE IF NOT EXISTS peoples(id int not null auto_increment,name varchar(500),PRIMARY KEY(id))");

app.get('/', (_, res) => {
    const sql = "SELECT * FROM peoples";

    connection.query(sql, (_, rows) => {
        
        res.render('index', {
            peoples: rows
        })
    })
})

app.get('/peoples/create', (req, res) => {
    res.render('create')
})

app.post('/peoples', (req, res) => {
    const { name } = req.body

    connection.query(`INSERT INTO peoples (name) VALUEs ('${name}')`, (error) => {
        if(error) throw error
    })

    return res.redirect('/')
})

app.listen(3000, () => {
    console.log('Rodando na porta: 3000')
})