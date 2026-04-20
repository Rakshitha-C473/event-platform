from models.event import Event
from database.db import db

# Create Event
def create_event(data):
    event = Event(
        title=data.get("title"),
        description=data.get("description"),
        location=data.get("location")
    )
    db.session.add(event)
    db.session.commit()
    return {"message": "Event created successfully"}

# Get All Events
def get_events():
    events = Event.query.all()

    result = []
    for e in events:
        result.append({
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "location": e.location
        })

    return result