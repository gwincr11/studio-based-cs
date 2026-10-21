"""Flask application factory."""
from pathlib import Path

from flask import Flask
from flask_migrate import Migrate

from .config import load_config
from .errors import register_error_handlers
from .logging_config import configure_logging
from .models import db
from .views import register_blueprints


def create_app(config_name: str | None = None) -> Flask:
    app = Flask(__name__, instance_path=str(Path(__file__).resolve().parents[2] / "instance"))
    app.config.update(load_config(config_name))
    configure_logging(app)
    db.init_app(app)
    Migrate(app, db)
    register_error_handlers(app)
    register_blueprints(app)
    return app
