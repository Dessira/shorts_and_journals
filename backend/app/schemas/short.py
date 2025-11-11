from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

class ShortBase(BaseModel):
text: str


class ShortCreate(ShortBase):
tag_ids: Optional[List[UUID]] = []


class ShortRead(ShortBase):
id: str
created_at: datetime
user_id: UUID
updated_at: Optional[datetime]
tags: List[TagRead] = []


class Config:
from_attributes = True


class ShortUpdate(BaseModel):
text: Optional[str] = None
tag_ids: Optional[List[UUID]] = None
