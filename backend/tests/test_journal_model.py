import pytest
from sqlmodel import SQLModel, Session, create_engine
from datetime import datetime
from app.models.user import User
from app.models.journal import Journal
from app.core.security import hash_password

# --------------------------
# FIXTURES
# --------------------------

@pytest.fixture
def test_engine():
    engine = create_engine("sqlite:///:memory:", echo=False)
    SQLModel.metadata.create_all(engine)
    return engine

@pytest.fixture
def test_session(test_engine):
    with Session(test_engine) as session:
        yield session

# --------------------------
# HELPER
# --------------------------

def create_test_user(session: Session):
    user = User(
        username="journaluser",
        full_name="Journal User",
        email="journal@example.com",
        hashed_password=hash_password("password123")
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

# --------------------------
# JOURNAL TESTS
# --------------------------

def test_create_journal(test_session):
    user = create_test_user(test_session)
    
    journal = Journal(
        name="My First Journal",
        description="This is the content of my first journal entry.",
        is_private=False,
        user_id=user.id
    )
    test_session.add(journal)
    test_session.commit()
    test_session.refresh(journal)

    assert journal.id is not None
    assert journal.name == "My First Journal"
    assert journal.description.startswith("This is the content")
    assert journal.user_id == user.id
    assert isinstance(journal.created_at, datetime)

def test_get_public_journals(test_session):
    user = create_test_user(test_session)

    public_journal = Journal(
        name="Public Journal",
        description="Public content",
        is_private=False,
        user_id=user.id
    )
    private_journal = Journal(
        name="Private Journal",
        description="Private content",
        is_private=True,
        user_id=user.id
    )

    test_session.add(public_journal)
    test_session.add(private_journal)
    test_session.commit()

    # simulate a "get public journals" query
    public_entries = test_session.query(Journal).filter(Journal.is_private == False).all()
    assert len(public_entries) == 1
    assert public_entries[0].name == "Public Journal"

def test_get_private_journal_unauthorized(test_session):
    user = create_test_user(test_session)

    private_journal = Journal(
        name="Private Journal",
        description="Private content",
        is_private=True,
        user_id=user.id
    )
    test_session.add(private_journal)
    test_session.commit()

    # simulate unauthorized access: fetch journals not belonging to user
    other_journals = test_session.query(Journal).filter(Journal.user_id != user.id).all()
    assert len(other_journals) == 0

def test_update_journal(test_session):
    user = create_test_user(test_session)

    journal = Journal(
        name="Old Title",
        description="Old content",
        is_private=False,
        user_id=user.id
    )
    test_session.add(journal)
    test_session.commit()
    test_session.refresh(journal)

    # Update
    journal.name = "Updated Title"
    journal.description = "Updated content"
    test_session.add(journal)
    test_session.commit()
    test_session.refresh(journal)

    assert journal.name == "Updated Title"
    assert journal.description == "Updated content"

def test_delete_journal(test_session):
    user = create_test_user(test_session)

    journal = Journal(
        name="To Be Deleted",
        description="This journal will be deleted",
        is_private=False,
        user_id=user.id
    )
    test_session.add(journal)
    test_session.commit()
    test_session.refresh(journal)

    test_session.delete(journal)
    test_session.commit()

    remaining = test_session.query(Journal).filter(Journal.id == journal.id).all()
    assert len(remaining) == 0

