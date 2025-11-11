from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


class JournalBase(BaseModel):
    name: str
    description: str
    is_private: bool


class JournalCreate(JournalBase):
    pass


class JournalRead(JournalBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime]
    user_id: UUID


class Config:
    from_attributes = True


class JournalUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
