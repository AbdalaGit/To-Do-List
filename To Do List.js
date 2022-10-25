
// Select Element
let text = document.querySelector(".text");

let submit = document.querySelector(".submit");

let result = document.querySelector(".result");

let formm = document.querySelector(".form");

let ButtonDeleteAll = document.querySelector(".DeleteAll");

// Create Array
let ArrayBox = [];

window.onload = function(){
  text.focus();
}

if(localStorage.getItem("DataTask")){
  ArrayBox = JSON.parse(localStorage.getItem("DataTask"));
};

GetArrayFromLocalStorage();

submit.onclick = function(){
  // Check If Filed Empty
  if(text.value != ""){
    MianFunctionTask(text.value);
    text.value = "";
  };

  if(ArrayBox.length >= 2){
    ButtonDeleteAll.style.display = "block";
  }else{
    ButtonDeleteAll.style.display = "none";
  }
  text.focus();
};

result.addEventListener('click', (e) =>{
  if(e.target.classList.contains("delete")){
    // Remove Element From Local Storage
    Delete(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }

  if(e.target.classList.contains("task")){
    ToggleComplete(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  };
  if(e.target.classList.contains("textdiv")){
    e.target.classList.toggle("done");
    e.target.innerHTML = "انتهت المهمة";
  }
});

function MianFunctionTask(TextTask){
  // Create Object
  const Task = {
    title: TextTask,
    id: Date.now(),
    complete: false,
  };
  // Add Object To Array
  ArrayBox.push(Task);
  CreateElement(ArrayBox);
  SaveArrayToLocalStorage(ArrayBox);
};

// Create Element And To Page
function CreateElement(CrElement){
  result.innerHTML = "";
  CrElement.forEach((Task) => {
    // Create Element Mark
    let mark = document.createElement("span");
    mark.className = "mark";
    let m = document.createElement("i");
    m.className = 'fa-solid fa-triangle-exclamation';
    mark.appendChild(m);
    // Create Element Div
    let div = document.createElement("div");
    let textdiv = document.createElement("span");
    textdiv.className = "textdiv";
    textdiv.appendChild(document.createTextNode(Task.title));
    div.className = "task";
    if(Task.complete){
      div.className = "task done";
      textdiv.className = "textdiv done";
    };
    div.setAttribute("data-id", Task.id);
    // Create Element Delete
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("مسح"));
    // Append All Element To Div
    result.appendChild(div);
    div.appendChild(mark);
    div.appendChild(textdiv);
    div.appendChild(span);
  });
};

// Save Array To Local Storage , Set And Get
function SaveArrayToLocalStorage(ArrayBox){
  localStorage.setItem("DataTask", JSON.stringify(ArrayBox));
};

function GetArrayFromLocalStorage(){
  let data = localStorage.getItem("DataTask");
  if(data){
    DataTask = JSON.parse(data);
    CreateElement(DataTask)
  };
};

// Delete
function Delete(taskid){
  ArrayBox = ArrayBox.filter((Task) => Task.id != taskid);
  SaveArrayToLocalStorage(ArrayBox);
};

function ToggleComplete(taskid){
  for(let i = 0; i < ArrayBox.length; i++){
    if(ArrayBox[i].id == taskid){
      ArrayBox[i].complete == false ? ArrayBox[i].complete = true : ArrayBox[i].complete = false;
      SaveArrayToLocalStorage(ArrayBox);
    };
  };
};

function DeleteAll(){
    ArrayBox = [];
    result.innerHTML = "";
    SaveArrayToLocalStorage(ArrayBox);
  }