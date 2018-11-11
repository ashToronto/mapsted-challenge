# Mapsted challenge

## About
This project fetches data from 2 api's that share a common key. It then goes about to render the appropriate queries onto ejs templates.

There are 6 queries that are addressed. Each query result is rendered on its own page.

## Development Dependencies
* express 4.16.4 or above
* ejs 2.6.1 or above
* Axios

### Getting started
* Use the git clone command or fork this repository.
* Install all dependencies (using the npm install command).
* Run the development web server using the 'node server' command.
* Open your web-browser to  (http://localhost:3000/)

If you already have an application running on port 3000, you may change to a port of your choice from the server.js file

### ScreenShots
!["Welcome page"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/welcome_page.png?raw=true)
!["Q1"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/case1_samsung.png?raw=true)
!["Q2"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/case2_item47.png?raw=true)
!["Q3"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/case3_category7.png?raw=true)
!["Q4"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/case4_ontario.png?raw=true)
!["Q5"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/case5_US.png?raw=true)
!["Q6"](https://github.com/ashToronto/mapsted-challenge/blob/master/docs/case6_building.png?raw=true)

### Coding Log, Processes, Thoughts, Challenges
The main challenge I faced in this project was the volume of data I had to tackle as well as the way it was structured. I was confident that the operations I performed on the data were valid but I had to make sure the incoming data was accurate. There were not many tests I could run on the final results to see if they were correct so I had to come up with more clever ways to ensure that the data I was receiving was correct. I mainly focused on looking for patterns in the api's.

The overall challenge got progressively easier as I became more familiar with the data-sets. I focused on making sure I was producing modular and re-usable code. There were moments where I could have applied the map() method or more advanced looping structures but I chose to keep it simple and stick with the basic for loop. I found that using the basic 'for loop', I was able to visualise the structure to the data much more easily.

### Bugs
There is one bug in the United States query. If you relocate away from the page and return, the array cache with prior data does not clear. This means that the value of US purchase costs will keep doubling if you continue to re-render the page. I would ask that you take the very first instance of the value as my final solution.
