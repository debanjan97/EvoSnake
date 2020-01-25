from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(50))
    last_played = db.Column(db.TIMESTAMP, default=datetime.now)

    def __init__(self, id, username, last_played=None):
        self.id = id
        self.username = username
        self.last_played = last_played or datetime.now()
