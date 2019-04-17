# instapy-dashboard with docker-compose

## Pre-requierments 
Make sure that the instapy-docker folder (yes, that is an assumption as you will run this in docker) is on the same level in the tree as the instapy-dashboard is, else you need to change volume mount in the docker-compose.yaml (../../instapy-docker/docker-compose/InstaPy/)

Change the .env file to the following values,
INSTAPY_FOLDER=/code/InstaPy
ALLOWED_HOSTS=http://*:3000

Example .env file
```
# MacOS: /Users/your_user_name/InstaPy
# you can also check this information when running your quickstart.py,
# the first lines contains
# -> Workspace in use: "/Users/converge/InstaPy"
INSTAPY_FOLDER=/code/InstaPy
# if using only on localhost, keep it:
#ALLOWED_HOSTS=http://localhost:3000 http://192.168.0.100:3000
ALLOWED_HOSTS=http://*:3000 
REACT_APP_API_ENTRY_POINT=http://localhost:3001

# basic setup, ok to keep it ->
# Node port
NODE_PORT=3001
# ReactJS Create APP port
PORT=3000
```
## Usage
* Tested on a ubuntu 18.04 running docker 17.12.1-ce and docker-compose 1.18.0
* Make sure you have the .env file set tin the root folder
* Change your directory to docker-compose
<br>`cd docker-compose`
* Start the build
<br> docker-compose -f docker-compose.yml up -d --build <br>
* Stop container
<br>`docker-compose stop`
* Start docker container
<br>`docker-compose start`
* Stop and remove Docker configs
<br>`docker-compose down`
* Display output logs
<br>`docker logs -f instapy_dashboard_1`
* To see if the container is running
<br>`docker ps`
