from flask import Blueprint, Response, jsonify, render_template
from sqlalchemy import text

from ..models import db

home_bp = Blueprint("home", __name__)


@home_bp.get("/")
def index() -> str:
    return render_template("home.html")


@home_bp.get("/health")
def health() -> Response:
    db.session.execute(text("SELECT 1"))
    return jsonify(status="ok")
