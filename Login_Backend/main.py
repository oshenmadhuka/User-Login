# main.py

from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext

app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client["Loginbase"]
collection = db["logins"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    email: str
    password: str

class UserInDB(User):
    hashed_password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db, email: str):
    user_data = db.find_one({"email": email})
    if user_data:
        return UserInDB(**user_data)

def authenticate_user(email: str, password: str, db=collection):
    user = get_user(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    # Here you can generate and return a JWT token for authentication
    return {"access_token": "fake_token", "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    # Here you can verify the token and return user information
    return {"email": "user@example.com"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
