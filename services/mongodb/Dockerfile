#
# MongoDB Docker Image
#

# Use ubuntu as the base image 
FROM ubuntu:latest
MAINTAINER Shaba Abhiram <shabarivas@gmail.com>

# Check out the docs at docker.io for more info about the
# various bits and pieces being used here.
RUN dpkg-divert --local --rename --add /sbin/initctl

# Install MongoDB server from official repo
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install -y mongodb-10gen pwgen

# Expose port for MongoDB
EXPOSE 27017
EXPOSE 28017
CMD ["mongod", "--smallfiles", "--rest"]