from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt, JWTError
from sqlmodel import Session, select
from app.models.user import User
from app.core.config import get_settings
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status, Request
from app.core.db import get_session
from uuid import UUID
from typing import Optional

settings = get_settings()

pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

# Authenticate user
def authenticate_user(db: Session, username: str, password: str):
    stmt = select(User).where(User.username == username)
    user = db.exec(stmt).first()

    if not user or not verify_password(password, user.hashed_password):
        return None

    return user

# Create JWT token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=30))
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None

def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_session))-> Optional[User]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        user_id = UUID(user_id)
    except JWTError:
        raise credentials_exception

    user = db.exec(select(User).where(User.id == user_id)).first()
    if user is None:
        raise credentials_exception
    return user
def get_current_user_optional(
    current_user: Optional[User] = Depends(get_current_user)
) -> Optional[User]:
    return current_user

def get_token_from_request(request: Request, token: Optional[str]):
    """
    Priority:
    1. Authorization header Bearer token (OAuth2)
    2. Cookie named 'access_token'
    """
    if token:  
        return token
    
    cookie_token = request.cookies.get("access_token")
    if cookie_token:
        return cookie_token

    return None

