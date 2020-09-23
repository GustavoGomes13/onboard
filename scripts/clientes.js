// recebe o botão
let add = document.querySelector('.submenu a')

// recebe o fieldset
let formAddClient = document.querySelector('.new-client')

add.addEventListener("click", () => {
    formAddClient.classList.remove('hide')
})

// Maximiza e minimiza tabela de clientes
let tableResults = document.querySelector('table')

let divClick = document.querySelector('.show-table')

divClick.addEventListener("click", () => {
    tableResults.classList.toggle('hide')
})

// Validação dos inputs
/*
function onlyLetters() {
    let key = event.keyCode
    if(key > 47 && key < 58){
        alert('Nome deve conter apenas letras')
        event.preventDefault()
    }
}

function onlyNumbers() {
    let keyLetters = event.keyCode
    if(keyLetters > 31 && keyLetters < 57) {
        alert('O campo deve ser preenchido apenas com números')
        event.preventDefault()
    }
}
*/