
## MacOS Install

### 1. Install Project Dependencies:

```bash
# brew install
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# node, npm and git install
brew install node npm git
```

### 2. Install InstaPy-Dashboard

```bash
git clone https://github.com/converge/instapy-dashboard.git
cd instapy-dashboard
npm install
```

## Linux Install

### 1. Install Project Dependencies:

```bash
# node and npm
sudo apt-get update ; sudo apt-get install nodejs npm git

# Debian is still using a very old version of nodejs, update/install it:
# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nodejs
```

### 2. Install InstaPy-Dashboard

```bash
git clone https://github.com/converge/instapy-dashboard.git
cd instapy-dashboard
npm install
```

## Windows Install

### 1. Install Project Dependencies:

**Official documentation from** https://www.npmjs.com/package/npm

#### Super Easy Install
npm is bundled with node.

[Get the MSI](https://nodejs.org/en/download/). npm is in it.

### 2. Install InstaPy-Dashboard

```bash
git clone https://github.com/converge/instapy-dashboard.git
cd instapy-dashboard
npm install
```

## Project Setup

Create a ```.env``` with this content:

```js
# MacOS: /Users/your_user_name/InstaPy
# you can also check this information when running your quickstart.py, 
# the first lines contains
# -> Workspace in use: "/Users/converge/InstaPy"
INSTAPY_FOLDER=/Users/converge/InstaPy
# if using only on localhost, keep it:
ALLOWED_HOSTS=http://localhost:3000 http://192.168.0.100:3000
REACT_APP_API_ENTRY_POINT=http://localhost:3001

# basic setup, ok to keep it ->
# Node port
NODE_PORT=3001
# ReactJS Create APP port
PORT=3000
```

Windows user ? Don't add ```c:``` in the ```InstaPyFolder```, it should be ```\path\to\InstaPy``` without the ```c:```

## Start the project

```bash
npm start
```

### Load the dashboard at http://localhost:3000

#### Logs will start showing up when you start your InstaPy instance.

## Screenshot:

Activity Monitor:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/instapy-dashboard.png)

User Statistics:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/user-statistics-chart.png)

Live Log:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/live-log.png)
