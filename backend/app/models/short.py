# app/models/short.py
from sqlmodel import SQLModel, Field, Relationship
from typing import List
from datetime import datetime
from uuid import uuid4
from app.models.journal import Journal
from app.models.tag import Tag, ShortTag

class Short(SQLModel, table=True):
    __tablename__ = "shorts"

    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    journal_id: str = Field(foreign_key="journals.id", nullable=False)
    title: str = Field(nullable=False)
    content: str = Field(default="")
    is_private: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship back to journal
    journal: Journal = Relationship(back_populates="shorts")

    # Tags many-to-many
    tags: List[Tag] = Relationship(back_populates="shorts", link_model=ShortTag)

    def effective_privacy(self) -> bool:
        if self.journal.is_private:
            return True
        return self.is_private

