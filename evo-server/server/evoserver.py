from flask import Flask, request, Response
from core.players import Player
from core.snake import Snake
from  core.configmap import DB_URL
from flask_sqlalchemy import SQLAlchemy
from core.utils import generate_uuid

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.route('/add/<object>', methods=['POST'])
def hello_world(object):
    request_object = request.get_json(silent=True)
    if object not in ["snake", "player"]:
        return Response(response="Type not supported", status=400)

    if object == "snake":
        for key in ['player', 'score', 'played_on']:
            if not request_object.get(key):
                return Response(response=f"{key} is missing in request body", status=400)
        new_snake = Snake(generate_uuid(), request_object['player'], request_object['score'], request_object['played_on'])
        db.session.add(new_snake)
        db.session.commit()

    elif object == "player":
        if not request_object.get('username'):
            return Response(response="username is missing in request body", status=400)
        new_player = Player(id=generate_uuid(), username=request_object['username'])
        db.session.add(new_player)
        db.session.commit()

    else:
        return Response(reponse="Invalid request", status=400)





if __name__ == '__main__':
    db.create_all()
    db.session.commit()
    app.run(debug=True, host='0.0.0.0',port='6000')