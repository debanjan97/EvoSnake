from datetime import datetime
from flask import Blueprint, request
from core.players import Player, db
from core.snake import Snake
from core.utils import generate_uuid, hiss
from sqlalchemy import desc
from sqlalchemy.sql import func
import json

players_blueprint = Blueprint('player_blueprint', __name__)


@players_blueprint.route('/add/player', methods=['PUT'])
def add_player():
    request_object = request.get_json(silent=True)
    if not request_object.get('username'):
        return hiss(message="username is missing in request body", status=400)
    existing_player = Player.query.filter_by(username=request_object['username']).first()
    if existing_player is None:
        new_player = Player(id=generate_uuid(), username=request_object['username'])
        db.session.add(new_player)
    else:
        existing_player.last_played = datetime.now()
    db.session.commit()
    return hiss(message="Successfully Added", status=200)


@players_blueprint.route('/get/player/<username>', methods=['get'])
def get_player_by_username(username):
    requested_player = Player.query.filter_by(username=username).first()
    if requested_player is None:
        return hiss(message="No such player exists", status=404)
    return hiss(message=json.dumps(requested_player.describe_player()), status=200)


@players_blueprint.route('/get_previous_player', methods=['get'])
def get_previous_player():
    previous_player = Player.query.order_by(desc(Player.last_played)).first()
    if previous_player is None:
        return hiss(message="No player exist in database", status=404)
    return hiss(message=json.dumps(previous_player.describe_player()), status=200)


@players_blueprint.route('/<player_id>/highscore', methods=["get"])
def get_player_highscore(player_id):
    try:
        result = Snake.query.with_entities(func.max(Snake.score)).filter_by(player=player_id).first()
        return hiss(message=str(result[0]), status=200)
    except Exception as e:
        print(f"Error in fetching player highscore, {e}")
        return hiss(message=e, status=400)


@players_blueprint.route('/total_highscore', methods=["get"])
def get_total_highscore():
    try:
        result = Snake.query.with_entities(func.max(Snake.score)).first()
        return hiss(message=str(result[0]), status=200)
    except Exception as e:
        print(f"Error in fetching player total highscore, {e}")
        return hiss(message=e, status=400)


@players_blueprint.route('/<player_id>/average_score', methods=["get"])
def get_player_average_score(player_id):
    try:
        result = Snake.query.with_entities(func.avg(Snake.score)).filter_by(player=player_id).first()
        return hiss(message=str(result[0]), status=200)
    except Exception as e:
        print(f"Error in fetching player average highscore, {e}")
        return hiss(message=e, status=400)
