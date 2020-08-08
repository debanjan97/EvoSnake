from flask import Blueprint, request
from core.players import db
from core.snake import Snake
from core.utils import generate_uuid, hiss
import json

snake_blueprint = Blueprint('snake_blueprint', __name__)


@snake_blueprint.route('/add/snake', methods=['put'])
def add_snake():
    request_object = request.get_json(silent=True)
    for key in ['player', 'score']:
        if not request_object.get(key):
            return hiss(message=f"{key} is missing in request body", status=400)
    new_snake = Snake(id=generate_uuid(), player=request_object['player'], score=request_object['score'])
    db.session.add(new_snake)
    db.session.commit()
    return hiss(message="Snake added successfully", status=200)


@snake_blueprint.route('/get/snake/<id>', methods=['get'])
def get_snake_by_id(id):
    requested_snake = Snake.query.filter_by(id=id).first()
    if requested_snake is None:
        return hiss(message="No such snake exist", status=404)
    try:
        return hiss(message=json.dumps(requested_snake.describe_snake()), status=200)
    except Exception as e:
        return hiss(message="Error in fetching snake details", status=400)


@snake_blueprint.route('/<player_id>/highscore', methods=["get"])
def get_player_highscore(player_id):
    return 0


@snake_blueprint.route('/total_highscore', methods=["get"])
def get_total_highscore():
    return 0

