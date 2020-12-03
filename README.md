# Web app Name

Online Notebook API

## General website information

This application is an API which responds with data
from a postgresql database to a client app.

The aim of this application was to create a simple
API server using javascript technologies which will
provide a link between the client and database of
the app.

## Programming Languages and tools used

### Languages

- Node.js (Javascript)

### Tools

- Express.js (Server)
- Prettier (Mount code)
- Postgresql (Relational database)
- Knex (Sql query builder)
- Cors (Server access)
- Body-Parser (Access to body of client request)
- Bcrypt (End to end encryption)

## Additional information

1. Cors in this app is enabled to allow access from any client,
   this will not be done in an every day situation, a whitelist
   will be used to allow access from the appropiate clients

2. A query builder called knex is used to make queries to the
   database, this is to prevent client side SQL injections.
