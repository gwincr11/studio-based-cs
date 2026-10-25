"""Views (routes) package.

Blueprint registration for all application routes.
Each view module defines a Blueprint with its routes.
"""
from flask import Flask


def register_blueprints(app: Flask) -> None:
    """Register all blueprints with the Flask application.

    Args:
        app: Flask application instance
    """
    from ..controllers.messages import messages_bp
    from .home import home_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(messages_bp)
