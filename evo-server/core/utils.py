import uuid
from flask import Response
import sqlalchemy
from core.configmap import DB_URL
import logging

log = logging.getLogger('evosnake')


def generate_uuid():
    return uuid.uuid4().hex


def get_columns(table, engine=None):
    engine_provided = False
    if engine is None:
        engine = sqlalchemy.create_engine(DB_URL)
        engine_provided = True
    try:
        inspector = sqlalchemy.inspect(engine)
        columns = inspector.get_columns(table)
        return {column['name']: column for column in columns}
    except Exception as e:
        pass
    finally:
        if engine_provided:
            engine.dispose()



def hiss(message, status):
    """
    wrapper around flask Response
    :return: Response
    """
    return Response(response=message, status=status)
