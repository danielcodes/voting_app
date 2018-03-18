
### Pollster

Pollster is the voting app from Free Code Camp's curriculum.

### Set up

* `client/` contains the frontend which is a create-react-app project
* `project/` contains the REST API which is built with Django Rest Framework

### Development

To start the application on your own machine:

##### Backend

Start by cloning this repository, then follow these steps:

```
# create a virtualenv
python3.6 -m venv venv

# activate venv
source venv/bin/activate

cd project/
pip install -r requirements.txt
```

I recently switched out my development DB from Sqlite to Postgres, so here you can either create your own Postgres DB or just swap it out with the default Sqlite one. To do the latter:

```
# in project/settings.py
# change the value in DATABASES['default']

# from this
{
  'ENGINE': 'django.db.backends.postgresql_psycopg2',
  'NAME': 'pollster',
  'USER': 'daniel',
  'PASSWORD': 'password',
  'HOST': 'localhost',
  'PORT': '',
}

# to this
{
  'ENGINE': 'django.db.backends.sqlite3',
  'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
}
```

After the DB has been set up, run:

```
python manage.py makemigrations
python manage.py migrate
```

##### Frontend

```
cd client/

# install dependencies
npm install

# start development server
npm start
```

### User stories

- [x] As an authenticated user, I can keep my polls and come back later to access them.
- [x] As an authenticated user, I can share my polls with my friends.
- [x] As an authenticated user, I can see the aggregate results of my polls.
- [x] As an authenticated user, I can delete polls that I decide I don't want anymore.
- [x] As an authenticated user, I can create a poll with any number of possible items.
- [x] As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
- [x] As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
- [x] As an authenticated user, if I don't like the options on a poll, I can create a new option.

