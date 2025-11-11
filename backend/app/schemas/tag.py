from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID


# ----- Tag Schemas -----
class TagBase(BaseModel):
name: str


class TagCreate(TagBase):
pass


class TagRead(TagBase):
id: UUID


class Config:
from_attributes = True
