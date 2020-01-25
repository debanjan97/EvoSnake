from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import ForeignKey

db = SQLAlchemy()

class Snake(db.Model):
    __tablename__ = 'snakes'
    id = db.Column(db.Integer(), primary_key=True)
    player = db.Column(db.Integer(), ForeignKey('players.id'))
    score = db.Column(db.Integer())
    played_on = db.Column(db.TIMESTAMP)

    def __init__(self, id, player, score, played_on):
        self.id = id
        self.player = player
        self.score = score
        self.played_on = played_on