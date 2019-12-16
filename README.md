# Fittrack
#### By: Jonathan, Zachary, Laura, William, and Wayne

Fittrack is a website that helps user’s keep track of their daily exercise,
eating, and drinking habits. Through Fittrack the user can set daily/weekly exercise goals.
The website will keep track of the user’s progress towards his/her goal. In addition, users can creat a personalized bio, upload their own profile image, and other user information.

  The website will not only track the user’s progress, it will also help them achieve their goals. The
site will have pre-set exercises that the user will be able to choose from. This way the user feels like
they have some direction in their exercises.

  The organizational structure is the frontend folder is inside of the backend folder (because of dependencies on Heroku), where the backend folder will hold the server.js, routes folder, and MongoDB models. The frontend folder will hold a public folder (static files - css & images, and js functionalities), and the views (homepage i.e. index.html, and multiple ejs files for dashboard, etc.).
  
  To build/run use cd to move to backend folder, and then type in 
```
node server.js
```
  To view locally go to "http://localhost:5000/" to view the homepage and navigate to the login/signup page
