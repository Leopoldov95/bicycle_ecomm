# MERN Stack ECommerce Website <img src='https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg' width='50' /><img src='https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg' width='50' /><img src='https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg' width='50' /><img src='https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg' width='50' />
## Table of Contents
* [General Info](#general-info)
* [Usage](#usage)
* [Features](#features)
* [Screenshot](#screenshot)
* [Technologies](#technologies)
* [What I Learned](#what-i-learned)
* [Google Sign In Issues](#google-sign-in-issues)


## General Info
This is a full MERN stack Ecommerce website created using MongoDB, Express.JS, ReactJS, and NodeJs. This is a proof of concept for a bicycle ecommerce website where a user can browse through the shop's inventory, add and/or remove items to/from a shopping cart, and allow the user to create an account or login using Google login. 

## Screenshot
![ScreenShot](https://github.com/Leopoldov95/bicycle_ecomm/blob/main/screenshot.png?raw=true)

## Usage
Simply click on the demo link provided.
If you wish to download the code and use it, you must first download or clone the repo.
If you want to use your own MongoDb Atlas server, you must configure the .env file with your MongoDB database and then run ```npm install ``` to install the dependencies and then start the server with ```npm start ```

If you just want to use the client then simply go to the client folder, run ```npm install ``` to install the dependencies and then start the client with ```npm start ```

## Features
* Fullstack MERN ECommerce wesbite that utilizes CRUD
* User can add/remove and delete items from the shopping cart
* Both guests and registered users can add items to the shopping cart
* A MongoDB database where the user can login/created an account and store items that are in the shopping cart
* Google login for easier login
* User can use filters to narrow down the items
* A easy to use navbar that shows the bicycles based on their categories
* Website is fully responsive and looks great across multiple platforms


## Technologies
The app was created with the following technologies
* MongoDB
* Express.JS
* ReactJS
* NodeJS


## What I Learned
This has been my largest project created so far. This is actually my second attempt at creating a full stacked ECommerce website, but my first iteration did not utilize a database and therefore the end result had many many issues. This project was the most I have ever delved with the backend side of web programming and it certainly has been a challenge. I learned how to use MongoDB Atlas as a database to store information and how to retrieve that information onto the front-end. I learned better folder structure and how to many if a logged in user vs a guest has certain privileges to access certain features. 

## Google Sign In Issues
I am using Google OAuth 2.0 for Google User authentication. If you are unable to sign in, you may have to clear your browsers cache in order to get this feature to work.
