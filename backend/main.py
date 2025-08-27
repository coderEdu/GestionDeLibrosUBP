from fastapi import FastAPI
from database import Base, engine
from routers import users, books
#from routes import librosRoute, usuariosRoute
from models import * # hay que importar las tablas que estan en models
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
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

app.include_router(users.usuariosRoute)
app.include_router(books.librosRoute)