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

POST - https://dm124-rest-api.herokuapp.com/products

{
	"name": "Whey Protein",
	"description": "supplement",
	"price": 239.80
}

...

POST /orders

{
	"products": [
		{"productId": "ID", "quantity": 1 },
		{"productId": "ID", "quantity": 1 }
	]
}

PATCH /orders/:id
'CLOSED' or 'CANCELED'

{
  "status": "CLOSED"
}

* Note.
If order is finished one delivery will be created.

PATCH /deliveries/:id

{
  receiverName: "Foo",
  receiverCpf: "99999999999",
  receiverIsOwner: true
}

* Note.
POST, PATCH, DELETE
Required: Authorization - Bearer Token
