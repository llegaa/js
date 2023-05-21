async function getResponse() {
    let response = await fetch('http://127.0.0.1:8000/api/v3/models')
    let content = await response.json()
    console.log(await content)

    let list = document.getElementById('model')

    for (let arrayKey in content) {
        list.innerHTML+=
            `<tr><td>${content[arrayKey].name_model}</td></tr>`
    }
}
function getResponse1(){
    document.getElementById('model').innerHTML += 'ggggggggg'
}

