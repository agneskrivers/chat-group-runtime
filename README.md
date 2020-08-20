# Chat Group Runtime

Project Chat Group Runtime using Typescript, React, Express and Mongoose

## Getting Started

-   Folder Client

    -   Change Link API in Component App and Component Home

-   Folder Server
    -   Create File .env
    -   Add Environment Variables:
        -   PORT: Port Server
        -   URL_MONGO: Link Database Mongodb
        -   SLAT: Salt Round Of Package Bcrypt
        -   ACCESS_TOKEN_SECRET: Secret Token Of Package Bcrypt
        -   CLOUD_NAME: Cloud Name In Account Cloudinary
        -   API_KEY: Api Key In Accound Cloudinary
        -   API_SECRET: Api Secret In Account Cloudinary
    -   Active Package Dotenv in file index.ts

### Prerequisites

-   Install [Node.JS](http://nodejs.org)
-   Install [MongoDB](https://www.mongodb.com/)

### Installation

-   Client

```bash
    cd client/
    npm install     # Install Package
    npm start       # Start Project Client
```

-   Server

```bash
    cd server/
    npm install     # Install Package
    npm start       # Start Project Client
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Deployment

The project has been deploy on [Heroku](https://chat-group-runtime.herokuapp.com/)

### Author

-   **Agnes K. Rivers** - [agneskrivers](https://github.com/agneskrivers)

### Todo

-   [ ] Feture Search User Online
-   [ ] Clean Code Project
