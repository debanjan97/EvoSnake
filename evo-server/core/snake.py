from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import ForeignKey
from core.players import db, Player


class SnakeException(Exception):
    pass


class Snake(db.Model):
    __tablename__ = 'snakes'
    id = db.Column(db.String(), primary_key=True)
    player = db.Column(db.String(), ForeignKey('players.id'))
    score = db.Column(db.Integer())
    played_on = db.Column(db.TIMESTAMP)
    duration = db.Column(db.Integer())
    no_of_moves = db.Column(db.Integer())

    def __init__(self, id, player, score, duration, no_of_moves, played_on=None):
        self.id = id
        player = Player.query.filter_by(username=player).first()
        if player is None:
            raise SnakeException("No player found for this snake")
        self.player = player.id
        self.score = score
        self.played_on = played_on or datetime.now()
        self.duration = duration
        self.no_of_moves = no_of_moves

    def describe_snake(self):
        player = Player.query.filter_by(id=self.player).first()
        if player is None:
            raise SnakeException("No player found for this snake")
        return dict(
            id=self.id,
            player_info=player.describe_player(),
            score=self.score,
            played_on=self.played_on.strftime("%m/%d/%Y, %H:%M:%S")
        )
