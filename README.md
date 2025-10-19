# NamaadhuMV
An API app to get prayer times

#### The Stack
* [Node.js](href='https://nodejs.org/') - A free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.
* [Express](href='https://expressjs.com/') - Fast, unopinionated, minimalist web framework for Node.js.
JavaScript for Node.js and browsers.
* [sqlite3](href='https://npmjs.com/package/sqlite3') - Asynchronous, non-blocking SQLite3 bindings for Node.js.

#### How to deploy locally
* Clone this repository
* Install the dependencies by running `npm install`
* Start the server by running `node server.js`
* The web UI should be accessible at https://localhost:6336/

#### Deploy via docker
* Clone this repository
* Change timezone via `TZ` variable in `docker-compose.yml`
* Run `docker compose up -d`
