# DM124 Rest API

## Logistics Service Provider

Services
* Users
* Products
* Orders
* Deliveries

Routes
* /users
* /products
* /orders
* /deliveries

Only service ?
eg: .../users/:id

Methods
* POST
* GET
* PATCH
* DELETE

### How to access ?

POST - https://dm124-rest-api.herokuapp.com/users

request:
JSON
{
	"email": "foo@test.com",
	"password": "123456"
}

response:
JSON Web Token.
eg: "eyJhbGciOiJ..."

### How to create a product ?

POST - https://dm124-rest-api.herokuapp.com/product

* Note.
POST Requests
Authorization - Bearer Token
