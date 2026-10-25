"""Runtime configuration shared by local development, tests, and deployment."""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / ".env")


def load_config(config_name: str | None = None) -> dict[str, object]:
    environment = config_name or os.environ.get("APP_ENV", "development")
    if environment not in {"development", "testing", "production"}:
        raise ValueError(f"Unknown APP_ENV: {environment}")

    database_url = os.environ.get("DATABASE_URL")
    secret_key = os.environ.get("FLASK_SECRET_KEY")
    if environment == "production":
        if not database_url:
            raise ValueError("DATABASE_URL must be set in production")
        if not secret_key:
            raise ValueError("FLASK_SECRET_KEY must be set in production")
    if database_url and database_url.startswith(("postgres://", "postgresql://")):
        database_url = "postgresql+psycopg2://" + database_url.split("://", 1)[1]

    return {
        "ENV": environment,
        "TESTING": environment == "testing",
        "DEBUG": False,
        "SECRET_KEY": secret_key,
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
        "SQLALCHEMY_DATABASE_URI": (
            "sqlite:///:memory:" if environment == "testing"
            else database_url or "postgresql+psycopg2:///studio_app"
        ),
        "MAX_CONTENT_LENGTH": 16 * 1024,
    }
