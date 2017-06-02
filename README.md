# SignUpApp

This project is about a simple Sign up application, that checks whether the user name entered is correct and then enables the Submit button based on certain conditions. If the domain name is invalid or there is a typo, it will give suggestions for auto-correction.
The application will run both in browser as well as mobile using the URL:
https://pujabasu.github.io/signup-app/
Or can also run locally following the below guideline:

# Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31.

Download/ clone the project from the github repository:
https://github.com/pujabasu/signup-app.git

Open the project in an instance of Visual Studio/ Visual Studio Code and navigate to the project folder in command prompt and install the node_modules folder:

### npm install.

For that Node needs to be installed first.

# Building the Application

To build the application use the command 

### ng build

in the command prompt.

# Hosting the Application

### ng serve

This will host the application locally in angular's default server port localhost:4200

Open the Chrome in browser and go to
### http://localhost:4200

Check out the result by giving some valid/invalid usernames in the UserName textbox and check the error-message displayed.

To view it globally, both browser and mobile can go to the site: 
### https://pujabasu.github.io/signup-app/

in which the application is published through github.

# Test the Application

Inorder to test use

### ng test 

This will list all the successful and failure tests and also launch the Karma in Chrome. Debug can be done by pressing the Debug button and the tests can also be viewed in the console. 

# CLI commands used for generating the project

### ng new Project_Name
### ng g component Component_Name
### ng g service Service_Name --spec (to generate the test file against the service class along with the service file generation)
### ng serve
### ng build
### ng test
### ng lint (for checking the lint errors)
### ngh (for publishing the application after hosting the pages in github).

