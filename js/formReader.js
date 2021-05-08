//Variables
const form = document.querySelector("#loginForm");

let photographerDB = [
    ["Stephen","Trigg","34561602","!Password1"],
    ["Frederick","Riley","68793971","pae9aX7sh@"],
    ["Herman","Barnett","12347386","raeNgu0ru!"],
    ["Ido","Tanne","00000001","!Password1"],
    ["Jammie","Karaval","00134286","#8008135Pp"],
    ["Rupert","Burrock","00695014","@CoolBeans12"]
]

//Event Listeners

//Submit Button Event Listener
form.addEventListener('submit', function (event){
    let formResult = new formData(form);
    const regExpList = [/^[A-Za-z,.'-]+$/g,
        /^[A-Za-z,.'-]+$/g,
        /^[0-9]{8,}$/g,
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,10}$/g,
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g];
    const emailRegExp = /^([\w\.\-]+)@([\w\-]+){3,5}((\.(\w){2,3})+)$/g;

    let formValidity = formResult.validateData(regExpList);
    let formVerification = formResult.verifyInfo(photographerDB);
    let formEmailValidation = formResult.emailValidate(formResult.data[6], formResult.data[5], emailRegExp);

    restartAlert()

    if(formEmailValidation === false || formValidity === false  || formVerification === false){
        event.preventDefault();
        event.stopPropagation();
            if(formValidity === false || formEmailValidation === false){
                $("#regExFail").fadeIn();
                return false;
            }
            if(formVerification === false){
                $("#userNotFound").fadeIn();
                return false;
            }
    }

    $("#logInSuccess").fadeIn();
    document.getElementById("logInSuccessMsg").textContent = "Hello "+formResult.data[0].value+" "+formResult.data[1].value+"! You're going to "+formResult.data[(formResult.data.length-1)].value.toLowerCase()+".";

    event.preventDefault();
    event.stopPropagation();
});

//Reset Button Event Listener
form.addEventListener('reset', function (event){
    let formResult = new formData(form);
    formResult.resetValidity();
    restartAlert()
});

// Classes and Functions

class formData{
    constructor(form){
        this.form = form;
        this.data = [];
        for (let i of this.form){
            if(i.type === "checkbox"){
               this.data.push(i);
            } else if(i.type === "submit" || i.type === "reset"){
                //Do nothing
            } else {
                this.data.push(i);
            }
        }
    }

    getData(){
        return this.data;
    }

    emailValidate(checkBox, emailInput, emailRegEx){
        if(checkBox.checked === true){
            if(emailRegEx.test(emailInput.value)){
                if(emailInput.classList.contains("is-invalid")) {
                    emailInput.classList.remove("is-invalid")
                }
                emailInput.classList.add("is-valid");
                return true;
            } else {
                emailInput.classList.add("is-invalid");
                emailInput.setCustomValidity("patternMismatch");
                return false;
            }
        } else {
            if(emailInput.classList.contains("is-invalid")) {
                emailInput.classList.remove("is-invalid")
            }
            if(emailInput.classList.contains("is-valid")) {
                emailInput.classList.remove("is-valid")
            }
        }
    }

    validateData(regExpList){
        let status = true;
        let data = this.data
        regExpList.forEach(function (item, index, array){
            if(item.test(data[index].value) === false){
                data[index].classList.add("is-invalid");
                data[index].setCustomValidity("patternMismatch");
                status = false
            } else {
                if(data[index].classList.contains("is-invalid")) {
                    data[index].classList.remove("is-invalid")
                }
                data[index].classList.add("is-valid")
            }
        })
        return status;
    }

    resetValidity(){
        let data = this.data;
        data.forEach(function (item, index, array){
            item.classList.remove("is-invalid");
            item.classList.remove("is-valid");
        })
    }

    verifyInfo(array){
        let data = []
        let status = false;
        for(var i = 0; i <= 3; i++){
            data.push(this.data[i].value)
        }
        array.forEach(function (item, index, array){
            if(arraysEqual(data, item)){
                status = true;
                return false;
            }
        })
        return status;
    }

}

function arraysEqual(array1, array2) {
    if (array1 === array2) return true;
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;

    for (var i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}

function restartAlert(){
    $('.alert').hide();
}