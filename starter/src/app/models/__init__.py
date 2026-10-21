"""Database models package.

Exports all models for easy importing throughout the application.
"""
from .base import db
from .message import Message

__all__ = ['db', 'Message']
