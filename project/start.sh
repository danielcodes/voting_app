#!/bin/bash

# Start Gunicorn processes
#echo Starting Gunicorn.
#exec gunicorn project.wsgi:application \
	#--bind 0.0.0.0:8000 \
   # --workers 3

python manage.py runserver 0.0.0.0:8000
