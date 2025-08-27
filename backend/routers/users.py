from fastapi import APIRouter, Depends, HTTPException, status
from schemas import LibroCreate, UsuarioCreate
from sqlalchemy.orm import Session
from database import get_db
from models import LibroModel, UsuarioModel
from schemas import Libro, Usuario
from typing import Annotated

usuariosRoute = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

conn = Annotated[Session, Depends(get_db)]

@usuariosRoute.get("/", status_code=status.HTTP_200_OK, response_model=list[Usuario])
async def get_usuarios(db:conn):
  usuarios = db.query(UsuarioModel).all()
  return usuarios


@usuariosRoute.post("/", status_code=status.HTTP_201_CREATED, response_model=Usuario)
async def create_usuario(nuevo_usuario: UsuarioCreate, db:conn):
  
  usuario = UsuarioModel(**nuevo_usuario.model_dump())
  db.add(usuario)
  db.commit()
  db.refresh(usuario)

  return usuario


@usuariosRoute.put("/usuario/{id}", status_code=status.HTTP_200_OK, response_model=Usuario)
async def update_usuario(id: int, usuario_data: UsuarioCreate, db:conn):  
  usuario = db.query(UsuarioModel).filter(UsuarioModel.id == id).first()

  if not usuario:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

  usuario.nombre = usuario_data.nombre
  usuario.password = usuario_data.password

  db.commit()
  db.refresh(usuario)

  return usuario


@usuariosRoute.delete("/usuario/{id}", status_code=status.HTTP_200_OK, response_model={})
async def delete_usuario(id: int, db:conn):  
  usuario = db.query(UsuarioModel).filter(UsuarioModel.id == id).first()

  if not usuario:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado")

  db.delete(usuario)
  db.commit()

  return {"message": "Usuario eliminado correctamente"}