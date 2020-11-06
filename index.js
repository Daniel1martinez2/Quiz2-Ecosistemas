const text = document.querySelector('.textTask'); 
const send = document.querySelector('.send'); 
//task
const toDo = document.querySelector('.todoTask'); 
const doing = document.querySelector('.doingTask');     
const done = document.querySelector('.doneTask'); 
const database = firebase.database(); 
//date stuff
var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm+'/'+dd+'/'+yyyy;
//--->



send.addEventListener('click', ()=>{
    let reference = database.ref('Quiz/Tareas').push(); 
    let taskCurrent = {id:reference.key,description: text.value, state: 'todo',date:today}
    reference.set(taskCurrent);  
    text.value = ''; 
}); 

database.ref('Quiz/Tareas').on('value',data=>{

    toDo.innerHTML = '';
    doing.innerHTML = '';
    done.innerHTML = '';

    data.forEach(
       


        element => {
        let task =  new Task(element.val()); 
         switch(element.val().state){
            case 'todo':
                toDo.appendChild(task.render())
            break; 
            case 'doing': 
                doing.appendChild(task.render())
            break; 
            case 'done': 
                done.appendChild(task.render())
            break; 
         }
             
    });
});