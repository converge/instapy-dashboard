
## MacOS Install

### 1. Install Project Dependencies:

```bash
# brew install
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# node and npm install
brew install node npm git
```

### 2. Install InstaPy-Dashboard

```bash
git clone https://github.com/converge/instapy-dashboard.git
cd instapy-dashboard
npm install
```

### 3. Set InstaPy path

```bash
vi src/services/server.js
# Update instapyRootFolder variable with the right path to your InstaPy folder
instapyRootFolder = '/path/to/InstaPy'
```

---

## Linux Install

### 1. Install Project Dependencies:

```bash
# node and npm
sudo apt-get update ; sudo apt-get install nodejs npm git
```

### 2. Install InstaPy-Dashboard

```bash
git clone https://github.com/converge/instapy-dashboard.git
cd instapy-dashboard
npm install
```

### 3. Set InstaPy path

```bash
vi src/services/server.js
# Update instapyRootFolder variable with the right path to your InstaPy folder
instapyRootFolder = '/path/to/InstaPy'
```

---

## Start the project

```bash
npm run start
```

## Load the dashboard at http://localhost:3000

> Log will start to show up when you start your InstaPy instance

## Screenshot:

Activity Monitor:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/instapy-dashboard.png)

Live Log:
![img](https://github.com/converge/instapy-dashboard/blob/master/screenshots/live-log.png)