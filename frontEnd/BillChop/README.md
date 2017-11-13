The following are the instructions for how to setup your environment to run BillChop on your machine!

1) Go to our github repository at www.github.com/PeterKaplan/BillChop and clone it to your Home Directory!
Make sure the backend is up and running. We are working on getting AWS 

2) You will need watchman, node, and xCode so please make sure you have those installed as well. You can install watchman and node using the following Homebrew commands:
- brew install watchman
- brew install node

3) Second, make sure you have a React Native Command Line Interface (CLI) on your machine. If you go to your terminal, you can do this by running the command: npm install -g react-native-cli… You should have npm installed with node from the previous step.

4) You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

5) Now, with Xcode open, go ahead and open up the BillChop Xcode project. Do so by selecting“Open another project...” from the bottom right of the Xcode starting screen. Navigate to your home directory where you cloned our repository in the first step. From there go and select the file called “BillChop.xcodeproj” (Located in BillChop/frontEnd/BillChop/ios/BillChop.xcodeproj)...

6) Now that you have opened our application project in Xcode, you will need to install the dependencies required to run our app. Do so by opening a terminal window and navigate by running the following command: “cd BillChop/frontEnd/BillChop”... To install the dependencies, now run the following command: “npm install”.

7) You also need to link of our react native tools. Type “react-native link react-native-document-scanner” and “react-native link react-native-vector-icons” and “react-native link react-native-elements” and “react-native link react-native-contacts” and “react native link react-native-searchbar” into the terminal (inside BillChop/frontEnd/BillChop).

8) Now, you will need to plugin your iPhone into your device via USB. Note that our App requires a camera, and thus will not function correctly using the emulator.

9) Open the Product menu from Xcode's menu bar, then go to Destination. Look for and select your device from the list. Xcode will then register your device for development. Note that by default, you will be building our app for debugging. This means that Xcode will automatically launch a development server that reloads javascript as it is edited. For production use, edit the scheme (Product->Scheme->Edit Scheme) and change it to “Release”.

10) Register for an Apple developer account if you don't have one yet. Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown. Repeat this step for the Tests target in the project.

11) Now, you should be all set to run your device. Select your device in Xcode from the drop down menu. To run, press the play button also located in the top left hand corner of the Xcode window. 
