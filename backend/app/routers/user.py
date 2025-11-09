from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.db import get_session
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=User)
def read_own_profile(current_user: User = Depends(get_current_user)):
    return current_user

