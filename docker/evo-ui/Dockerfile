FROM node:latest

WORKDIR /root/EvoSnake/evo-ui

# add `/root/EvoSnake/evo-ui/node_modules/.bin` to $PATH
ENV PATH /root/EvoSnake/evo-ui/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
