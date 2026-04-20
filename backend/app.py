from flask import Flask
from flask_cors import CORS
from database.db import db
import config

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# IMPORTANT: import models so tables are created
from models import user, event, registration

# import routes
from routes.auth_routes import auth_bp
from routes.event_routes import event_bp
from routes.registration_routes import registration_bp

app.register_blueprint(auth_bp)
app.register_blueprint(event_bp)
app.register_blueprint(registration_bp)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)