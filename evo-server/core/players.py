from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import ForeignKey

db = SQLAlchemy()


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(50))
    last_played = db.Column(db.TIMESTAMP, default=datetime.now)

    def __init__(self, id, username, last_played=None):
        self.id = id
        self.username = username
        self.last_played = last_played or datetime.now()


class Snake(db.Model):
    __tablename__ = 'snakes'
    id = db.Column(db.String(), primary_key=True)
    player = db.Column(db.Integer(), ForeignKey('players.id'))
    score = db.Column(db.Integer())
    played_on = db.Column(db.TIMESTAMP)

    def __init__(self, id, player, score, played_on):
        self.id = id
        self.player = player
        self.score = score
        self.played_on = played_on
