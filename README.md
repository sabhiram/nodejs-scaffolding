# NodeJS Scaffolding


## What is this?

## Really, another node "scaffolding" project?

## Ok, How do I use it?

Install the following things before you get started:
* [NPM](https://www.npmjs.org/)
* [NodeJS](http://nodejs.org/)

#### Get the project
```
git clone https://github.com/sabhiram/nodejs-scaffolding app
cd app
```

#### Get dependencies, and start the server
```
npm update
npm start
```
However, note that this assumes that you  have a valid connection to a MongoDB instance. Don't have a Mongo instance handy? Fret not, keep reading to find out how to automatically run your tests, and spin up a test db personalized just for you.


## Deeper Dive:

#### Pre-requisites for advanced usage
* [mkdocs](http://www.mkdocs.org/) - to autogenerate documentation
* [Vagrant](http://www.vagrantup.com/) - Bring up and provision VMs quickly
* [Docker](https://www.docker.io/) - Containers inside VMs are fun!
* [Grunt](http://gruntjs.com/) - for running tasks
```
npm install -g grunt-cli
```

#### Bring up a MongoDB instance for testing
Once you have the Grunt CLI, run the following from the root dir:
```
cd app
grunt mongo_up
```
This might prompt you for a password, this is for vagrant to mount some NFS shared folders. Once this is done, you have a MongoDB instance running at 172.12.8.155:27017 (and :28017 for the admin port)

#### Setup Mkdocs for auto-documentation
TODO

#### Automatically Lint and test code as it changes
There will be a more elaborate explanation of how this works in the official documentation "site" which is auto-generated by this project.
```
grunt watch
```

## References:
This project references the following projects, and I owe these a much longer tribute :)
* Grunt
* Mkdocs
* Angular
* Mocha
* Mongoose
* Docker
* Vagrant
* -- more that I am not able to recall now --
