from flask import Blueprint, Response, abort, jsonify, request
from pydantic import ValidationError
from sqlalchemy import select

from ..models import Message, db
from ..schemas.message import NewMessage

messages_bp = Blueprint("messages", __name__, url_prefix="/api/messages")


@messages_bp.get("")
def list_messages() -> Response:
    messages = db.session.scalars(select(Message).order_by(Message.id.desc()).limit(50))
    return jsonify([{"id": message.id, "text": message.text} for message in messages])


@messages_bp.post("")
def add_message() -> tuple[Response, int]:
    try:
        payload = NewMessage.model_validate(request.get_json())
    except ValidationError:
        abort(400, description="Enter a message between 1 and 200 characters.")
    message = Message(text=payload.text)
    db.session.add(message)
    db.session.commit()
    return jsonify(id=message.id, text=message.text), 201
