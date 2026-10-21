"""Structured logging configuration.

Provides JSON logging in production for machine parsing (ELK, CloudWatch, etc.)
and human-readable format in development for easier debugging.
"""
import logging
import sys
from flask import Flask


def configure_logging(app: Flask) -> None:
    """Configure application logging based on environment.

    In development: Human-readable format with colors
    In production: JSON structured logging for aggregation systems

    Args:
        app: Flask application instance
    """
    log_level = logging.DEBUG if app.debug else logging.INFO

    # Remove default Flask handlers
    app.logger.handlers.clear()

    # Create handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(log_level)

    if app.config.get('ENV') == 'production':
        # JSON format for production
        formatter = logging.Formatter(
            '{"timestamp": "%(asctime)s", "level": "%(levelname)s", '
            '"logger": "%(name)s", "message": "%(message)s"}'
        )
    else:
        # Human-readable format for development
        formatter = logging.Formatter(
            '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
        )

    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
    app.logger.setLevel(log_level)

    # Log startup message
    app.logger.info(f"Application starting in {app.config.get('ENV', 'development')} mode")
