//const conn = require('./server.js')
//conn.query('SELECT * FROM products')

const add = document.getElementById('addButton')
let qty = 0

add.addEventListener('click', () => {
    qty++
    let value = parseFloat(document.getElementById('price').innerHTML)
    let totalItem = value * qty
    console.log(totalItem)

    document.getElementById('totalLabel').innerHTML = totalItem
})