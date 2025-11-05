const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try {
        const authorizationHeaders = req.headers["authorization"];
        if (!authorizationHeaders) {
            return res.send("Authorization header missing")
        }
        const token = authorizationHeaders.split(" ")[1];
        jwt.verify(token, "qwertyuiopasdfghjklzxcvbnm", (err, decoded) => {
            if (err) {
                return res.send("Invalid tokem")
            }
            req.userId = decoded.userId;
            next();
        })
    } catch (err) {
        console.log(err);
    }
}