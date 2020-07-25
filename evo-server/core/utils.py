import uuid
from flask import Response


def generate_uuid():
    return uuid.uuid4().hex


def hiss(message, status):
    """
    wrapper around flask Response
    :return: Response
    """
    return Response(response=message, status=status)
