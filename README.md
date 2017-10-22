# BillChop

Bill Chop is a revolutionary bill splitting app. 


To get it up and running locally make sure you have these installed: 

http://postgresapp.com/

https://facebook.github.io/react-native/docs/getting-started.html


## Setup 
Set up Postgres & Django locally on your machine. 
1. Download Postgres from here: http://postgresapp.com/ and start it up

2. Install dependencies, run:
```$pip install -r requirements.txt ```

3. Create the local db with these commands:
```
$psql
$CREATE ROLE peter WITH LOGIN PASSWORD 'peter';
$ALTER ROLE peter CREATEDB;
$CREATE DATABASE chop_db;
$GRANT ALL PRIVILEGES ON DATABASE chop_db TO peter;
```

4. Outside the db (\q): 
```python manage.py createsuperuser```

5. Then go to http://127.0.0.1:8000/admin and login and make sure it works
