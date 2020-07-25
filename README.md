# Course Discussion Tracker

<h1>Introduction</h1>
Welcome! This app can display a heatmap of your course discussion data fetched from Canvas. The following is just a sample of what one of my courses looks like. The next steps will be to work with styling and deploy it onto Netifly</br>

![Image of Heatmap](https://github.com/reginawongg/course-activity-tracker/blob/master/demo.png)

<h1>Instructions</h1>

Make sure  `npm install`  is ran first and installed

<h3>Frontend:</h3> 
1. navigate to `/frontend` and run: `npm start` on terminal </br>

<h3>Backend:</h3> 
1. Navigate to the `/backend` folder
2. Create an `.env` file inside and copy and paste the following code into it: 
```
CANVAS_API_TOKEN=
CANVAS_API_DOMAIN=https://ubc.instructure.com/api/v1
```
3. Add your personal CANVAS_API_TOKEN found on canvas.
2. Run `npm start` on terminal </br>

Note: npm start must be run on 2 terminals, frontend and backend

