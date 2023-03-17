## How to start developing

- Install node & npm: https://nodejs.org/en/download/
- Run "npm install"

## How to build and run the app

- Build project "ionic build"
- Sync project "npx cap sync"
- Start app via Xcode or Android Studio on the device "npx cap open android" & "npx cap open ios"

## How to debug via browser

- It's easier to use Android phone for general debugging than iPhone
- Connect phone and change connection settings to "data transfer"
- Open Chrome Browser and open chrome://inspect/#devices
- Open the app on the device
- Klick on the app in your browser
- Now you see the app on your browser

## How to run directly in the browser

- Run "ionic serve"
- Some plugins don't work directly in the browser

## How to update the app dependencies 

- Open package.json 
- Take a look at "dependencies" and "devDependencies"
- Go into every dependency and find out the latest version of the dependency
- Webstorm normally gives you a list of versions while doing so
- Dependencies need to work together. Therefore, not all dependencies can be updated. But you will get feedback on that while installing.
- Run "npm update"
- Run "npm install"
