
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

Edit the config file: `src/services/configuration.js`

```js
# InstaPy root folder
instaPyFolder: '/path/to/InstaPy'

# server host (your computer host)
serverHost: 'http://localhost:3001'

# allowed connection
allowedHosts: 'http://localhost:3000'
```

## Start the project

```bash
npm start
```

### Load the dashboard at http://localhost:3000

#### Log will start to show up when you start your InstaPy instance

#### For not localhost connection, check src/services/configuration.js for more instructions

## Screenshot:

Activity Monitor:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/instapy-dashboard.png)

Live Log:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/live-log.png)