from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class LibroModel(Base):
  __tablename__ = "libros"
  
  id = Column(Integer, primary_key=True, index=True)
  titulo = Column(String, index=True)
  descripcion = Column(String)
  propietario = Column(Integer, ForeignKey("usuarios.id"))

  user = relationship("UsuarioModel")

class UsuarioModel(Base):
  __tablename__ = "usuarios"

  id = Column(Integer, primary_key=True, index=True)
  nombre = Column(String)
  password = Column(String)