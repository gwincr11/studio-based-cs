"""Run browser checks against an isolated, migrated database."""
import os
from tempfile import TemporaryDirectory

from flask_migrate import upgrade

from app import create_app

with TemporaryDirectory(prefix="studio-browser-") as directory:
    os.environ["DATABASE_URL"] = f"sqlite:///{directory}/browser.db"
    app = create_app("development")
    with app.app_context():
        upgrade()
    app.run(host="127.0.0.1", port=5001, use_reloader=False)
