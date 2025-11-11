# app/models/short.py
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime
from uuid import uuid4
from .user import User
from uuid import UUID
from .journal import Journal
from .tag import Tag, ShortTag

class Short(SQLModel, table=True):
    __tablename__ = "shorts"

    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    journal_id: str = Field(foreign_key="journals.id", nullable=False)
    title: str = Field(nullable=False)
    content: str = Field(default="")
    user_id: UUID = Field(foreign_key="users.id")
    is_private: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationship with user
    user: Optional[User] = Relationship(back_populates="shorts")
    # Relationship back to journal
    journals: List["Journal"] = Relationship(back_populates="shorts")

    # Tags many-to-many
    tags: List[Tag] = Relationship(back_populates="shorts", link_model=ShortTag)

    def effective_privacy(self) -> bool:
        if self.journal.is_private:
            return True
        return self.is_private

