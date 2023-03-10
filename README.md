# Travel Bucketlist API
An API for interacting with the database for our Travel Bucketlist app.

## How to Use
### Running the app
1. Clone down the repository
2. Set up docker on your machine and run the following command:
- `docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres`
3. Open pgAdmin4 and create a new server:
- host: localhost
- user: postgres
- password: password
4. Run `npm i` to install the dependencies
5. Use .env and .env.test files for environment variables
6. Use `npm  start` to start the app
7. Use Postman to send and receive requests to the database, or use pgAdmin4's Query Tool
8. Use `npm test` to test the CRUD endpoints
### Endpoints
#### **POST**:
- /users &raar; Add a new user to the database. Requires 'username', 'email' and 'password' values as JSON format in the request body.
- /destinations &raar; Add a new destination to the database. Requires 'name', 'description' and has an option of 'country' in the request body.

For now, these are the only endpoints I would recommend posting to. Due to the cardinality of the RDB, the 'lists' and 'favourites' are mostly produced out of users and destinations - we will handle them fully in a useful context soon.
#### **GET**:
Get all *item*:
- /users &raar; Receive a JSON response of all *users* in the database.
- /destinations &raar; Receive a JSON response of all *destinations* in the database.
- /favourites &raar; Receive a JSON response of all *favourites* in the database.
- /lists &raar; Receive a JSON response of all *lists* in the database.
Get an *item* by id:
- /users/:id &raar; Receive a JSON response of a single user record by id.
- /destinations/:id &raar; Receive a JSON response of a single destination record by id.
- /favourites/:id &raar; Receive a JSON response of a single favourite record by id.
- /lists/:id &raar; Receive a JSON response of a single list record by id.
#### **PATCH**:
- /users/:id &raar; Update a value for a *user* by id, receiving only the change that you would like to make in the request body as JSON format.
- /destinations/:id &raar; Update a value for a *destinations* by id, receiving only the change that you would like to make in the request body as JSON format.

I reiterate my point from the POST endpoint section: it's best to stick to these two endpoints until we have a more developed system which needs to use the 'lists' and 'favourites' endpoints.
#### **DELETE**:
- /users/:id &raar; Delete a *user* record from the database by id.
- /destinations/:id &raar; Delete a *destination* record from the database by id.
- /favourites/:id &raar; Delete a *favourite* record from the database by id.
- /lists/:id &raar; Delete a *list* record from the database by id.
### Sending requests with axios
Use the endpoints above for guidance on parameters and body JSON.

To send a request to the database using axios, we first have to install axios as a dependency with `npm i -S axios`

Then we can import axios into our code and make a request like this:
```
import axios from 'axios';

axios
.post('http://localhost:3000/users')
.send({
    username: 'example_username',
    email: 'hello.world@outlook.com',
    password: 'qwertyuiop123'
 })
 .then((response) => console.log(response))
 .catch((error) => console.log(error))
```
The above code makes a post request to the users endpoint, logging either a successful response or an error message to the console.