from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# REQUERIMIENTOS

# String o cadena de conexion a la base de datos
DB_URL = "postgresql://postgres:gtm/775rf@localhost:5432/libreria"

# Crear un motor de base de datos
engine = create_engine(DB_URL)

# Crear una sesion de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Adicionales
Base = declarative_base()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()