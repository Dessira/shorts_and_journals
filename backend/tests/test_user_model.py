import pytest
from sqlmodel import SQLModel, Session, create_engine
from datetime import datetime
from app.models.user import User
from app.core.security import hash_password, authenticate_user

@pytest.fixture
def test_engine():
    engine = create_engine("sqlite:///:memory:", echo=False)
    SQLModel.metadata.create_all(engine)
    return engine

@pytest.fixture
def test_session(test_engine):
    with Session(test_engine) as session:
        yield session

def test_create_user(test_session):
    user = User(
        username="testuser",
        full_name="Test User",
        email="test@example.com",
        hashed_password=hash_password("password123")
    )
    test_session.add(user)
    test_session.commit()
    test_session.refresh(user)

    assert user.id is not None
    assert user.username == "testuser"
    assert user.email == "test@example.com"
    assert user.is_active is True
    assert isinstance(user.created_at, datetime)

def test_unique_email_constraint(test_session):
    user1 = User(
        username="user1",
        full_name="User One",
        email="unique@example.com",
        hashed_password=hash_password("pass1")
    )
    user2 = User(
        username="user2",
        full_name="User Two",
        email="unique@example.com",  # same email
        hashed_password=hash_password("pass2")
    )
    test_session.add(user1)
    test_session.commit()

    test_session.add(user2)
    with pytest.raises(Exception):
        test_session.commit()

def test_unique_username_constraint(test_session):
    user1 = User(
        username="sameuser",
        full_name="User One",
        email="user1@example.com",
        hashed_password=hash_password("pass1")
    )
    user2 = User(
        username="sameuser",  # same username
        full_name="User Two",
        email="user2@example.com",
        hashed_password=hash_password("pass2")
    )
    test_session.add(user1)
    test_session.commit()

    test_session.add(user2)
    with pytest.raises(Exception):
        test_session.commit()

# --------------------------
# LOGIN TESTS
# --------------------------

def test_login_success(test_session):
    password = "securepass"
    user = User(
        username="loginuser",
        full_name="Login User",
        email="login@example.com",
        hashed_password=hash_password(password)
    )
    test_session.add(user)
    test_session.commit()
    test_session.refresh(user)

    auth_user = authenticate_user(test_session, "login@example.com", password)
    assert auth_user is not None
    assert auth_user.email == "login@example.com"

def test_login_fail_wrong_password(test_session):
    password = "rightpass"
    user = User(
        username="wrongpassuser",
        full_name="Wrong Pass",
        email="wrongpass@example.com",
        hashed_password=hash_password(password)
    )
    test_session.add(user)
    test_session.commit()
    test_session.refresh(user)

    auth_user = authenticate_user(test_session, "wrongpass@example.com", "wrongpass")
    assert auth_user is None

def test_login_fail_nonexistent_email(test_session):
    auth_user = authenticate_user(test_session, "nonexistent@example.com", "any")
    assert auth_user is None

