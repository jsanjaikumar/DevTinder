# DEvTinder api list

# AuthRouter
POST / signup
POST / login
POST /logout

# profileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

# CONNECTIONSRouter
POST/request/send/:status/:userId
POST/request/review/:status/:requestId

# USERRouter
GET/user/connections
GET/user/request/received
GET/user/feed - gets the all user from the app