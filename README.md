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

3. Create the db using command: 
```$psql -f BillChop/dbsetup.sql -v v1='userRole' -v v2='userRolePassword' ```
  where v1 is the PostGres user role you want to create, which will be granted all privileges to the database
  
4. Make the migrations:
```$python3 manage.py migrate ```

5. Create the super user:
```$python3 manage.py createsuperuser```

6. Load the sample data:
```$python3 manage.py loaddata BillChop/fixtures/sampleInputData.json```

7. Run the server:
```$python3 manage.py runserver```

8. Then go to http://127.0.0.1:8000/admin and login and make sure it works
** the login credentials here are the ones you provided for the superuser, not for the postgres role
