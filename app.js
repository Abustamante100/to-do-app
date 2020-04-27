function onReady(){
  const addToDoForm = document.getElementById('addToDoForm');
  let toDos = [];
  let id = 0;

  function createNewToDo(){
    const newToDoText = document.getElementById('newToDoText');
    if(!newToDoText.value){ return; }
    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++;

    newToDoText.value = '';
    renderTheUI();
  }

  function renderTheUI(){
    const toDoList = document.getElementById('toDoList');
    toDoList.textContent = '';

     toDos.forEach(function(toDo){
        const newLi = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        let toDos_serialized = JSON.stringify(toDos);

        checkbox.addEventListener('change', (event) => {
           if(checkbox.checked) {
            localStorage.setItem("storedToDos", toDos_serialized);
            console.log (localStorage);
            }
         })

         function getToDos () {
           let toDos_deserialized = JSON.parse(localStorage.getItem ('storedToDos'));
           if (toDos_deserialized !== null) {
             location.reload;
           }
         };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete!";

        deleteBtn.addEventListener('click', event => {
         toDos = toDos.filter(function(item){
           return item.id !== toDo.id;
         })

         renderTheUI();
        });

        newLi.textContent = toDo.title;

        toDoList.appendChild(newLi);
        newLi.appendChild(checkbox);
        newLi.appendChild(deleteBtn);
     })
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

window.onload = function() {
  onReady();
};
