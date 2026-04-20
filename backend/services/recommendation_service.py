from models.event import Event

def recommend_events(user_id):
    # Dummy logic (top 5 events)
    events = Event.query.limit(5).all()

    return [
        {
            "id": e.id,
            "title": e.title,
            "location": e.location
        } for e in events
    ]