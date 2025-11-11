from sqlmodel import SQLModel, create_engine
from .config import get_settings
from sqlmodel import Session

settings = get_settings()

engine = create_engine(settings.DATABASE_URL, echo=True)  # echo prints SQL logs

def init_db():
    import app.models
    SQLModel.metadata.create_all(engine)
def get_session():
    with Session(engine) as session:
        yield session
