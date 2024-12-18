from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from sqlalchemy.orm import Session
from models import Task
from schema import TaskSchema
from pydantic import BaseModel
from typing import Optional, List
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"], 
)


@app.get("/")
async def getTask(db: Session = Depends(get_db)):

    try:
        tasks = db.query(Task).all()
        return {"tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/newTask")
async def postTask(task: TaskSchema, db: Session = Depends(get_db)):
    try:
        db_task = Task(**task.dict())
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))



@app.delete("/supTask/{task_id}")
async def deleteTask(task_id:int,db: Session = Depends(get_db)):
    
    try:
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        db.delete(db_task)
        db.commit()
        return {"message": "Task deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    


class TaskUpdateSchema(BaseModel):
    status: Optional[str] = None  # Solo permitimos actualizar 'status'

@app.put("/tasks/{task_id}")
async def update_task(task_id: int, task_update: TaskUpdateSchema, db: Session = Depends(get_db)):
    try:
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found")
        

        update_data = task_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
        
        db.commit() 
        db.refresh(db_task) 
        return db_task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/load_tasks")
async def load_tasks(tasks: List[TaskSchema], db: Session = Depends(get_db)):

    db.query(Task).delete()

    try:
        for task_data in tasks:
            task = Task(**task_data.dict())
            db.add(task)
        db.commit()
        return {"message": "Tareas cargadas correctamente"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/export_tasks")
async def export_tasks(db: Session = Depends(get_db)):
    try:
        # Obtener todas las tareas de la base de datos
        tasks = db.query(Task).all()
        
        # Convertir las tareas en una lista de diccionarios
        tasks_list = [task.__dict__ for task in tasks]
        
        # Eliminar metadatos innecesarios de SQLAlchemy (como _sa_instance_state)
        for task in tasks_list:
            task.pop("_sa_instance_state", None)
        
        # Devolver las tareas como JSON
        return JSONResponse(content=tasks_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))