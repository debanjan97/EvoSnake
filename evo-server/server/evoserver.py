from flask import Flask
from core.players import Player
from core.snake import Snake
from  core.configmap import DB_URL
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL

db = SQLAlchemy(app)

db.create_all(app=app)

@app.route('/<whatever>')
def hello_world(whatever):
    return whatever


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port='6000')