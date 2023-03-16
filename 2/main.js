const modal = document.getElementById("myModal")
const button = document.getElementById("myButton")
const span = document.getElementsByClassName("close")[0]
const show_pass = document.getElementById("show_pass")


function onFormSubmit(event){
    event.preventDefault();``
    const form = event.currentTarget
    
    const inputs = form.querySelectorAll("input[required]")

    const formData = new FormData(form)
    console.table({
        "Email": formData.get("email"),
        "Пароль": formData.get("password")
    })
}


function onInputBlur(event) {
    const input = event.currentTarget;
    const validState = input.validity;

    let errorMessage = "";
    if(validState.valueMissing) {
        errorMessage = "Поле не заполнено";
    }
    else if (validState.tooShort) {
        errorMessage = `Минимальная длина ${input.minLength} символов`;
    }
    else if (validState.typeMismatch) {
        errorMessage = "Неправильный формат ввода почты пример: example@mail.ru";
    }
    else if (validState.valid) {
        errorMessage = "";
    }

    input.setCustomValidity(errorMessage);


    const wrapper = input.closest("li");
    const errorMsgElem = wrapper.querySelector(".error");

    errorMsgElem.textContent = errorMessage;
}


function showPass() {
    const pass = document.getElementById("password")
    if (pass.type === "text"){
        pass.type = "password"
    }else{
        pass.type = "text"
    }
}

button.onclick = function() {
    modal.style.display = "block"
}

span.onclick = function() {
    modal.style.display = "none"
}

show_pass.addEventListener("pointerdown", showPass)
show_pass.addEventListener("pointerup", showPass)

const form = document.getElementById("registerModal")
form.addEventListener("submit", onFormSubmit)
form.querySelectorAll("input[required]").forEach(input => {
    input.addEventListener("blur", onInputBlur)
})

window.onclick = function(event){
if(event.target == modal){
modal.style.display= "none";
}
}

