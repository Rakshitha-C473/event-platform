

from flask import Flask
from flask_cors import CORS
from database.db import db
import config

from routes.event_routes import event_bp
from routes.auth_routes import auth_bp
from routes.registration_routes import registration_bp
from routes.ai_routes import ai_routes

app = Flask(__name__)

# CORS
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Blueprints (ALL under /api)
app.register_blueprint(event_bp, url_prefix="/api/events")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(registration_bp, url_prefix="/api/register")
app.register_blueprint(ai_routes, url_prefix="/api/ai")

@app.route("/")
def home():
    return "Backend running ✅"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
from flask import Blueprint, request, jsonify
from services.event_service import create_event, get_all_events, search_events

event_bp = Blueprint("event_bp", __name__)

# CREATE EVENT
@event_bp.route("/", methods=["POST"])
def add_event():
    return create_event(request.json)

# GET ALL EVENTS
@event_bp.route("/", methods=["GET"])
def get_events():
    return get_all_events()

# SEARCH EVENTS
@event_bp.route("/search", methods=["GET"])
def search():
    college = request.args.get("college")
    location = request.args.get("location")
    category = request.args.get("category")
    return search_events(college, location, category)
from database.db import db
from models.event import Event

def create_event(data):
    event = Event(
        title=data["title"],
        category=data["category"],
        college=data["college"],
        location=data["location"],
        event_date=data["event_date"],
        description=data.get("description")
    )

    db.session.add(event)
    db.session.commit()

    return {"message": "Event created successfully"}

def get_all_events():
    events = Event.query.all()
    return [
        {
            "id": e.id,
            "title": e.title,
            "category": e.category,
            "college": e.college,
            "location": e.location,
            "event_date": e.event_date,
            "description": e.description
        }
        for e in events
    ]

def search_events(college, location, category):
    query = Event.query

    if college:
        query = query.filter(Event.college.like(f"%{college}%"))
    if location:
        query = query.filter(Event.location.like(f"%{location}%"))
    if category:
        query = query.filter(Event.category.like(f"%{category}%"))

    results = query.all()

    return [
        {
            "title": e.title,
            "category": e.category,
            "college": e.college,
            "location": e.location,
            "event_date": e.event_date,
            "description": e.description
        }
        for e in results
    ]