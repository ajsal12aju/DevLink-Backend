

const userProfileEditValidte = (req) => {
   const allowedEditFeilds = [
     "firstName",
     "lastName",
     "email",
     "gender",
     "age",
     "photoUrl",
     "about",
     "skills",
   ];

   // this will loop and check the allowedFilds is there or not
    const allowed = Object.keys(req.body).every((feild) =>
      allowedEditFeilds.includes(feild)
    );

    return allowed
}

module.exports = {
    userProfileEditValidte
}