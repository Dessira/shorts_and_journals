
from app.main import app
from fastapi.testclient import TestClient
import pytest


client = TestClient(app)

@pytest.fixture
def access_token():
    user = {
            "email": "s@gmail.com",
            "password": "spiderchicken"
            }
    response = client.post("/auth/login", json=user)
    assert response.status_code == 200
    return response.json()["access_token"]

def test_create_journal_public(access_token):
    #data = test_login_user()
    #token = data["access_token"]
    journal = {
                "name":"journal 1",
                "description":"first journal to be created",
                "is_private": False
            }
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/journals/", json=journal, headers=headers)
    assert response.status_code == 200
    print(response.json())
def test_create_journal_private(access_token):
    journal = {
            "name":"journal 2",
             "description":"first private journal to be created",
             "is_private": True
             }
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.post("/journals/", json=journal, headers=headers)
    assert response.status_code == 200
    print(response.json())
    return response.json()["id"]
def test_view_journal_private(access_token):
    journal_id = test_create_journal_private(access_token)
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get(f"/journals/{journal_id}", headers=headers)
    assert response.status_code == 200


    '''response = client.get(f"/journals/{journal_id}", headers={})
    assert response.status_code == 401
    print(response.json())'''

