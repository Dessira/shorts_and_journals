from app.main import app
from fastapi.testclient import TestClient


client = TestClient(app)

'''def test_create_user():
    user = {
            "username": "spide",
            "full_name": "spider chicken",
            "email": "g@gmail.com",
            "password": "spiderchicken"
            }
    response = client.post("/auth/register", json=user)
    assert response.status_code == 200
    print (response)'''

def test_login_user():
    user = {
            "email": "s@gmail.com",
            "password": "spiderchicken"
            }
    response = client.post("/auth/login", json=user)
    assert response.status_code == 200

