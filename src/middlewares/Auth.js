
const adminAuth = (req,res,next)=>{
  console.log('the admin middleware is under the auth')
  const token = "code-p"
  const isAdminAuthenticated = token === "code-p"
  if(!isAdminAuthenticated){
    return res.status(401).send('You are not authorized to access this route')
  }
  else{
    next();
  }
}

const userAuth = (req, res, next) => {
  console.log("the admin middleware is under the auth");
  const token = "code-p";
  const isAdminAuthenticated = token === "code-p";
  if (!isAdminAuthenticated) {
    return res.status(401).send("You are not authorized to access this route");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};