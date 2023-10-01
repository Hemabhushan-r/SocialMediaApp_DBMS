@echo off
cd "backend"
title Running DBMS Project: Social Media App
echo Initiating Backend Startup
start cmd /c nodemon index.js || node index.js
echo Backend Startup Completed
echo Initiating Frontend React App
cd "../frontend"
start cmd /c npm start 
echo Frontend App Started
cd ".."
