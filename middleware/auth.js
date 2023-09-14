const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const jwtToken = req.headers["authorization"];
    if(jwtToken === undefined){
        console.log("jwtToken not provided");
        return res.status(400).json({'unauthorized': 'Token not provided'});
    }else{
        jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async(error, agent)=>{
            if(error){
                console.log('Invalid jwtToken');
                return res.status(400).json({message: error.message});
            }else{
                console.log(agent);
                next()
            }
        })
    }
}

module.exports = authenticateToken;