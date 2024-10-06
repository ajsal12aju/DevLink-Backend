const userAuth = (req, res, next) => {
    const token = 'xyddz'
    if(token === 'xyz'){
        next()
    }else{
        res.send("you are not authanticated")
    }
}

module.exports = {
    userAuth
}