from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.core.db import engine
from app.schemas.user import UserCreate, UserRead, UserLogin
from app.services.user_service import create_user  # ✅ import service
from app.models.user import User
from app.schemas.token import Token
from app.core.security import authenticate_user, create_access_token


router = APIRouter(prefix="/auth", tags=["Auth"])

def get_session():
    with Session(engine) as session:
        yield session

@router.post("/register", response_model=UserRead)
def register(user: UserCreate, session: Session = Depends(get_session)):

    # ✅ Check user exists
    exists = session.exec(
        select(User).where(User.email == user.email)
    ).first()

    if exists:
        raise HTTPException(status_code=400, detail="Email already registered")

    # ✅ Call your service function
    new_user = create_user(session, user)
    return new_user

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_session)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": str(db_user.id)})
    return {"access_token": access_token, "token_type": "bearer"}



