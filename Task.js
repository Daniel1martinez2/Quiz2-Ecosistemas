class Task{
    constructor(task){
        this.task = task; 
    }
    database = firebase.database(); 
    

    render=()=>{


        let reference = database.ref('Quiz/Tareas/'+this.task.id); 
        var taskCurrent ; 
        let component = document.createElement('div'); 
        component.classList.add('task'); 
        component.innerText = this.task.description; 
        //------> other elements
        let dateElem = document.createElement('p'); 
        dateElem.innerText = this.task.date; 
        console.log(this.task.date); 
        dateElem.classList.add('dateCurrent'); 

        let deleteButton = document.createElement('button'); 
        deleteButton.innerText = 'X'; 
        deleteButton.classList.add('delete');

        var update = document.createElement('button'); 
        update.classList.add('update'); 
        update.innerText = '>'; 

        var reverse = document.createElement('button'); 
        reverse.classList.add('reverse'); 
        reverse.innerText = '<'; 

 
        component.appendChild(deleteButton); 
        component.appendChild(update); 
        component.appendChild(reverse); 
        component.appendChild(dateElem); 

        //------> buttons events
        deleteButton.addEventListener('click',()=>{
            taskCurrent= null; 
            reference.set(taskCurrent);  
        }); 
        update.addEventListener('click',()=>{
            if(this.task.state=='todo'){
                taskCurrent= {id:this.task.id,description: this.task.description, state: 'doing',date:this.task.date}
            }else if(this.task.state=='doing'){
                taskCurrent= {id:this.task.id,description: this.task.description, state: 'done',date:this.task.date}
            }
            reference.set(taskCurrent);  
        }); 

        reverse.addEventListener('click',()=>{
            if(this.task.state=='doing'){
                taskCurrent= {id:this.task.id,description: this.task.description, state: 'todo',date:this.task.date}
            }else if(this.task.state=='done'){
                taskCurrent= {id:this.task.id,description: this.task.description, state: 'doing',date:this.task.date}
            }
            reference.set(taskCurrent);  
        }); 

        //------pls

        switch(this.task.state){
            case 'todo': 
                reverse.style.display = 'none'; 
            break; 
            case 'doing': 
            break; 
            case 'done':
                update.style.display = 'none';
            break; 
        }
        return component; 
    }
}