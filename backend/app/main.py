from fastapi import FastAPI
from app.core.db import init_db
from app.routers import routes
from app.routers import auth
from app.routers import user
app = FastAPI()
#start app
@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(routes.router)
app.include_router(auth.router)
app.include_router(user.router)
