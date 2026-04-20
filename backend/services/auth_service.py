from models.user import User
from database.db import db

def register_user(data):
    user = User(
        name=data.get("name"),
        email=data.get("email"),
        password=data.get("password")
    )
    db.session.add(user)
    db.session.commit()
    return {"message": "User registered successfully"}

def login_user(data):
    user = User.query.filter_by(
        email=data.get("email"),
        password=data.get("password")
    ).first()

    if user:
        return {"message": "Login successful"}
    else:
        return {"message": "Invalid credentials"}, 401