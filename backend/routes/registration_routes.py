from flask import Blueprint, request
from services.registration_service import register_for_event

registration_bp = Blueprint('registration', __name__)

@registration_bp.route('/register-event', methods=['POST'])
def register_event():
    return register_for_event(request.json)
