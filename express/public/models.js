async function getResponse() {
    let response = await fetch('http://127.0.0.1:8000/api/v3/models')
    let content = await response.json()
    content = content.splice(0, 10)

    let list = document.getElementById('model')

    for (let arrayKey in content) {
        list.innerHTML+=
            `<tr><td>${content[arrayKey].name_model}</td><td>Томаты свежие</td><td>кг</td><td>15,20</td><td>69,00</td><td>1048,80</td></tr>`
    }
}
function getResponse1(){
    document.getElementById('model').innerHTML += 'ggggggggg'
}

