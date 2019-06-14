# code-style-data-vis
Building a data visualization solution for code style mined from thousands of GH public repositories.

We have a separate project for maintaining source code miners and style analyzers (https://github.com/bcdasilv/code-style-mining).

# Developement environment setup:
1. **Install Node.js**\
https://nodejs.org/en/download/

2. **Clone project repository**\
git clone https://github.com/tonyc856/code-style-data-vis.git

3. **Go to /code-style-data-vis directory**\
run `npm install`\
run `npm run client-install`

4. **Create a local .env file for the environment variables**\
Go to the project's root directory and create a file named ".env" with key/value pairs\
`MONGO_DB_URL=`\
`MONGO_DB_NAME=`\
`MONGO_DB_COLLECTION=`\
`MONGO_DB_USERNAME=`\
`MONGO_DB_PW=`

## Running the project (run from project's root)
**npm commands:**\
`npm run dev` - *runs the client and server with nodemon. Use this for deving in the frontend and backend.*\
`npm run client` - *runs the client only*\
`npm run server` - *runs the server only with nodemon*\
`npm start` - *runs the server normally with node*\
`npm run client-install` - *installs the client's dependencies*\
`npm run heroku-postbuild` - *for Heroku to use for deployment purposes only*

***If developing on the frontend side only, run `npm run client` and `npm start`.\
nodemon restarts the server each time changes are made.***

API endpoint location: localhost:3001/api/
