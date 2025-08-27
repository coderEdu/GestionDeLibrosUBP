from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

app = FastAPI()
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

class User(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserInDB(User):
    password: str


users_db = {
    "educoder78": {
        "username": "educoder78",
        "full_name": "Eduardo Chirino",
        "email": "educoder78@gmail.com",
        "disabled": False,
        "password": "12345678"
    },
    "gtpantera": {
        "username": "gtpantera2",
        "full_name": "Eduardito Chirinito",
        "email": "gtpanteraxtr@gmail.com",
        "disabled": True,
        "password": "87654321"  
    },
}

def search_user_db(username: str):
    if username in users_db:
        # user_dict = users_db[username]
        # return UserInDB(**user_dict)
        return UserInDB(**users_db[username])
    
def search_user(username: str):
    if username in users_db:
        # user_dict = users_db[username]
        # return UserInDB(**user_dict)
        return User(**users_db[username])
    

def current_user(token: str = Depends(oauth2)):
    user = search_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales de autenticación inválidas",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario inactivo",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return user
    

@app.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)
    if not user_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El usuario es incorrecto o no existe")
    user = search_user_db(form.username)
    if user is None or not form.password == user.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña es incorrecta")
    return {"access_token": user.username, "token_type": "bearer"}


@app.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user