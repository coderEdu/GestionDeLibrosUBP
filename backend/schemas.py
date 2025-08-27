from pydantic import BaseModel, EmailStr, Field

class LibroCreate(BaseModel):
  titulo: str = Field(..., title="Titulo del libro", description="Titulo del libro", max_length=20)
  descripcion: str = Field(..., title="Descripcion del libro", description="Descripcion del libro", max_length=200)
  propietario: int

class Libro(LibroCreate):
  id: int

  class Config:
    from_attributes=True

class UsuarioCreate(BaseModel):
  nombre: EmailStr
  password: str

class Usuario(UsuarioCreate):
  id: int

  class Config:
    from_attributes=True