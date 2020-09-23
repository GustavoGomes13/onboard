let add = document.querySelector(".submenu a")

let formAddProduct = document.querySelector(".new-product")

add.addEventListener("click", () => {
    formAddProduct.classList.remove("hide");
})

// Maximiza e minimiza tabela de clientes
let tableResults = document.querySelector('table')

let divClick = document.querySelector('.show-table')

divClick.addEventListener("click", () => {
    tableResults.classList.toggle('hide')
})