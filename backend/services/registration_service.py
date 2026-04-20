from models.registration import Registration
from database.db import db

def register_for_event(data):
    reg = Registration(
        user_id=data.get("user_id"),
        event_id=data.get("event_id")
    )
    db.session.add(reg)
    db.session.commit()
    return {"message": "Registered successfully"}
