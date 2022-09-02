

Nur Islam 
Sport programmer.
The MERN stack: A complete tutorial
February 26, 2021  20 min read 

MERN Stack A To Z
Editor’s note: This MERN stack tutorial was last updated on 26 February 2021 to expand the frontend portion of the tutorial and to include updated resources.

This tutorial is all about the MERN stack. We’ll outline the basics of the MERN stack and demonstrate how to use it by developing a simple CRUD application from scratch.

To show how the MERN stack works, we’ll first configure the server side by connecting Node.js and Express.js to MongoDB on the backend. Then, we’ll create some APIs. After that, we’ll walk you through building the frontend, using React to build our user interfaces. Once both are complete, we’ll connect the frontend to the backend.

Meanwhile, we’ll cover the following MERN stack topics:

What is the MERN stack?
Server setup with Express.js and Node.js
Database management with MongoDB
Building RESTful APIs with the MERN stack
Building the frontend
Setting up Create React App
Initial project structure
Frontend tasks and features
Adding feature components
Connecting the frontend and backend
Running the frontend and backend
Testing our MERN stack app in the browser
This demo is designed to highlight the MERN setup. The objective is to develop a simple project with the best possible structure so that you can use it as a boilerplate and elevate your MERN stack projects to meet industry standards.

What is the MERN stack?
The phrase MERN stack refers to the following technologies:

MongoDB, a cross-platform document-oriented database program
Express.js, a web application framework for Node.js
React, a JavaScript library for building user interfaces
Node.js, an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser
If you’re a visual learner (and have some time on your hands), check out this comprehensive, up-to-date MERN stack video tutorial:



Server setup with Express.js and Node.js
To begin our MERN stack tutorial, we’ll show you how to set up a server with Express.js and Node.js.

npm package initialization
To create a project folder, enter the folder through the terminal, then run the following command:

$ npm init
Now it will ask you some questions about package name, version, entry point, etc. Hit enter if you want to keep the default. After that, you will get something like this:

Creating Our package.json File
Select yes and you’re ready to go. It creates a file named package.json.

Installing dependencies
Now, I would like to add some dependencies:

$ npm i express mongoose body-parser bcryptjs validation
Type or copy the command above and hit the enter button. You’ll see something like this:

Adding Project File Dependencies
bcryptjs is a password hashing function designed by Niels Provos and David Mazières
body-parser allows us to get the data throughout the request
express is our main framework
mongoose is used to connect/interact with MongoDB
validation (as its name implies) is used for validation
Now I want to add nodemon as a dev dependency. If you don’t want to add this, you can skip it — it’s optional.

More great articles from LogRocket:
Don't miss a moment with The Replay, a curated newsletter from LogRocket
Use React's useEffect to optimize your application's performance
Switch between multiple versions of Node
Learn how to animate your React app with AnimXYZ
Explore Tauri, a new framework for building binaries
Compare NestJS vs. Express.js
Discover popular ORMs used in the TypeScript landscape
$ npm i -D nodemon
nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

At that point, your package.json should look like this:

package.json File With Dependencies
Setting the entry point
Now create a file named app.js for our entry point. You can create this from the project folder with the command below (on Mac):

$ touch app.js
Then paste the code below:

// app.js

const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
Now, run the command

$ node app
You will see Server running on port 8082. You can also check it from the browser: open the browser and enter http://localhost:8082.

At this point, if we change anything, we need to restart the server manually. But if we set up nodemon, then we don’t have to restart it every time; nodemon will watch if there is any change and restart the server automatically.

So what you need to do for that is a little change to the scripts in our package.json file. See below:

// package.json

{
  "name": "mern_a_to_z",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "app": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nurislam03/MERN_A_to_Z.git"
  },
  "author": "Nur Islam",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/nurislam03/MERN_A_to_Z/issues"
  },
  "homepage": "https://github.com/nurislam03/MERN_A_to_Z#readme",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mongoose": "^5.5.15",
    "validation": "0.0.1"
  },
  "devDependencies": {
    "nodemon": "^1.19.1"
  }
}
So, now you can run your project using this command:

$ npm run app
If you get any error at this point, then run the commands below:

$ npm install
$ npm run app
You will see the following changes in your terminal if everything goes right:

Running Project Successfully
Database management with MongoDB
Now it’s time to work on our MERN database setup with MongoDB. For simplicity, we will use MongoDB Atlas.

Creating an account for MongoDB Atlas
MongoDB Atlas is a fully managed cloud database developed by the same team that built MongoDB.

First, you need an account. Create one and follow the procedure. After creating an account, you will see something like this:

MongoDB Atlas Homescreen
Click on the Project 0 section (top left) and you will see a button for creating a new project. Create a project and select the project.

Now, click on the Build a Cluster button from the project you have created. It will show you all the information. At the bottom, you will see a section called Cluster Name, click on that and enter a name for the database, then hit the Create Cluster button.

After two to three minutes, if everything goes well, you will find something like this:

Creating A Cluster In MongoDB Atlas
Click on the CONNECT button and fill in the username and password form for your database.

Setting Up Our Connection
Now hit the Create MongoDB User button. You can also choose either your current IP address or a different IP address, it’s up to you.

Now, if you follow the CONNECT button or the Choose a connection method button, you will see some different methods. Select accordingly.

Connection Methods Options
In this case, select the Connect Your Application section.

Now you will get your database link, which we will use in our next step.

Connection String Output
Our database is ready — now we need to add it to our project.

Inside the project folder, create another folder named config and inside it create two files named default.json and db.js. Add the following code:

// default.json

{
  "mongoURI":
    "mongodb+srv://mern123:<password>@mernatoz-9kdpd.mongodb.net/test?retryWrites=true&w=majority"
}
 /* Replace <password> with your database password */

/* ------------------------------------------------------------------ */
// db.js

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
NOTE: We need a little change in our app.js file to connect to the database. Update your app.js with this:

// app.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));