"""SQLAlchemy database instance and base model.

Provides the shared db instance used throughout the application.
All models should inherit from db.Model.
"""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""
    pass


# SQLAlchemy instance - initialized in app factory
db = SQLAlchemy(model_class=Base)
