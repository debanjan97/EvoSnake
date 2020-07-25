from flask import Blueprint, request, Response
from core.players import Player, db
from core.utils import generate_uuid

players_blueprint = Blueprint('player_blueprint', __name__)


@players_blueprint.route('/add/player', methods=['PUT'])
def add_player():
    request_object = request.get_json(silent=True)
    if not request_object.get('username'):
        return Response(response="username is missing in request body", status=400)
    existing_player = Player.query.filter_by(username=request_object['username']).first()
    if existing_player is None:
        new_player = Player(id=generate_uuid(), username=request_object['username'])
        db.session.add(new_player)
    else:
        existing_player.last_played = datetime.now()
    db.session.commit()
    return Response(response="Successfully Added", status=200)


@players_blueprint.route('/get/player/<username>', methods=['get'])
def get_player_by_username():
    requested_player = Player.query.filter_by(username=username).first()
    if requested_player is None:
        return Response(response="No such player exists", status=404)
    return Response(response=json.dumps(requested_player.describe_player()), status=200)


@players_blueprint.route('/get_previous_player', methods=['get'])
def get_previous_player():
    previous_player = Player.query.order_by(desc(Player.last_played)).first()
    if previous_player is None:
        return Response(response="No player exist in database", status=404)
    return Response(response=json.dumps(previous_player.describe_player()), status=200)
