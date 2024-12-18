document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const tasksContainer = document.getElementById('tasks-container');


    async function renderTasks() {

        let URL = "http://127.0.0.1:8000/"
        try {
            let response = await fetch(URL)
            const data = await response.json();
            let tasks = data.tasks

            tasksContainer.innerHTML = '';
            tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Estado: ${task.status}</p>
                </div>
                <div class="task-actions">
                    <button onclick="changeStatus(${task.id})">Cambiar Estado</button>
                    <button onclick="deleteTask(${task.id})">Eliminar</button>
                </div>
            `;
            tasksContainer.appendChild(taskElement);
        });
        } catch (error) {
            console.error(error)    
        }
        
    
        
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
       
        const dataReset = {
            title: title,
            description: description,
            status: "Pendiente"
        };
        
        try {
            let URL = "http://127.0.0.1:8000/newTask";
        
            fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataReset) 
            });
        
            console.log("Tarea creada correctamente");
            
        } catch (error) {
            console.log(error)
        }

        location.reload();
        taskForm.reset();
    });



    window.changeStatus = async (index) => {
        try {
            
            let URLPut = `http://127.0.0.1:8000/tasks/${index}`;
            let URL = `http://127.0.0.1:8000/`;
            
            const response = await fetch(URL);
            const task = await response.json();
            const taskWithId4 = task.tasks.find(task => task.id === index);
            const newStatus = taskWithId4.status == "Pendiente" ? 'Completada' : 'Pendiente';
            await fetch(URLPut, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: `${newStatus}` }) 
            });
    
            console.log(`Tarea ${index} actualizada a estado: ${newStatus}`);
    
            location.reload();
    
        } catch (error) {
            console.error(error);
        }
    
    };



    window.deleteTask = (index) => {
       try {
        let URL = `http://127.0.0.1:8000/supTask/${index}`
        fetch(URL,{
            method:'DELETE'
        }) 
    } catch (error) {
        console.error(error)
    }
    location.reload();
};




    renderTasks();
});

document.querySelector('.bottom.import').addEventListener('click', () => {
    document.getElementById('fileInput').click();

});

document.getElementById('fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const fileContent = await file.text();
            const tasks = JSON.parse(fileContent); 

            await fetch('http://127.0.0.1:8000/load_tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasks)
            });

            console.log('Tareas importadas exitosamente');
            location.reload()
        } catch (error) {
            console.error('Error al importar tareas:', error);
        }
    }
});

document.querySelector('.bottom.export').addEventListener('click', async () => {
    try {
        // Hacer una solicitud al backend para obtener las tareas
        const response = await fetch('http://127.0.0.1:8000/export_tasks');
        const tasks = await response.json();

        // Crear un archivo Blob con las tareas en formato JSON
        const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
        
        // Crear un enlace de descarga temporal
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'database.json'; // Nombre del archivo a descargar
        link.click();

        // Limpiar el objeto URL
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Error al exportar las tareas:', error);
    }
});