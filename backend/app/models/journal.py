# app/models/journal.py
from sqlmodel import SQLModel, Field, Relationship
from typing import List
from datetime import datetime
from app.models.short import Short

class Journal(SQLModel, table=True):
    __tablename__ = "journals"

    id: int = Field(default=None, primary_key=True)
    name: str = Field(index=True, nullable=False)
    description: str = Field(default="")
    is_private: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to shorts
    shorts: List["Short"] = Relationship(back_populates="journal")

    @property
    def number_of_shorts(self) -> int:
        return len(self.shorts)

