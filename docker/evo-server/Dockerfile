FROM python:3.6.5-slim-stretch
WORKDIR /root
RUN apt-get update && apt-get install curl -y
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt