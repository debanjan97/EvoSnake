from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import ForeignKey

db = SQLAlchemy()


class PlayerException(Exception):
    pass


class SnakeException(Exception):
    pass


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(50))
    last_played = db.Column(db.TIMESTAMP, default=datetime.now)

    def __init__(self, id, username, last_played=None):
        self.id = id
        self.username = username
        self.last_played = last_played or datetime.now()

    def describe_player(self):
        return dict(id=self.id, username=self.username, last_played=self.last_played.strftime("%m/%d/%Y, %H:%M:%S"))


class Snake(db.Model):
    __tablename__ = 'snakes'
    id = db.Column(db.String(), primary_key=True)
    player = db.Column(db.String(), ForeignKey('players.id'))
    score = db.Column(db.Integer())
    played_on = db.Column(db.TIMESTAMP)

    def __init__(self, id, player, score, played_on=None):
        self.id = id
        player = Player.query.filter_by(username=player).first()
        if player is None:
            raise SnakeException("No player found for this snake")
        self.player = player.id
        self.score = score
        self.played_on = played_on or datetime.now()

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

