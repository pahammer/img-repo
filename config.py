"""Flask app configuration."""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))


class Config:
    """Configuration from environment variables."""

    SECRET_KEY = environ.get("SECRET_KEY")
    FLASK_ENV = environ.get("FLASK_ENV")
    FLASK_APP = "wsgi.py"

    # DEV
    TESTING = True
    DEBUG = True

    # Static Assets
    STATIC_FOLDER = "static"
    TEMPLATES_FOLDER = "templates"

    # GCP
    BUCKET_NAME = environ.get("BUCKET_NAME")
    FIRESTORE_COLLECTION = environ.get("FIRESTORE_COLLECTION")
    GOOGLE_APPLICATION_CREDENTIALS = environ.get("GOOGLE_APPLICATION_CREDENTIALS")