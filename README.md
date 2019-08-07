# Way Farer

Welcome to way  farer, your premium solution for bus ticketing. This product is built with HTML, CSS & Javascript in the front end as well as being accompanied by a NodeJs server in the back end.

# Directory & File Structure

```
    .... / Server

        .... / routes
        .... / validation
        .... / controllers
        .... / models
        .... / middleware
        .... / helpers
        .... / data
        .... / __test__

    .... / UI

        .... / admin
        .... / assets
            .... / images
        .... / css
        .... / js

    account.html
    admin.html
    forbidden.html
    index.html
    login.html
    signup.html
    trip_details.html

.travis.yml
.README.md

```

# Front End

#### Home Page
![Way farer home page](https://raw.githubusercontent.com/Cheza-Dzabala/wayfarer-images/master/screencapture-127-0-0-1-5500-UI-2019-08-07-07_48_07.png);

#### Account Management
![Way farer account page](https://raw.githubusercontent.com/Cheza-Dzabala/wayfarer-images/master/screencapture-127-0-0-1-5500-UI-account-html-2019-08-07-07_49_24.png)

#### Easy Admin
![Way farer account page](https://raw.githubusercontent.com/Cheza-Dzabala/wayfarer-images/master/screencapture-127-0-0-1-5500-UI-admin-html-2019-08-07-07_49_41.png)

#### Authentication
![Way farer account page](https://raw.githubusercontent.com/Cheza-Dzabala/wayfarer-images/master/screencapture-127-0-0-1-5500-UI-login-html-2019-08-07-07_48_30.png)

![Way farer account page](https://raw.githubusercontent.com/Cheza-Dzabala/wayfarer-images/master/screencapture-127-0-0-1-5500-UI-signup-html-2019-08-07-07_48_50.png)

## Description

## Landing Page
The user interface is built from HTML, CSS & JS. When an unauthenticated user lands on the index page, they are presented with links in the navigation bar (home, sign in, sign up, help)

### Navigation Bar

The navigation is the users map around way farer. It gives them the ability to go from page to page seamlessly.

### Filter through trips [inactive]

This tool will help users search for trips by origin, destination & date

### Trips by origin

This is a section - based list that displays to the user

## Sign In Page

### Login Form
This is where the user will user their email and password to access their Way Farer account. If they enter invalid credentials, they will be notified with an error message that appears above the `email` field. The error specifies what went wrong.

### Links
These links help the user navigate the login page.

#### - Forgot Password
Incase the user has forgotten their password, this link will direct them to the *Forgot Password* page that will help them reset it. 

#### - Sign in Instead
If the user realized they accidentally clicked the wrong link or they already are a Way Farer member, this link will help them sign into the application.

#### - Home
If the user chooses to navigate back to the home page.

## Sign Up Page
### Sign Up Form
### Links
#### - Login instead
#### - Home

## My Account
### Change Password
### Update information

## Admin
### View Trips
### Add Trips
### Add Trips

## Help


# Server

## Coverage

### Code Coverage Results
#### Travis CI Build Status
[![Build Status](https://travis-ci.org/Cheza-Dzabala/way-farer.svg?branch=develop)](https://travis-ci.org/Cheza-Dzabala/way-farer)

#### Codeclimate Test Coverage

[![Test Coverage](https://api.codeclimate.com/v1/badges/ed267fe9629ea8a240ed/test_coverage)](https://codeclimate.com/github/Cheza-Dzabala/wayfarer-server/test_coverage)

#### Coveralls
[![Coverage Status](https://coveralls.io/repos/github/Cheza-Dzabala/way-farer/badge.svg?branch=develop)](https://coveralls.io/github/Cheza-Dzabala/way-farer?branch=develop)

## Routes

### Authentication

#### Sign Up

#### Sign In

### Trips

### Admins

### Bookings
