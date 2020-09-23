const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const handlebars = require("express-handlebars")
const app = express()
//const insertCliente = require("./scripts/db/clientes.js") -- TENTAR DPS

// Conexão com o banco
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "onboard",
    port: 3306
})

conn.connect((error) => {
    if(error) {
        console.log('Problema na conexão com o banco ' + error)
    } else {
        console.log('Conectado')
    }
})

// setando handlebars como template engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Definindo rotas para CSS e scripts
app.use("/css", express.static('css'))
app.use("/scripts", express.static('scripts'))
app.use("/img", express.static('img'))

// Definindo rotas
app.get('/', (req, res) => {
    res.render('index')
})

// CLIENTES
app.get('/clientes', (req, res) => {
    conn.query("SELECT * FROM client;", (err, rows) => {
        if(err) throw err
        res.render('clientes', {clients: rows})
    })
})

// INSERT
app.post('/controllerForm', (req, res) => {
    conn.query("insert into client values (?,?,?,?,?)", 
    [null, req.body.nome, req.body.cpf, req.body.endereco, req.body.telefone])
    res.redirect("clientes")
    // adicionar tratamento
})

// UPDATE
app.get('/edit-client/:clientId', (req, res) => {
    const id = req.params.clientId
    conn.query(`SELECT * FROM client WHERE id = ${id};`, (err, result) => {
        if(err) throw err
        res.render('edit-client', { client: result[0] })
    })
})

app.post('/update-client', (req, res) => {
    conn.query(`
    UPDATE client
    SET name="${req.body.nome}", cpf="${req.body.cpf}", address="${req.body.endereco}", phone_number="${req.body.telefone}"
    WHERE id="${req.body.id}";
    `)
    res.redirect('clientes')
})

app.get('/delete-client/:clientId', (req, res) => {
    const id = req.params.clientId
    try {
        conn.query(`DELETE FROM client WHERE id = ${id};`, (result) => {
            res.redirect('/clientes')
        })
    } catch (error) {

    }
})
/********************************************/

// PRODUTOS
app.get('/produtos', async (req, res) => {

    const queryProduct = `SELECT p.id, p.name, p.provider, p.price, p.id_product_category, pc.name AS pcName FROM product AS p
    JOIN product_category AS pc
    ON p.id_product_category = pc.id;`
    const queryProductCategory = `SELECT * FROM product_category`

    conn.query(queryProduct, (err, rows) => {
        if(err) throw err
        conn.query(queryProductCategory, (err2, rows2) => {
            if(err2) throw err2
            res.render('produtos', { products: rows, product_category: rows2 })
        })
    })
})

// INSERT
app.post('/add-product', (req, res) => {
    conn.query("INSERT INTO product VALUES (?,?,?,?,?)",
    [null, req.body.name, req.body.provider, req.body.price, req.body.type])
    res.redirect('produtos')
})

// UPDATE
app.get('/edit-product/:productId', (req, res) => {

    const queryProductCategory = `SELECT * FROM product_category`

    const id = req.params.productId
    conn.query(`SELECT * FROM product WHERE id = ${id};`, (err, result) => {
        if(err) throw err
        conn.query(queryProductCategory, (err, resultProductCategory) => {
            if(err) throw (err)
            res.render('edit-product', { product: result[0], product_category: resultProductCategory })
        })
    })
})

app.post('/update-product', (req, res) => {
    conn.query(`
    UPDATE product
    SET name="${req.body.name}", provider="${req.body.provider}", price="${req.body.price}", id_product_category="${req.body.type}"
    WHERE id="${req.body.id}";
    `)
    res.redirect('produtos')
})

// DELETE
app.get('/delete-product/:productId', (req, res) => {
    const id = req.params.productId
    try {
        conn.query(`DELETE FROM product WHERE id = ${id};`, (result) => {
            res.redirect('produtos')
        })
    } catch (error) {

    }
})

/**********************************/
// COMANDAS
app.get('/comandas', (req, res) => {
    res.render('comandas')
})

// INSERT
const clients = "SELECT name FROM client;"
const products = "SELECT name, price FROM product;"

app.get('/new-order', (req, res) => {
    conn.query(clients, (err, clientsList) => {
        if(err) throw err
        conn.query(products, (err2, productsList) => {
            if(err) throw (err)
            res.render('new-order', {client: clientsList, product: productsList})
        })
    })
})



/**********************************/

// CADASTRO DE CATEGORIAS DOS PRODUTOS
app.get('/configuracoes', (req, res) => {
    res.render('configuracoes')
})

app.post('/add-product-category', (req, res) => {
    conn.query("INSERT INTO product_category VALUES (?,?)", 
    [null, req.body.name])
    res.redirect('configuracoes')
})

// Iniciar o servidor
app.listen(3000, (req, res) => {
    console.log('Servidor inciado')
})


exports.conn = conn