from fastapi import APIRouter, Depends, HTTPException, status
from schemas import LibroCreate, UsuarioCreate
from sqlalchemy.orm import Session
from database import get_db
from models import LibroModel, UsuarioModel
from schemas import Libro, Usuario
from typing import Annotated

librosRoute = APIRouter(
    prefix="/libros",
    tags=["Libros"]
)

conn = Annotated[Session, Depends(get_db)]

@librosRoute.get("/{id_user}", status_code=status.HTTP_200_OK, response_model=list[Libro])
async def get_libros_user(id_user: int, db:conn):
  libros = db.query(LibroModel).filter(LibroModel.propietario == id_user).all()
  return libros


@librosRoute.get("/libro/{id}", status_code=status.HTTP_200_OK, response_model=Libro)
async def get_libro(id: int, db:conn):
  libro = db.query(LibroModel).filter(LibroModel.id == id).first()

  if not libro:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Libro no encontrado")
  
  return libro


@librosRoute.post("/", status_code=status.HTTP_201_CREATED, response_model=Libro)
async def create_libro(nuevo_libro: LibroCreate, db:conn):
  
  libro = LibroModel(**nuevo_libro.model_dump())
  db.add(libro)
  db.commit()
  db.refresh(libro)

  return libro


@librosRoute.put("/libro/{id}", status_code=status.HTTP_200_OK, response_model=Libro)
async def update_libro(id: int, libro_data: LibroCreate, db:conn):  
  libro = db.query(LibroModel).filter(LibroModel.id == id).first()

  if not libro:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Libro no encontrado")

  libro.titulo = libro_data.titulo
  libro.descripcion = libro_data.descripcion
  libro.propietario = libro_data.propietario

  db.commit()
  db.refresh(libro)

  return libro


@librosRoute.delete("/libro/{id}", status_code=status.HTTP_200_OK, response_model={})
async def delete_libro(id: int, db:conn):  
  libro = db.query(LibroModel).filter(LibroModel.id == id).first()

  if not libro:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Libro no encontrado")

  db.delete(libro)
  db.commit()

  return {"message": "Libro eliminado correctamente"}