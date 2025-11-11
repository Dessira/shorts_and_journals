from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from uuid import UUID
import uuid

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str = Field(index=True, unique=True, nullable=False)
    full_name: Optional[str] = None
    email: str = Field(unique=True, index=True, nullable=False)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    journals: List["Journal"] = Relationship(back_populates="user")
    shorts: List["Short"] = Relationship(back_populates="user")

