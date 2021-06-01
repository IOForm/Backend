# IOForm

---
## User

### URL
    http://localhost:3000/

### Description
    Admin created Users manually by using Postman apps or seeds

This app has :
    * RESTful endpoint for user register and login operation
    * JSON formated response

User
    RESTful endpoints

### Register
    Register customer at home page

URL
    `/register`
    
METHOD
    `POST`

Request header
    no header needed
    
Request params
    no params needed

Request body
```
{
    name: "<name>",
    email: "<email>",
    password: "<password>",
    RoleId: "<RoleId>"
}
```

Response (201 - Created)
```
{
    "id": "<user_id>",
    "email": "<user_email>",
    "RoleId": "<user_RoleId>"
}
```
Response (400 - Unauthorized)
```
{
    "message": fail create
}
```

### Login
    Login for user to access web apps

URL
    `/login`
    
METHOD
    `POST`

Request header
    no header needed
    
Request params
    no params needed

Request body
    no bodu needed

Response (201 - Created)
```
{
    "id": "<user_id>",
    "email": "<user_email>",
    "RoleId": "<user_RoleId>"
}
```
Response (400 - Unauthorized)
```
{
    "message": fail create
}
```
