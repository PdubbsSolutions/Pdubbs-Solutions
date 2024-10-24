from flask import flask
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = flask(__name__)
    app.config.from_object('config')

    with app.app_context():
        from .routes import main_bp
        app.register_blueprint(main_bp)
    
    return app

api_key = os.getenv('API_KEY')
