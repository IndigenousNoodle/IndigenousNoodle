# Localhosts

> Web application to connect people with locals in a city to show them the places to see.  Hosts can create events with multiple dates, providing images and a description of the event.  Users can search and filter by location, title, description, price and request to join events at specific dates.  Hosts and Users can contact each other through a realtime messaging chat.  Hosts can view profiles of joined applicants and confirm the event days.

## Team 

  - __Product Owner__: Michael Gofron
  - __Scrum Master__: Kevin Egami
  - __Development Team Members__: Ingi Kim, Lisa Tse Wang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Localhosts uses Amazon Web Services S3 to store profile and event images.  The URLs are saved in PostgreSQL database. To use AWS credentials, create a file in root directory: aws.config.js.  (Do not share this file!)

```
exports.AWS_ACCESS_KEY = "Your Access Key Here"
exports.AWS_SECRET_KEY = "Your Screct Key Here"
exports.S3_BUCKET = 'Your Bucket Name Here'
```

postgreSQL settings are in /server/db/db.js


## Requirements

- aws-sdk ^2.1.50
- bcrypt-nodejs 0.0.3
- body-parser ~1.13.2
- bower ^1.5.2
- cookie-parser ~1.3.5
- debug ~2.2.0
- del ^2.0.0
- express ~4.13.1
- gulp ^3.9.0
- gulp-inject ^1.5.0
- gulp-jshint ^1.11.2
- gulp-nodemon ^2.0.4
- jade ~1.11.0
- jwt-simple ^0.3.0
- mongodb ^2.0.42
- mongoose ^4.1.3
- morgan ~1.6.1
- pg ^4.4.1
- pg-hstore ^2.3.2
- run-sequence ^1.1.2
- sequelize ^3.7.1
- serve-favicon ~2.3.0
- socket.io ^1.3.6"

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
Start with gulp:
```sh
npm install -g gulp
gulp
```





### Roadmap

View the project roadmap [here](https://github.com/IndigenousNoodle/IndigenousNoodle/issues)


## Contributing

See [CONTRIBUTING.md](https://github.com/IndigenousNoodle/IndigenousNoodle/blob/master/_CONTRIBUTING.md) for contribution guidelines.
