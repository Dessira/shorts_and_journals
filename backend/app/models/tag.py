# app/models/tag.py
from sqlmodel import SQLModel, Field, Relationship
from typing import List
from uuid import uuid4

class Tag(SQLModel, table=True):
    __tablename__ = "tags"

    id: str = Field(default_factory=lambda: str(uuid4()), primary_key=True)
    name: str = Field(unique=True, index=True, nullable=False)

    # Many-to-many relationship to shorts
    shorts: List["Short"] = Relationship(back_populates="tags", link_model="ShortTag")


class ShortTag(SQLModel, table=True):
    __tablename__ = "short_tags"

    short_id: str = Field(foreign_key="shorts.id", primary_key=True)
    tag_id: str = Field(foreign_key="tags.id", primary_key=True)

