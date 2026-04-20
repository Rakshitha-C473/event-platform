from flask import Blueprint, request, jsonify
from services.event_service import create_event, get_events

event_bp = Blueprint('events', __name__)

@event_bp.route('/events', methods=['POST'])
def add_event():
    return create_event(request.json)

@event_bp.route('/events', methods=['GET'])
def fetch_events():
    return get_events()