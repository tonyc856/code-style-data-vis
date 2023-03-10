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

## Screenshots
![Screen Shot 2022-10-27 at 10 33 22 PM](https://user-images.githubusercontent.com/21371772/224438695-c376832c-a217-4cf6-ab9e-24d05c9129b0.png)
![Screen Shot 2022-10-27 at 10 33 26 PM](https://user-images.githubusercontent.com/21371772/224438941-5e6cafcb-57ad-466d-ac49-32c5e9331c8e.png)
![Screen Shot 2022-10-27 at 10 33 32 PM](https://user-images.githubusercontent.com/21371772/224439063-a2108df3-5657-4f8e-adf4-7a8eb11de3fa.png)
![Screen Shot 2022-10-27 at 10 33 44 PM](https://user-images.githubusercontent.com/21371772/224440083-7ea23781-a092-4cf5-a666-c88115bb9bcf.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440090-b0de5f09-62bb-498b-b8e4-ebf7a6989ac9.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440101-e5a5b25c-8b44-4253-8811-cc8caa0db8d9.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440108-12a35042-3a32-49e9-a443-353fbcbaedb9.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440114-ab5fff72-3826-494e-9e4e-dedb5ba7a588.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440117-4924e120-4cb9-4d0e-9688-f3b8243846d8.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440133-45a4002c-771d-4b5a-abb6-18c92a4d1464.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440142-a3b980cc-894e-4e8b-a2e6-0e83e31e53b6.png)
![Screen Shot 2022-10-27 at 10 35 06 PM](https://user-images.githubusercontent.com/21371772/224440155-e7b404c4-bfb8-44ba-ae32-372270cfa961.png)
![Screen Shot 2022-10-27 at 10 35 36 PM](https://user-images.githubusercontent.com/21371772/224440167-c1b2ca80-f5a8-4ca8-856a-f72d348d66cc.png)
![Screen Shot 2022-10-27 at 10 35 51 PM](https://user-images.githubusercontent.com/21371772/224440178-3c1ecc41-5a17-471d-b024-7c68d5e505ab.png)
![Screen Shot 2022-10-27 at 10 35 53 PM](https://user-images.githubusercontent.com/21371772/224440186-a802f73b-319f-4fdb-a9f7-171b3126c254.png)
![Screen Shot 2022-10-27 at 10 35 55 PM](https://user-images.githubusercontent.com/21371772/224440204-ee7d1e2b-3563-483a-8fc8-7b431ab4f0d6.png)
![Screen Shot 2022-10-27 at 10 35 57 PM](https://user-images.githubusercontent.com/21371772/224440222-7eb2d5e8-5746-4ba5-82b5-4835d89eaa6b.png)
![Screen Shot 2022-10-27 at 10 35 59 PM](https://user-images.githubusercontent.com/21371772/224440234-9a0d9fc2-fde9-4405-a54c-3beaf16e291a.png)
![Screen Shot 2022-10-27 at 10 36 01 PM](https://user-images.githubusercontent.com/21371772/224440244-58190ae2-7940-4f16-8ff4-9abdecd37c57.png)





