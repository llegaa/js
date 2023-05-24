let content
async function getModels() {
    let response = await fetch('http://127.0.0.1:8000/api/v3/models')
    content = await response.json()
    let list = document.getElementById('model')
    if(content){
        for (let arrayKey in content) {
            list.innerHTML+=
                `<tr class="row">
             <td>${content[arrayKey].name_model}</td>
             <td><button class="show" name="${content[arrayKey]._id}">Посмотреть</button></td>
             <td><button class="delete" id="${content[arrayKey]._id}">Удалить</button></td>
             </tr>`
        }}else{list.innerHTML="<tr><td>Моделей нет</td></tr>"
    }
}
getModels();

const table= document.getElementById("table")
const update = document.getElementById("update")
function updTable(){
        let list = document.getElementById('model')
        list.outerHTML = '<table id="model"><caption>Список моделей</caption></table>';
        getModels();
}
update.addEventListener("click", updTable)

let Api
async function sendName(){
    let input = document.querySelector('input');
    let name_user = {
        name: input.value
    }
    let response = await fetch('http://127.0.0.1:8000/api/v3/login', {method: 'POST',headers:{"Content-type":"application/json"}, body: JSON.stringify(name_user)})
    Api = await response.text()
    //console.log(Api)

}

//let model = document.getElementById("model")
document.getElementById("table").addEventListener('click',function(event) {
    let target = event.target;
    if (target.className !== 'delete') return;
    let id = event.target.id;
    if(Api) fetch(`http://127.0.0.1:8000/api/v3/models/${id}`, {method: 'DELETE', headers: {"apikey":`${Api}`}}).then(updTable)
    else{alert("Введите имя")}
})

//console.log(Api)
let name = undefined
document.getElementById("table").addEventListener('click',function(event) {
    let flex_div
    let target = event.target;
    let id = event.target.id;
    if (target.className !== 'show') return;
    if(event.target.name === name){
        flex_div = document.getElementById("flex-div")
        flex_div.outerHTML = '<table id="flex-div"></table>'
        name = undefined
    }else{
        for (let arrayKey in content) {
            console.log(Object.entries(content[arrayKey]))
            if (content[arrayKey]._id === event.target.name){
                name = event.target.name
                flex_div = document.getElementById("flex-div")
                flex_div.outerHTML = `<table id="flex-div"><caption>Модель ${content[arrayKey].name_model}</caption></table>`
                flex_div = document.getElementById("flex-div")
                flex_div.innerHTML += `
            <tr><td>Имя:</td><td>${content[arrayKey].name}</td></tr>
            <tr><td>Имя модели:</td><td>${content[arrayKey].name_model}</td></tr>
            <tr><td>Тип:</td><td>${content[arrayKey].type}</td></tr>
            <tr><td>Модель:</td><td>${content[arrayKey].model}</td></tr>
            <tr><td>Описание:</td><td>${content[arrayKey].description}</td></tr> 
            <tr><td>Комментарии:</td><td>${content[arrayKey].comments}</td></tr>
            <tr><td>Время создания:</td><td>${content[arrayKey].time_create}</td></tr>`
            }
        }
    }
})