# DEvTinder api list

//AuthRouter
POST / signup
POST / login
POST /logout

//profileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

//CONNECTIONSRouter
POST/request/send/interested/:userId
POST/request/send/ignored/:userId
POST/request/review/accepted/:requestId
POST/request/review/rejected/:requestId

/USERRouter
GET/user/connections
GET/user/request/received
GET/user/feed - gets the all user from the app