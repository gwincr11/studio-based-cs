import pytest

from app import create_app
from app.config import load_config
from app.models import db


def test_messages_are_saved_and_listed_newest_first(client):
    assert client.get("/api/messages").json == []
    first = client.post("/api/messages", json={"text": "  First idea  "})
    assert first.status_code == 201
    assert first.json["text"] == "First idea"
    second = client.post("/api/messages", json={"text": "Another idea"})
    assert client.get("/api/messages").json == [second.json, first.json]


@pytest.mark.parametrize("payload", [
    {}, {"text": ""}, {"text": "   "}, {"text": "x" * 201},
    {"text": 123}, {"text": "ok", "unexpected": True}, ["not an object"],
])
def test_invalid_messages_are_rejected_without_writes(client, payload):
    response = client.post("/api/messages", json=payload)
    assert response.status_code == 400
    assert response.json["error"]
    assert client.get("/api/messages").json == []


def test_json_errors_preserve_http_status_codes(client):
    assert client.post("/api/messages", data="not json").status_code == 415
    malformed = client.post("/api/messages", data="{", content_type="application/json")
    assert malformed.status_code == 400
    assert malformed.json["error"]
    assert client.delete("/api/messages").status_code == 405
    assert client.get("/api/missing").status_code == 404


def test_home_and_database_health(client):
    assert b'data-island="messages"' in client.get("/").data
    assert client.get("/health").json == {"status": "ok"}


def test_failed_writes_return_a_visible_error_and_roll_back(app, client, monkeypatch):
    app.config["PROPAGATE_EXCEPTIONS"] = False

    def fail_commit():
        raise RuntimeError("Simulated database failure")

    monkeypatch.setattr(db.session, "commit", fail_commit)
    response = client.post("/api/messages", json={"text": "Not saved"})
    assert response.status_code == 500
    assert response.json == {"error": "An unexpected server error occurred."}
    assert client.get("/api/messages").json == []


@pytest.mark.parametrize("missing", ["DATABASE_URL", "FLASK_SECRET_KEY"])
def test_production_requires_explicit_configuration(monkeypatch, missing):
    monkeypatch.setenv("DATABASE_URL", "sqlite:///:memory:")
    monkeypatch.setenv("FLASK_SECRET_KEY", "test-only-not-a-deployment-secret")
    monkeypatch.delenv(missing)
    with pytest.raises(ValueError, match=missing):
        create_app("production")


@pytest.mark.parametrize("scheme", ["postgres", "postgresql"])
def test_configuration_selects_the_installed_postgres_driver(monkeypatch, scheme):
    monkeypatch.setenv("DATABASE_URL", f"{scheme}://localhost/studio_app")
    assert load_config("development")["SQLALCHEMY_DATABASE_URI"] == "postgresql+psycopg2://localhost/studio_app"
