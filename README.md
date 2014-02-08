Building a client / server app from scratch
===========================================

Off late I have been contemplating building cool software for the web. While it is enthralling to pontificate about awesome social networks, machine learning, newly warranted web services and what-have-yous, it takes a lot of energy to actually sit down and get going on any such "idea." This got me thinking a bit more about all the work I would need to do just to set-up infrastructure for a POC. Being very good at being lazy, I started to notice that a most of the things I wanted to build ended up needing a lot of the same core pieces:
0. A scalable base architecture
1. A good logger
2. Simple testing framework which encourages the addition of tests
3. ReSTful, testable, self-documented API
4. Flexible, testable, client-side framework
5. Content deployment for asset files
6. User management
7. CI and automatic deployment / testing

Ok, so lets look into these a bit closer so we can decide on what technologies to use to make all this gel nicely together. At the end of this all, we hope to have a server which scales, has an easy to use and robust testing framework, and is wired up in a way where deployment and testing become automatic. We also aim to make this recipe as generic as possible so that it can be our rapid-engineering starting point for almost any web endevor.

0. A Scalable base architecture
===============================

The web today is full of so many different frameworks and services, offering the careful developer a way to intricately weave a project together with very minimal effort. The first choice we have to make is deciding what server architecture we wish to persue. Should all this be built on top of python? What about playing around with something like go, or rails? I ended up turning to [NodeJS][1] + [Express][2] for a couple of reasons:
0. It is very widely adopted and has many amazingly well-documented modules
1. The server language is the same as the client's (javascript)
2. Express offers really awesome server side templating and route management
3. NPM is a pretty awesome package manager
4. It is painfully easy to deploy, be it in a docker container or on some hosted service somewhere
5. Provides a similar client / server debugging experience (using node-debug etc)

--> Base nodejs application with index.js
--> Parse arguments like deployment env, port etc
--> Setup npm init to generate package.json file
--> Code snippets to show server etc... make branches in git project for each of these steps
--> Talk about base modules we use - Async, underscore, nconf, argument parsing etc...


1. A good logger
================

Ok so we picked NodeJS as the base architecture for the server layer. Some quick googling will lead you to an [exhausting list][3] of logging apperatus in the node world. You probably could not go wrong with most of the loggers in that list, but after a bit of homework I quickly settled on [Winston][4].

It offers the ability to hook up multiple transports (pre-defined ones like console, file, etc as well as custom ones) to your logger object. It comes with profiling tools by default as well which can help instrumenting crucial functions in our tests (more on that later). Winston also has some pretty cool exception handling which allows the user to define a custom exception transport to log exceptions. It is also possible to register custom logging levels with Winston and color code the same!

--> Example usage of winston
--> Setup unhandled exception logging
--> Setup custom log levels and colors, along with appropriate logging to file (see if its possible to direct certain messages to certain files with the same logger)

2. Simple test framework
========================

3. ReSTful, testable, self-documented API
=========================================

4. User management
==================

5. Flexible, testable, client-side framework
============================================

6. Content deployment for asset files
=====================================

7. CI and automatic deployment / testing
========================================


[1] http://nodejs.org/
[2] http://expressjs.com/
[3] https://github.com/joyent/node/wiki/modules#wiki-logs
[4] https://github.com/flatiron/winston