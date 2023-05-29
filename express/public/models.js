
let content=[]
async function getModels() {
    let response = await fetch('http://127.0.0.1:8000/api/v3/models')
    content = await response.json()
    let list = document.getElementById('model')
    if(content.length){
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
let inputName
async function sendName(){
    inputName = document.querySelector('input').value;
    let name_user = {
        name: inputName
    }
    if(inputName){
    let response = await fetch('http://127.0.0.1:8000/api/v3/login', {method: 'POST',headers:{"Content-type":"application/json"}, body: JSON.stringify(name_user)})
        document.getElementById("add").removeAttribute("disabled")
        let notify = document.getElementById("notify")
    Api = await response.text()
    console.log(Api)
    notify.outerHTML = "<label for \"name\" style=\"color: #006400\">Имя введено</label>"
    }
}

//let model = document.getElementById("model")
document.getElementById("table").addEventListener('click',function(event) {
    let target = event.target;
    if (target.className !== 'delete') return;
    let id = event.target.id;
    if(Api) {fetch(`http://127.0.0.1:8000/api/v3/models/${id}`, {method: 'DELETE', headers: {"apikey":`${Api}`}}).then(updTable)}
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
            if (content[arrayKey]._id === event.target.name){
                name = event.target.name
                flex_div = document.getElementById("flex-div")
                flex_div.outerHTML = `<div id="flex-div"><table id="flex-div"><caption>Модель ${content[arrayKey].name_model}</caption> <tr><td>Имя:</td><td>${content[arrayKey].name}</td></tr>
            <tr><td>Имя модели:</td><td>${content[arrayKey].name_model}</td></tr>
            <tr><td>Тип:</td><td id="typTable" >${content[arrayKey].type}</td></tr>
            <tr><td>Цвет:</td><td id="colTable">${content[arrayKey].color}</tdid></tr>
            <tr><td>Размер:</td><td id="sizTable">${content[arrayKey].size}</tdid></tr>
            <tr><td>Описание:</td><td>${content[arrayKey].descriptions}</td></tr> 
            <tr><td>Комментарии:</td><td>${content[arrayKey].comments}</td></tr>
            <tr><td>Время создания:</td><td>${content[arrayKey].time_create}</td></tr></table>
            <div id="can-wrap"></div></div>`
             }
        }
    }
})
document.getElementById("add").addEventListener('click',()=>{
    let add = document.getElementById("addMod")
         add.innerHTML+=`<div id="formdiv">
    <form id="form">
    <p>Добавление модели</p>
    <ul>
    <li><select id="selectType">
    <option value="cube">Куб</option>
    <option value="sphere">Сфера</option>
    <option value="pyramid">Пирамида</option>
    </select></li>
    <li><input id="color" type="color"></li>
    <li><input type="number" id="size" min="1" max="10" placeholder="Размер модели" required></li>
    <li><input id="name_model" type="text" placeholder="Имя модели" required></li>
    <li><textarea id="descriptions" placeholder="Описание" required></textarea></li>
    <li><textarea  id="comments" placeholder="Комментарий" required></textarea></li>
    </ul>
    <span><button id="submit">Отправить модель</button>
    <button id="vie" type="button">Посмотеть модель</button></span>
    </form>
    <div id="hCan"></div>
    </div>`
    document.getElementById("add").setAttribute('disabled', "")
    document.getElementById("form").scrollIntoView({block: "center", behavior: "smooth"})
})

document.getElementById("addMod").addEventListener('click',async (event)=>{
    if(event.target.id !== "submit") return 0
    else{
        let typeGeometry = document.getElementById("selectType").value
        let colorGeometry = document.getElementById("color").value
        let nameGeometry = document.getElementById("name_model").value
        let descriptionsGeometry = document.getElementById("descriptions").value
        let commentsGeometry = document.getElementById("comments").value
        let sizeGeometry = document.getElementById("size").value
        let newModel = {
            name:inputName,
            name_model:nameGeometry,
            type:typeGeometry,
            color:colorGeometry,
            size:sizeGeometry,
            descriptions:descriptionsGeometry,
            comments:commentsGeometry

         }
         await fetch('http://127.0.0.1:8000/api/v3/models', {
                method: 'POST',
                headers: {"apikey": `${Api}`, "Content-type": "application/json"},
                body: JSON.stringify(newModel)
            })
            this.outerHTML = "<div id=\"addMod\"></div>"
            document.getElementById("submit").type = "submit"

    }
})
