const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;


const fetchuser = (req, res, next) => {

    // Get auth header value
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ msg: 'No token, authorization denied' });
    }
    try{

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(err){
        // console.error(err.message);
        res.status(500).send('{msg: "Please authenticate a valid user"}');
    }

};

module.exports = fetchuser;