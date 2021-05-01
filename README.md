# fullstack-react-native

A few things to note about the submission.

Due to the scope of the requested code, I have limited the following aspects to stay within a 3 hour development window:

1. Styling is barebones

2. Locations are searched in the city of Toronto.
   Doing so with GPS requires additional code to verify permission status.

3. Logging that is sent to the backend is limited to a single value of: Accelerometer, Barometer, Magnetometer, Gyroscope every 2 seconds. If I were to spend more time on this, I would log events with a shorter 100ms gap and send the data in batches to cover far more logging resolution.

4. No tests are written





[What_does_the_app_do?]

The app will present the user with a search bar. Search entries are sent to the Google Places API. 
Search results are then displayed below the search bar and the currently selected location will be displayed at the top of the screen
When a location is selected, the "Start Recording" button will appear, pressing this button will start sending a snapshot of various sensor data to the backend API where it will be stored in an SQL database. 

A screenshot of the sent data format is available in the ./screenshots folder




[HOW_TO_LAUNCH]

1) Both ./api and ./demoapp contain a .env.template  -  This file must be used to create .env files with filled out API locations
2) Both ./api and ./demoapp require "npm i" to be ran to install the node_module dependencies.
3) ./demoapp/ios must have "pod install" ran to setup cocoapod dependencies
4) database must can be initialized locally with the ./createTables.sql file
5) Once ENV and Dependencies are downloaded, "npm start" must be ran in both ./api and ./demoapp to start the servers
6) the app must be built in xCode and Android Studio, or ran with npm run ios//npm run android


7) iOS simulators will not sent any logs, unlike the android simulator. For iOS please run on a physical device.
