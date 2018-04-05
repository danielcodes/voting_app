
# steps
# pull from a base image
# install system dependencies
# copy over the root dir of the project
# set the working dir
# install app dependencies
# expose a port to listen to on the container
# start the app

FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /webapps
WORKDIR /webapps

# Installing OS Dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y libsqlite3-dev
RUN pip install -U pip setuptools

COPY requirements.txt /webapps/

RUN pip install -r /webapps/requirements.txt

ADD . /webapps/

# Django service
EXPOSE 8000
