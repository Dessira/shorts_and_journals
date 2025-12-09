from typing import List, Optional
from uuid import UUID
from sqlmodel import Session, select

# Import your models
from app.models.journal import Journal
from app.models.short import Short
from app.models.tag import Tag, ShortTag

# Import your Pydantic schemas
from app.schemas.journal import JournalCreate, JournalRead, JournalUpdate


class JournalService:

    @staticmethod
    def create_journal(db: Session, journal_data: JournalCreate, user_id: UUID) -> Journal:
        journal = Journal(
            name=journal_data.name,
            description=journal_data.description,
            is_private=journal_data.is_private,
            user_id=user_id
        )
        db.add(journal)
        db.commit()
        db.refresh(journal)
        return journal


    @staticmethod
    def get_journal(
        db: Session, journal_id: str, request_user_id: Optional[UUID]
    ) -> Optional[JournalRead]:

        journal = db.get(Journal, journal_id)
        if not journal:
            return None

        # Access rules: If private, only creator can view
        if journal.is_private and journal.user_id != request_user_id:
            return None

        # Get all shorts for journal
        shorts = db.exec(select(Short).where(Short.journal_id == journal_id)).all()

        # Collect unique tags from those shorts
        if shorts:
            short_ids = [s.id for s in shorts]
            tags_result = db.exec(
                select(Tag)
                .join(ShortTag, ShortTag.tag_id == Tag.id)
                .where(ShortTag.short_id.in_(short_ids))
            )
            tags = tags_result.unique().all()
        else:
            tags = []

        return JournalRead(
            **journal.__dict__,
            tags=tags
        )

    @staticmethod
    def get_journals(
        db: Session, request_user_id: Optional[UUID]
    ) -> List[JournalRead]:

        # Public journals OR private journals owned by user
        result = db.exec(
            select(Journal).where(
                (Journal.is_private == False) |
                (Journal.user_id == request_user_id)
            )
        )
        journals = result.all()

        data = []
        for journal in journals:
            res = JournalService.get_journal(db, journal.id, request_user_id)
            if res:
                data.append(res)

        return data

    @staticmethod
    def get_user_journals(db: Session, user_id: UUID) -> List[JournalRead]:
        """
        Returns all journals for a specific user (private and public)
        """
        result = db.exec(select(Journal).where(Journal.user_id == user_id))
        journals = result.all()

        data = []
        for journal in journals:
            res = JournalService.get_journal(db, journal.id, user_id)  # reuses existing logic
            if res:
                data.append(res)
        return data

    @staticmethod
    def update_journal(
        db: Session, journal_id: str, journal_data: JournalUpdate, user_id: UUID
    ) -> Optional[Journal]:

        journal = db.get(Journal, journal_id)
        if not journal:
            return None

        # Ensure only owner can update
        if journal.user_id != user_id:
            return None

        update_data = journal_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(journal, key, value)

        db.add(journal)
        db.commit()
        db.refresh(journal)
        return journal

    @staticmethod
    def delete_journal(
        db: Session, journal_id: str, user_id: UUID
    ) -> bool:

        journal = db.get(Journal, journal_id)
        if not journal:
            return False

        # Ownership check
        if journal.user_id != user_id:
            return False

        db.delete(journal)
        db.commit()
        return True

