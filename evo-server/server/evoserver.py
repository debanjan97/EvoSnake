from flask import Flask, request, Response
from  core.configmap import DB_URL
from flask_sqlalchemy import SQLAlchemy
from core.utils import generate_uuid
import json
from sqlalchemy import desc
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from core.players import *

db.init_app(app)


@app.route('/add/<object>', methods=['put'])
def hello_world(object):
    request_object = request.get_json(silent=True)
    if object not in ["snake", "player"]:
        return Response(response="Type not supported", status=400)

    if object == "snake":
        for key in ['player', 'score']:
            if not request_object.get(key):
                return Response(response=f"{key} is missing in request body", status=400)
        new_snake = Snake(id=generate_uuid(), player=request_object['player'], score=request_object['score'])
        db.session.add(new_snake)
        db.session.commit()
        return Response(response=json.dumps(new_snake), status=200)

    elif object == "player":
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

    else:
        return Response(reponse="Invalid request", status=400)


@app.route('/get/player/<username>', methods=['get'])
def get_player_by_username(username):
    requested_player = Player.query.filter_by(username=username).first()
    if requested_player is None:
        return Response(response="No such player exists", status=404)
    return Response(response=json.dumps(requested_player.describe_player()), status=200)


@app.route('/get/snake/<id>', methods=['get'])
def get_snakes_by_snakes(id):
    requested_snake = Snake.query.filter_by(id=id).first()
    if requested_snake is None:
        return Response(response="No such snake exist", status=404)
    try:
        return Response(response=json.dumps(requested_snake.describe_snake()), status=200)
    except Exception as e:
        return Response(response="Error in fetching snake details", status=400)


@app.route('/get_previous_player', methods=['get'])
def get_previous_player():
    previous_player = Player.query.order_by(desc(Player.last_played)).first()
    if previous_player is None:
        return Response(response="No player exist in database", status=203)
    return Response(response=json.dumps(previous_player.describe_player()), status=200)



app.run(debug=True, host='0.0.0.0', port='6000')
with app.app_context():
    db.create_all()
db.session.commit()
