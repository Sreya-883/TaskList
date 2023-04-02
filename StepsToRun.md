I have developed it using ReactJS , NodeJS , ExpressJS , MySQL 

To run run this project you need to have these dependencie in your vs code

"name": "frontend", "version": "0.1.0", "private": true,
"dependencies": { "@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0", 
"axios": "^1.3.4", 
"bootstrap": "^5.2.3",
"json-server": "^0.17.3",
"react": "^18.2.0",
"react-bootstrap": "^2.7.2", 
"react-dom": "^18.2.0", 
"react-hook-form": "^7.43.9", 
"react-icons": "^4.8.0",
"react-router-dom": "^6.10.0",
"react-scripts": "5.0.1", 
"web-vitals": "^2.1.4",
"body-parser": "^1.20.2",
"cors": "^2.8.5",
"express": "^4.18.2",
"mysql": "^2.18.1", 
"nodemon": "^2.0.22"}

-----STEPS TO FOLLOW------

First Create a folder which consists of

 ->A frontend folder
 
 ->A backend folder
 
 and Clone/copy my repository 
 
 ----USE VS CODE TO RUN----
 
 //For FRONTEND
 
- Create a React app

-open terminal and install all dependencies using npm install

-Use npm Start command to start the app

//For BACKEND

->Install mysql workbench

->create database called "todolistdb"

->create a table called "tasklist"

->add colums to the tasklist

  -colum_name  Data_type
  
   -id         int           check(Primary key,not null,auto increment)
   
   -task       varchar(45)
   
   -startTime  TIME(10)
   
   -endTime    Time(10)
   
   -priority   varchar(15)
   
   -personal   varchar(10)
   
   -status     varchar(10)
   
 ->Click on apply
 
 ->now open terminal in backend folder and use command "nodemon start"
 
 * Once this proccess is successfull u will be redirected to the page (after you start react app i.e using npm start in terminal of frontend folder) where you can inspect functionality of this app
 
 ///FUNCTIONALITY///
 
 This app Layout consists of
 
   -A Sidebar(nav bar)
   
   -Outlet
   
 Using this app you can
 
 -ADD TASKS
 
 -UPDATE TASKS
 
 -EDIT TASKS
 
 -DELETE TASKS(Specific task / All taks)
 
 -VIEW ALL TASKS (PENDING & COMPLETED)
 
 //You CAN MARK TASKS as COMPLETED OR PENDING
 
 TASKS are Prioritised as:
 
 -HIGH
 
 -MEDIUM
 
 -LOW
 
* Personal Tasks are shown seperately.

NOTE: This is the project TODOAPP made for UNPLATFORMS as part of intern excercise.


/----------------------- THANK YOU --------------------------/


 
 
