const userAuth = (req, res, next) => {
    const token = 'xyddz'
    if(token === 'xyz'){
        next()
    }else{
        res.send("you are not authanticated")
    }
}

const userProfileEditValidte = (req) => {
   const allowedEditFeilds = ["firstName","lastName", "email","gender","age"]

   // this will loop and check the allowedFilds is there or not
    const allowed = Object.keys(req.body).every((feild) =>
      allowedEditFeilds.includes(feild)
    );

    return allowed
}

module.exports = {
    userAuth,
    userProfileEditValidte
}