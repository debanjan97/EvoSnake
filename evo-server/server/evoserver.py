from flask import Flask, request, Response
from  core.configmap import DB_URL
from flask_sqlalchemy import SQLAlchemy
from core.utils import generate_uuid
import json
from sqlalchemy import desc
from datetime import datetime
from core.controllers.players import players_blueprint
from core.controllers.snake import snake_blueprint

app = Flask(__name__)

app.register_blueprint(players_blueprint)
app.register_blueprint(snake_blueprint)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from core.players import *

db.init_app(app)


with app.app_context():
    db.create_all()
    
app.run(debug=True, host='0.0.0.0', port='6000')
