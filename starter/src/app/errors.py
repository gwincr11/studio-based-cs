"""Consistent HTML and JSON errors without hiding HTTP status codes."""
from flask import Flask, Response, jsonify, render_template, request
from werkzeug.exceptions import HTTPException, InternalServerError
from werkzeug.wrappers import Response as WerkzeugResponse

from .models import db


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(HTTPException)
    def http_error(error: HTTPException) -> WerkzeugResponse:
        response = error.get_response()
        if request.path.startswith("/api/"):
            response.data = jsonify(error=error.description).get_data()
            response.content_type = "application/json"
        app.logger.warning("HTTP %s at %s", error.code, request.path)
        return response

    @app.errorhandler(500)
    def internal_error(error: InternalServerError) -> tuple[str, int] | tuple[Response, int]:
        db.session.rollback()
        app.logger.error("Request failed at %s", request.path, exc_info=error.original_exception)
        if request.path.startswith("/api/"):
            return jsonify(error="An unexpected server error occurred."), 500
        return render_template("errors/500.html"), 500
