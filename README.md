# Calendar events app

This application lists the names of today's google calendar events. 

App is deployed to firebase server: https://calendar-events-281211.firebaseapp.com/. In order to use this app you will have to **sign in to your google account**.
Make sure you have some events in your google calendar or you can add them after log in and press refresh button in the app.

**Note:** This app is not verified by google, because it's for learning purposes only. 

When you get the app isn't verified window on log in, press **Show Advanced >> Go to calendar-events-281211.firebaseapp.com (unsafe)**.

## Using app localy
**To use this app localy you'll have to have valid Google api Client ID and API key.** Once you clone the repository find util.js file and replace CLIENT_ID and API_KEY with your own credentials.

 1. Clone repository
 2. Replace api credencials
 3. Navigate to repository folder via terminal
 4. Type npm install to install dependancies
 5. Type npm run serve
 6. Navigate to http://localhost:8080 in your browser.
