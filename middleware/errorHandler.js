const errorHandler = (err,req,res,next) => {
    switch (err.name) {
        case 'JsonWebTokenError':
            res.status(401).json({message: 'must have authorization/authentication'})
            break;
        case 'SequelizeValidationError':
            res.status(400).json(err.errors[0].message)
            break;
        case 'SequelizeDatabaseError':
            res.status(400).json({message: 'Unable to remove the data'})
            break;
        case 'WrongEmail/Password':
            res.status(400).json({message: 'Invalid Email or Password'})
            break;
        case 'UserNotFound':
            res.status(404).json({message: "User cannot be found"})
            break;
        default:
            res.status(500).json({message: err || "internal server error, something's wrong with your input"})
            break;
    }
}

module.exports = {
    errorHandler
}