from pydantic import BaseModel, Field
from typing import Optional

class TaskSchema(BaseModel):
    id: Optional[int] = Field(None, description="ID único de la tarea, generado automáticamente.")
    title: str = Field(..., max_length=255, description="Título de la tarea (obligatorio).")
    description: Optional[str] = Field(None, max_length=255, description="Descripción opcional de la tarea.")
    status: str = Field("pending", max_length=50, description="Estado de la tarea, por defecto 'pending'.")

    class Config:
        orm_mode = True