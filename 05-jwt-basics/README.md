
### http-status-codes


app-flow:
register/login --> authenticate --> dashboard

//if authenticated, show dashboard
//else do not show
//users who are authenticated are allowed to access only some resources and not all --> this is called authorization


### JWT_SECRET
just for demo, in production use long, complex and unguessable string value

### How JWT work ?
- when user succcesfully logs in using their credentials, a JWT will be returned.
- now whenever a user wants to access a protected route/resource, the user should send the JWT, typically in the Authorization  header using the Bearer schema.
- `Authorization: Bearer <token>`
