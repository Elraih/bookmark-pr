
var siteName = document.getElementById("siteName");
var url = document.getElementById("url");

var arr = [];

if(sessionStorage.getItem("obj")!==null){
    arr = JSON.parse(sessionStorage.getItem("obj"));
    display();
}


function addTable(){
    var obj = {
        siteName : siteName.value,
        url : url.value,
    }
    if(siteName.value != "" && url.value != ""){
        arr.push(obj);
        console.log(arr);
        sessionStorage.setItem("obj", JSON.stringify(arr));
        clearForm();
        display();
        window.scrollBy(0, 100)
    }else{
        alert("Can't Submit Empty Form");
    }
        
}

function clearForm(){
    siteName.value = null;
    url.value = null;
}

function display(){
    var box = ``;

    for(var i=0; i < arr.length; i++){
        box += `<tr>
        <th>${i+1}</th>
        <td>${arr[i].url}</td>
        <td><a href="https://${arr[i].url}"target="_blank" ><i class="fa-regular fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteElement(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = box;
}

function deleteElement(element){
    var ans = window.confirm("Are You Sure You Want To Delete");
    if(ans){
        arr.splice(element, 1);
        sessionStorage.setItem("obj", JSON.stringify(arr));
    }  
    display();
}

function checkInput(element){

    var regex = {
        siteName : /^[a-z]|[A-Z]/,
        url : /^www\./,
    }

    if(regex[element.id].test(element.value) == false){
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        console.log(element.id)
        element.nextElementSibling.classList.replace('d-none', 'd-block');
        
        return false;
    }
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace('d-block', 'd-none');
}

function searchInput(element){
    var box = ``;
    for(var i=0; i < arr.length; i++){
        if(arr[i].url.toLowerCase().includes(element.value.toLowerCase())){
            box += `<tr>
            <th>${i+1}</th>
            <td>${arr[i].url}</td>
            <td><a href="#${arr[i].url}" ><i class="fa-regular fa-eye"></i> Visit</a></td>
            <td><button onclick="deleteElement(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = box;
}





