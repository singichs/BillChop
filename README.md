# BillChop

Bill Chop is a revolutionary bill splitting app. 


To get it up and running locally make sure you have these installed: 

http://postgresapp.com/

https://facebook.github.io/react-native/docs/getting-started.html


## Backend Setup 

Our backend is currently being hosted on AWS, but these are the steps we took to set our backend up locally.

Set up Postgres & Django locally on your machine. 
1. Download Postgres from here: http://postgresapp.com/ and start it up

2. Install dependencies, run:
```$pip install -r requirements.txt ``` and 
```$brew install tesseract ```

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


Note: To get a JSON version of the current models in the DB run this, change auth.user to whichever model you want:
```$python manage.py dumpdata auth.User --indent 4 > users.json```

## Front End Setup
The following are the instructions for how to setup your environment to run BillChop on your machine!

Go to our github repository at www.github.com/PeterKaplan/BillChop and clone it to your Home Directory!

You will need watchman, node, and XCode so please make sure you have those installed as well. You can install watchman and node using the following Homebrew commands:

brew install watchman
brew install node

Second, make sure you have a React Native Command Line Interface (CLI) on your machine. If you go to your terminal, you can do this by running the command: npm install -g react-native-cli 

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

Now, with Xcode open, go ahead and open up the BillChop Xcode project. Do so by selecting “Open another project...” from the bottom right of the Xcode starting screen. Navigate to your home directory where you cloned our repository in the first step. From there go and select the file called “BillChop.xcodeproj” (Located in BillChop/frontEnd/BillChop/ios/BillChop.xcodeproj)...

Now that you have opened our application project in Xcode, you will need to install the dependencies required to run our app. Do so by opening a terminal window and navigate by running the following command within the cloned repository: “cd BillChop/frontEnd/BillChop”... To install the dependencies, now run the following command: “npm install”.

You also need to link of our react native tools. Type into the terminal (inside BillChop/frontEnd/BillChop):
react-native link react-native-document-scanner
react-native link react-native-vector-icons
react-native link react-native-elements
react-native link react-native-contacts
react native link react-native-searchbar

Now, you will need to plugin your iPhone into your device via USB. Note that our App requires a camera, and thus will not function correctly using the emulator.

Open the Product menu from Xcode's menu bar, then go to Destination. Look for and select your device from the list. Xcode will then register your device for development. Note that by default, you will be building our app for debugging. This means that Xcode will automatically launch a development server that reloads javascript as it is edited. For production use, edit the scheme (Product->Scheme->Edit Scheme) and change it to “Release”.

Register for an Apple developer account if you don't have one yet. Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown. Repeat this step for the Tests target in the project.

Now, you should be all set to run your device. Select your device in Xcode from the drop down menu. To run, press the play button also located in the top left hand corner of the Xcode window.
