# app/models/journal.py
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime
from uuid import uuid4
from uuid import UUID
from .user import User

class Journal(SQLModel, table=True):
    __tablename__ = "journals"

    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    name: str = Field(index=True, nullable=False)
    description: str = Field(default="")
    user_id: UUID = Field(foreign_key="users.id")
    is_private: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to shorts
    user: Optional[User] = Relationship(back_populates="journals")
    shorts: List["Short"] = Relationship(back_populates="journals")

    @property
    def number_of_shorts(self) -> int:
        return len(self.shorts)

