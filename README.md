# Way Farer

Welcome to way  farer, your premium solution for bus ticketing. This product is built with HTML, CSS & Javascript in the front end as well as being accompanied by a NodeJs server in the back end.


[![Build Status](https://travis-ci.org/Cheza-Dzabala/way-farer.svg?branch=develop)](https://travis-ci.org/Cheza-Dzabala/way-farer)

[![Test Coverage](https://api.codeclimate.com/v1/badges/ed267fe9629ea8a240ed/test_coverage)](https://codeclimate.com/github/Cheza-Dzabala/wayfarer-server/test_coverage)

[![Maintainability](https://api.codeclimate.com/v1/badges/d65680d77a4ef3c2d377/maintainability)](https://codeclimate.com/github/Cheza-Dzabala/way-farer/maintainability)

[![Coverage Status](https://coveralls.io/repos/github/Cheza-Dzabala/way-farer/badge.svg?branch=develop)](https://coveralls.io/github/Cheza-Dzabala/way-farer?branch=develop)


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

This is where the user will user their `email`, `password`, `first_name`, `last_name`, `password` & `password_confirmation` to create a way farer account.

### Links
These links help the user navigate the sign up page.

#### - Login instead
This link takes the user to the login screen

#### - Home
This link takes the user to the admin panel

## My Account
This is where the user manages their data and views their information.

### Change Password
This is where the user changes their password.

### Update information
This is where the user can update their email

## Admin
This is the administration panel for admin accounts. Admins can navigate here via the admin menu item in the navigation bar.

### View Trips
The admin is able to view scheduled trips, see users assigned to that trip and if they need to, cancel the trip.

### Add Trips
Here the admin is able to create new trips.

### Add Admin
This is where the admin can create and add other admin accounts.

### View Admin
This is where the admin can view other admin accounts.

### View Admin
This is where the admin can view trips scheduled by user. 

## Help


# Server

The server application is built NodeJs & Express.

## Routes

Belowe are the endpoints that will facilitate the communication with the UI of the application.

### Authentication

These are the authentication routes. They will always return a token.

Create a .env file in the ` / server` directory. Copy the key from the `.env.example` file and append your own secret key to the file.
#### Sign Up

###### Sign Up To Way Farer

Method: `[POST]`

`api/v1/auth/signup`

`Entity Spec:`

```javascript

headers('CONTENT-TYPE', 'application/json')

body: {
    email: String, | Required
    first_name: String, | Required
    last_name: String, | Required
}
```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data: {
        id: String
        email: String,
        first_name: String,
        last_name: String,
        token: JWT
    }
}

```
#### Sign In


Method: `[POST]`

`api/v1/auth/signin`

`Entity Spec:`

```javascript

headers('CONTENT-TYPE', 'application/json')

body: {
    email: String, | Required
    password: String | Required [Alpha numeric]
}
```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data: {
        user_id: Integer,
        email: String,
        first_name: String,
        last_name: String,
        token: JWT
    }
}

```
### Bookings

Note: All routes in `api/v1/bookings/` require the request to have a header in the format 

`key: token, value: bearer + JWT`

#### User views their booking

[If the user is an admin, the same route will return all user bookings]

[If the user is a normal user, the route will return only that user's bookings]

METHOD: `[GET]`

`api/v1/bookings`


`Entity Spec:`

```javascript

headers[
    ['CONTENT-TYPE', 'application/json'],
    ['token', 'bearer + JWT'],
]

body: {}

```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data: [
            {
                booking_id: Integer,
                allocated_seat: String,
                bus_license_number: String,
                trip_date: Date,
                first_name: String,
                last_name: String,
                user_email: String
            }
    ]
}

```

#### User creates a booking

Only the trip_id

METHOD: `[POST]`

`api/v1/bookings`


`Entity Spec:`

```javascript

headers[
    ['CONTENT-TYPE', 'application/json'],
    ['token', 'bearer + JWT'],
]

body: {
    'trip_id': Integer,
    'seat_number': String
}

```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data:{
            booking_id: Integer,
            allocated_seat: String,
            bus_license_number: String,
            trip_date: Date,
            first_name: String,
            last_name: String,
            user_email: String
        }
}

```


#### User deletes a booking

Only the trip_id

METHOD: `[DELETE]`

`api/v1/bookings/<:id>`


`Entity Spec:`

```javascript

headers[
    ['CONTENT-TYPE', 'application/json'],
    ['token', 'bearer + JWT'],
]

body: {}

```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data: {
        message: 'Successfully Deleted Booking'
    }
}

```

### Trips

#### User views all trips

A user can view all trips via this method

METHOD: `[GET]`

`api/v1/trips`


`Entity Spec:`

```javascript

headers[
    ['CONTENT-TYPE', 'application/json'],
]

body: {}

```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data:[
        {
            id: Integer,
            seating_capacity: Integer,
            origin: String,
            destination: String,
            trip_date: String,
            fare: FLOAT,
            status: BOOLEAN,
            bus_license_number: String
        }
    ]
}

```


#### Admin can create trips


METHOD: `[POST]`

`api/v1/trips`


`Entity Spec:`

```javascript

headers[
    ['token', 'bearer + JWT'],
    ['CONTENT-TYPE', 'application/json'],
]

body: {
        seating_capacity: Integer, | Required
        origin: String, | Required
        destination: String, | Required
        trip_date: String, | Required
        fare: FLOAT, | Required
        bus_license_number: String | Required
    }
```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data:{
        message: 'Success'
    }
}

```

### Admins

#### Admin can create admins

Method: `[POST]`

`api/v1/admins`

`Entity Spec:`

```javascript

headers [
    ['token', 'bearer + JWT'],
    ['CONTENT-TYPE', 'application/json'],
]

body: {
    email: String, | Required
    first_name: String, | Required
    last_name: String, | Required
}
```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data: {
        email: String,
        first_name: String,
        last_name: String,
    }
}

```

#### Admin can view admins

Method: `[GET]`

`api/v1/admins`

`Entity Spec:`

```javascript

headers [
    ['token', 'bearer + JWT'],
    ['CONTENT-TYPE', 'application/json'],
]

body: {}
```


`Response Spec: `

```javascript

body: {
    status: 'success',
    data: [
        {
            email: String,
            first_name: String,
            last_name: String,
        },
        {
            ....
        }
    ]
}

```
