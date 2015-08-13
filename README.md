# MEAN-archetype

A simple MEAN(MongoDB + Express + AngularJS + NodeJS) full stack Javascript archetype with token authentication.

### Tecnologies
* [MongoDB](http://www.mongodb.org/)
* [Express](http://expressjs.com/)
* [AngularJS](https://angularjs.org/)
* [NodeJS](http://nodejs.org/)
* [jQuery](https://jquery.com/)
* [Twitter Bootstrap](http://getbootstrap.com/)
* [Underscore](http://underscorejs.org/)
* [Mongoose](http://mongoosejs.com/)
* [Bower](http://bower.io/)
* [Socket.io](http://socket.io)
* [RequireJS](http://requirejs.org/)

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS Guide](http://expressjs.com/guide/error-handling.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and the [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017). You can also create a free MongoDB instance at [Modulus](https://modulus.io/).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

### Instructions
* First, you'll need to download all dependecies for both the client and the server:
```bash
$ cd mean-archetype
$ npm install
$ cd client
$ npm install
```
* After that, you'll have to configure your MongoDB URL in the next file:
```bash
mean-archetype/config/configDB.js
```
* The next step is create your own encription key at:
```bash
mean-archetype/config/secret.js
```
* Finally, run your server executing the command below:
```bash
npm start
```
* The magic happens at [http://localhost:8080](http://localhost:8080)
