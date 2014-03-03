cd share
docker build -t scaffold/mongodb .
docker run -p 27017:27017 -p 28017:28017 -v /home/core/share/db:/data/db -d scaffold/mongodb