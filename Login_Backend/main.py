# in backend folder.
# main.js


from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext
from pymongo import MongoClient
from datetime import datetime, timedelta
import jwt
from jwt import PyJWTError
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow all methods
    allow_headers=["*"],
)
client = MongoClient("mongodb://localhost:27017/")
db = client["Loginbase"]
collection = db["logins"]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "1234"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class User(BaseModel):
    username: str
    password: str

class UserInDB(BaseModel):
    username: str
    hashed_password: str

def get_user(username: str):
    user_data = collection.find_one({"username": username})
    if user_data:
        return UserInDB(**user_data)
    else:
        return None

def authenticate_user(username: str, password: str):
    user_data = collection.find_one({"username": username})
    if user_data and pwd_context.verify(password, user_data["hashed_password"]):
        print(f"user:{user_data}")
        return UserInDB(**user_data)
    
    return None

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id : int = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {'username':username, 'id':user_id}
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/signup")
async def signup(user: User):
    hashed_password = pwd_context.hash(user.password)
    user_data = {"username": user.username, "hashed_password": hashed_password}
    try:
        collection.insert_one(user_data)  # Insert user data into MongoDB
        return {"message": "User signed up successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error signing up: {str(e)}")
    

    
@app.get("/token")  # Allow GET requests for token retrieval
async def get_token(username: str, password: str):
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(f"Received login request with username: {form_data.username}, password: {form_data.password}")  # Log received data
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        print("Authentication failed")
        raise HTTPException(status_code=401, detail="Invalid username or password")

    try:
        # Log hashed password from database
        print(f"Hashed password from database: {user.hashed_password}")

        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": form_data.username}, expires_delta=access_token_expires
        )
        return {"access_token": access_token}
    except Exception as e:
        print(f"Error generating token: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")




@app.get("/users/me")
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return current_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
