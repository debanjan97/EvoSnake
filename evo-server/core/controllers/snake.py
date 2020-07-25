from flask import Blueprint, request, Response
from core.players import db
from core.snake import Snake
from core.utils import generate_uuid

snake_blueprint = Blueprint('snake_blueprint', __name__)


@snake_blueprint.route('/add/snake', methods=['put'])
def add_snake():
    request_object = request.get_json(silent=True)
    for key in ['player', 'score']:
        if not request_object.get(key):
            return Response(response=f"{key} is missing in request body", status=400)
    new_snake = Snake(id=generate_uuid(), player=request_object['player'], score=request_object['score'])
    db.session.add(new_snake)
    db.session.commit()
    return Response(response="Snake added successfully", status=200)


@snake_blueprint.route('/get/snake/<id>', methods=['get'])
def get_snake_by_id(id):
    requested_snake = Snake.query.filter_by(id=id).first()
    if requested_snake is None:
        return Response(response="No such snake exist", status=404)
    try:
        return Response(response=json.dumps(requested_snake.describe_snake()), status=200)
    except Exception as e:
        return Response(response="Error in fetching snake details", status=400)
