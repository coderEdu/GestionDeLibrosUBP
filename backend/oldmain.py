# clase2
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 

origins = [
    "http://localhost:5173",  # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

class LibroCreate(BaseModel):
    titulo: str
    autor: str
    paginas: int


class LibroResp(BaseModel):
    titulo: str
    autor: str

@app.get("/hola_mundo")
def hola_mundo():
    return {"message": "¡Hola, mundo!"}


@app.get("/salute/{name}")
def greet(name: str):
    return {"message": f"¡Hola, {name.upper()}!"}


# paramatros de tipo path and query
@app.get("/items/{item_id}")
def leer_item(item_id: int, rubro: str, clase: Annotated[str|None,""] = None, valor: int = 100):
    return {
        "item_id": item_id,
        "rubro": rubro,
        "clase": clase,
        "valor": valor
    }


# Parametros de consulta tipo body
@app.post("/libro", response_model=LibroResp)
def crear_libro(libro: LibroCreate):
    objetoLibro = libro.model_dump()
    response = LibroResp(**objetoLibro)
    # guardar el libro en la base de datos
    return response


@app.put("/libro/{titulo}")
def actualizar_libro(titulo: str, libro: LibroCreate):
    # Consultar la base de datos para obtener el libro por título
    # ver si existe este titulo
    # En caso de que exista, actualizarlo con los datos del body
    # si no existe, retornar un error 404
    return {"Ok, Libro modificado con éxito"}


@app.delete("/libro/{titulo}")
def eliminar_libro(titulo: str):
    # Consultar la base de datos para obtener el libro por título
    # ver si existe este titulo
    # En caso de que exista, eliminarlo
    # si no existe, retornar un error 404
    return {"Ok, Libro eliminado con éxito"}