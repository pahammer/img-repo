"""Initialize Flask app."""
from flask import Flask


def create_app():
    """Create Flask application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    with app.app_context():
        # Import home blueprint
        from .home import routes

        # Register home blueprint
        app.register_blueprint(routes.home_bp)

        return app